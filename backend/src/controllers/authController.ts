import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const register: RequestHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        await new User({ email, password: hash }).save();
        res.json({ msg: 'User registered' });
        return;                      // <- explicit void
    } catch (err) {
        next(err);
    }
};

export const login: RequestHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ msg: 'Invalid credentials' });
            return;                    // <- explicit void
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            res.status(400).json({ msg: 'Invalid credentials' });
            return;                    // <- explicit void
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
            expiresIn: '1h'
        });
        res.json({ token });
        return;                      // <- explicit void
    } catch (err) {
        next(err);
    }
};
