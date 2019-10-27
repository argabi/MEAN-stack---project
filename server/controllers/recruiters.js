const mongoose = require('mongoose');
const Recruiter = mongoose.model('Recruiter');
const Job = mongoose.model('Job');
const bcrypt = require('bcrypt');
const passwordValidator = require('password-validator');
const jwt = require('jsonwebtoken');


module.exports = {
    getAll: (req, res) => {
        Recruiter.find({}, { 'password': 0 })
            .then(users => res.json(users))
            .catch(err => res.json(err));
    },

    getById: (req, res) => {
        Recruiter.findOne({ _id: req.query._id })
            .then(user => res.json(user))
            .catch(err => res.json(err));
    },

    create: (req, res) => {
        const recruiter = req.body;
        const schema = new passwordValidator();
        schema
            .is().min(8)
            .is().max(30)
            .has().uppercase()
            .has().lowercase()
            .has().digits()
            .has().symbols()
            .has(/[!@#$%&*]/g)
            .has().not().spaces();

        Recruiter.find({ email: recruiter.email })
            .then(result => {
                if (result.length > 0) {
                    return Promise.reject("Error: the email is already registered");
                }
                if (recruiter.password === undefined || schema.validate(recruiter.password) === false) {
                    return Promise.reject("Error: Enter a valid password");
                }
                let newRecruiter = recruiter
                return bcrypt.hash(newRecruiter.password, 10)
            })
            .then(hashedPassword => {
                let newRecruiter = recruiter;
                newRecruiter.password = hashedPassword;

                return Recruiter.create(newRecruiter);
            })
            .then(savedResult => {
                res.json("Thank you for your registration, please wait until an admin activate your account ");
            })
            .catch(err => res.json(err));
    },

    update: (req, res) => {
        const data = req.body;

        Recruiter.findOne({ _id: data._id }, { 'password': 0 })
            .then(recruiter => {
                recruiter.first_name = data.first_name;
                recruiter.last_name = data.last_name;
                recruiter.email = data.email;
                recruiter.website = data.website;
                recruiter.companyName = data.companyName;

                return recruiter.save();
            })
            .then(result => res.json(result))
            .catch(err => res.json(err));
    },

    remove: (req, res) => {
        Recruiter.deleteOne({ _id: req.query._id })
            .then(result => res.json(result))
            .catch(err => res.json(err));
    },

    login: (req, res) => {
        Recruiter.findOne({ email: req.body.email })
            .then(async recruiter => {

                if (!recruiter.active) {
                    return res.json("Recruiter has not been activated by an admin yet")
                }

                if (recruiter === null) {
                    return res.json("User not found!");
                }
                try {
                    if (req.body.password && await bcrypt.compare(req.body.password, recruiter.password)) {
                        let payload = { subject: recruiter._id };
                        let token = jwt.sign(payload, 'ThisIsSecret');

                        req.session.recruiter = {
                            _id: recruiter._id,
                            first_name: recruiter.first_name,
                            last_name: recruiter.last_name,
                            email: recruiter.email,
                            website: recruiter.website,
                            companyName: recruiter.companyName,
                            jobs: recruiter.jobs,
                            active: recruiter.active,
                            recruiter: true,
                            token: token
                        }

                        return res.json(req.session.recruiter);
                    }
                    return Promise.reject("Error: password is incorrect")
                }
                catch (err) {
                    return Promise.reject(err)
                }
            })
            .catch(err => res.json(err));
    },

    displayJobs: (req, res) => {
        Job.find({ recruiter: req.session.recruiter._id })
            .then(data => res.json(data))
            .catch(err => res.json(err))
    },
}

