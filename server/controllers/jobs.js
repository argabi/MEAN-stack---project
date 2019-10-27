const mongoose = require('mongoose');
const Job = mongoose.model('Job');
const Recruiter = mongoose.model('Recruiter');
const JobSeeker = mongoose.model('JobSeeker');
const nodemailer = require('nodemailer');


module.exports = {
    getAll: (req, res) => {
        Job.find({}, { 'applied_users': 0 })
            .then(jobs => res.json(jobs))
            .catch(err => res.json(err));
    },

    getById: (req, res) => {
        Job.findOne({ _id: req.query._id })
            .then(job => res.json(job))
            .catch(err => res.json(err));
    },

    create: (req, res) => {
        const job = req.body;
        Job.create(job)
            .then(result => {
                const recruiter = req.session.recruiter;

                return Recruiter.findOneAndUpdate({ _id: recruiter._id }, { $push: { jobs: result } }, { new: true })
            })
            .then(result => res.json(true))
            .catch(err => res.json(err));
    },

    update: (req, res) => {
        Job.findOne({ _id: req.body._id })
            .then(job => {
                job.title = req.body.title;
                job.level = req.body.level;
                job.field = req.body.field;
                job.city = req.body.city;
                job.type = req.body.type;
                job.company = req.body.company;
                job.description = req.body.description;

                return job.save();
            })
            .then(result => res.json(result))
            .catch(err => res.json(err));
    },

    remove: (req, res) => {
        Job.deleteOne({ _id: req.query._id })
            .then(result => res.json(result))
            .catch(err => res.json(err));
    }
} 