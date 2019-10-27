const mongoose = require('mongoose');
const Recruiter = mongoose.model('Recruiter');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = mongoose.model('Admin');

module.exports = {
    getAll: (req, res) => {
        Recruiter.find({}, { 'password': 0 })
            .then(users => res.json(users))
            .catch(err => res.json(err));
    },

    // Activate or Deactivate a recruiter
    activateOrDeactivate: (req, res) => {
        Recruiter.findOneAndUpdate(
            { _id: req.body._id },
            { active: req.body.active },
            {
                "fields": { 'password': 0 },
                new: true
            })
            .then(recruiter => res.json(recruiter))
            .catch(err => res.json(err));
    },

    login: (req, res) => {
        Admin.findOne({ email: req.body.email })
            .then(async admin => {
                
                if (admin === null) {
                    return res.json("User not found!");
                }
                try {
                    if (req.body.password && await bcrypt.compare(req.body.password, admin.password)) {
                        let payload = { subject: admin._id };
                        let token = jwt.sign(payload, 'ThisIsSecret');

                        req.session.admin = {
                            _id: admin._id,
                            first_name: admin.first_name,
                            last_name: admin.last_name,
                            email: admin.email,
                            admin: true,
                            token: token
                        }
                        return res.json(req.session.admin);
                    }
                    return Promise.reject("Error: password is incorrect")
                }
                catch (err) {
                    return Promise.reject(err)
                }
            })
            .catch(err => res.json(err));
    },

    // for testing, the email is admin@admin.com, and the password is 12345678Ww@
    create: (req, res) => {
        console.log(req);
        
        const admin = {
            first_name: "Admin",
            last_name: "Admin",
            email: "admin@admin.com",
            password: "$2b$10$TnKzMp9X3cYkcMZIJuKMK.xYEl8GUeLePOOFGGY2BYrDVBKoaidAm"
        }
        Admin.create(admin)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }
}