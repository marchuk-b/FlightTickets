const Role = require('../models/Role');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '24h'})
}

class authController {
    async register(req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({message: 'Помилка реєстрації', errors})
            }

            const { username, password, email } = req.body;
            
            const candidate = await User.findOne({username})
            if(candidate) {
                return res.status(400).json({message: "Користувач з таким іменем уже існує"})
            }

            const hashedPasswd = await bcrypt.hash(password, 7);
            const userRole = await Role.findOne({value: 'USER'})
            const user = new User({username, email, password: hashedPasswd, roles: [userRole.value]})
            
            await user.save()
            return res.status(201).json({message: 'Користувач успішно створений'})
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Помилка реєстрації'})
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({email})
            if(!user) {
                return res.status(400).json({message: 'Користувача не знайдено'})
            }

            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword) {
                return res.status(400).json({message: 'Невірний пароль'})
            }

            const token = generateAccessToken(user._id, user.roles)

            res.cookie("token", token, {
                httpOnly: true,
                secure: false, 
                sameSite: "Lax",
                maxAge: 3600000 // 1 година
            });

            return res.json({token, user: {
                id: user._id,
                email: user.email,
                roles: user.roles
              } })
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Login error'})
        }
    }
    
    async logout(req, res) {
        try {
            res.clearCookie("token", {
                httpOnly: true,
                secure: false,
                sameSite: "Lax"
            });
            return res.json({message: 'Успішний вихід'})
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Помилка виходу'})
        }
    }

    async getCurrentUser(req, res) {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Не авторизований" });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            res.json({ user: decoded });
        } catch {
            res.status(401).json({ message: "Невірний токен" });
        }
    }
}

module.exports = new authController();