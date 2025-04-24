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
            res.status(400).json({message: 'Error while getting users'})
        }
    }

    async getUser(req, res) {
        const userId = req.params.id;
        try {
            const user = await User.findById(userId)
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            console.log(user)
            res.json(user);
        } catch {
            res.status(401).json({ message: "Error while getting user" });
        }
    }

    async deleteUser(req, res) {
        const userId = req.params.id;
        try {
            const user = await User.findByIdAndDelete(userId)
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User deleted' });
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Error while deleting user'})
        }   
    }

    
    async changeUser(req, res) {
        const userId = req.params.id;
        const { username, email, password } = req.body;

        try {
            // Перевірка на зайнятий username
            const existingUsername = await User.findOne({ username });
            if (existingUsername && existingUsername._id.toString() !== userId) {
                return res.status(400).json({ message: 'Username is already taken' });
            }

            // Перевірка на зайнятий email
            const existingEmail = await User.findOne({ email });
            if (existingEmail && existingEmail._id.toString() !== userId) {
                return res.status(400).json({ message: 'Email is already taken' });
            }

            const updateData = { username, email };

            if (password) {
                const hashedPassword = await bcrypt.hash(password, 7);
                updateData.password = hashedPassword;
            }

            const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Error while updating user' });
        }
    }
    
    async addUserRole(req, res) {
        const userId = req.params.id;
        const role = req.params.role;
  
        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            const userRole = await Role.findOne({ value: role });
            if (!userRole) {
                return res.status(404).json({ message: 'Role not found' });
            }
    
            // Перевірити, чи роль уже є
            if (user.roles.includes(userRole.value)) {
                return res.status(400).json({ message: 'User already has this role' });
            }
    
            user.roles.push(userRole.value);
            await user.save();
    
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Error while adding role to user' });
        }
    }

    async deleteUserRole(req, res) {
        const userId = req.params.id;
        const role = req.params.role;
 
        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            const userRole = await Role.findOne({ value: role });
            if (!userRole) {
                return res.status(404).json({ message: 'Role not found' });
            }

            if (!user.roles.includes(userRole.value)) {
                return res.status(400).json({ message: 'User doesn`t have this role' });
            }
            user.roles.pop(userRole.value);

            await user.save();
    
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Error while adding role to user' });
        }
    }
}

module.exports = new userController();