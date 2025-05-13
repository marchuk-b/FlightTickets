const Role = require('../models/Role');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

class userController {
    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Помилка під час отримання користувачів'})
        }
    }

    async getUser(req, res) {
        const userId = req.params.id;
        try {
            const user = await User.findById(userId)
            if (!user) {
                return res.status(404).json({ message: 'Користувача не знайдено' });
            }
            res.json(user);
        } catch {
            res.status(401).json({ message: "Помилка під час отримання користувача" });
        }
    }

    async deleteUser(req, res) {
        const userId = req.params.id;
        try {
            const user = await User.findByIdAndDelete(userId)
            if (!user) {
                return res.status(404).json({ message: 'Користувача не знайдено' });
            }
            res.json({ message: 'Користувача успішно видалено' });
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Помилка під час видалення користувача'})
        }   
    }

    
    async changeUser(req, res) {
        const userId = req.params.id;
        const { username, email, password } = req.body;

        try {
            const existingUsername = await User.findOne({ username });
            if (existingUsername && existingUsername._id.toString() !== userId) {
                return res.status(400).json({ message: 'Користувач з таким іменем уже існує' });
            }

            const existingEmail = await User.findOne({ email });
            if (existingEmail && existingEmail._id.toString() !== userId) {
                return res.status(400).json({ message: 'Користувач з такою поштою уже існує' });
            }

            const updateData = { username, email };

            if (password) {
                const hashedPassword = await bcrypt.hash(password, 7);
                updateData.password = hashedPassword;
            }

            const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'Користувача не знайден' });
            }

            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Помилка під час оновлення користувача' });
        }
    }
    
    async addUserRole(req, res) {
        const userId = req.params.id;
        const role = req.params.role;
  
        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'Користувача не знайдено' });
            }
    
            const userRole = await Role.findOne({ value: role });
            if (!userRole) {
                return res.status(404).json({ message: 'Роль не знайдено' });
            }
    
            // Перевірити, чи роль уже є
            if (user.roles.includes(userRole.value)) {
                return res.status(400).json({ message: 'Користувач уже має таку роль' });
            }
    
            user.roles.push(userRole.value);
            await user.save();
    
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Помилка під час додавання ролі' });
        }
    }

    async deleteUserRole(req, res) {
        const userId = req.params.id;
        const role = req.params.role;
 
        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'Користувача не знайдено' });
            }
    
            const userRole = await Role.findOne({ value: role });
            if (!userRole) {
                return res.status(404).json({ message: 'Роль не знайдено' });
            }

            if (!user.roles.includes(userRole.value)) {
                return res.status(400).json({ message: 'Користувач не має такої ролі' });
            }
            user.roles.pop(userRole.value);

            await user.save();
    
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Помилка під час видалення ролі' });
        }
    }
}

module.exports = new userController();