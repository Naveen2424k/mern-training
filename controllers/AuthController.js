const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User');


exports.register = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Request body is missing or empty" });
        }

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        //checking user already in or not
        const exituser = await User.findOne({ email })
        if (exituser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashedpass = await bcrypt.hash(password, 10);

        //storing db
        const newUser = await User.create({
            name, email, password: hashedpass
        })
        res.status(201).json({ msg: "user created success", user: newUser })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

       
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
         
        

         res.status(200).json({ message: "success login" ,token});

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}   