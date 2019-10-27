const jobs = require('../controllers/jobs.js');
const jobSeekers = require('../controllers/jobSeekers');
const recruiters = require('../controllers/recruiters');
const admin = require('../controllers/admins');
const path = require('path');
const jwt = require('jsonwebtoken');

module.exports = function (app) {
    function verifyToken(req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).send('Unauthorized request');
        }

        let token = req.headers.authorization.split(' ')[1];

        if (token === 'null') {
            return res.status(401).send('Unauthorized request');
        }

        try {
            let payload = jwt.verify(token, 'ThisIsSecret');
            if (!payload) {
                return res.status(401).send('Unauthorized request');
            }
            req.userId = payload.subject;
            next();
        } catch (err) {
            return res.status(401).send('Unauthorized request');
        }
    }

    // *********************** Job routes ***********************
    app.get('/jobs', (req, res) => {
        jobs.getAll(req, res);
    });

    app.get('/job', verifyToken, (req, res) => {
        jobs.getById(req, res);
    });

    app.post('/job', verifyToken, (req, res) => {
        console.log(req.session.recruiter);

        if (!req.session.recruiter)
            return res.status(401).send('Unauthorized request');

        jobs.create(req, res);
    });

    app.put('/job', verifyToken, (req, res) => {
        if (!req.session.recruiter)
            return res.status(401).send('Unauthorized request');

        jobs.update(req, res);
    });

    app.delete('/job', verifyToken, (req, res) => {
        if (!req.session.recruiter)
            return res.status(401).send('Unauthorized request');

        jobs.remove(req, res);
    });


    // *********************** Recruiter routes ***********************
    app.get('/recruiters', verifyToken, (req, res) => {
        if (!req.session.admin)
            return res.status(401).send('Unauthorized request');

        recruiters.getAll(req, res);
    });
    app.get('/recruiter', verifyToken, (req, res) => {
        if (!req.session.admin)
            return res.status(401).send('Unauthorized request');

        recruiters.getById(req, res);
    });

    app.post('/recruiter', (req, res) => {
        recruiters.create(req, res);
    });

    app.put('/recruiter', verifyToken, (req, res) => {
        if (!req.session.recruiter)
            return res.status(401).send('Unauthorized request');

        recruiters.update(req, res);
    });

    app.delete('/recruiter', verifyToken, (req, res) => {
        if (!req.session.admin)
            return res.status(401).send('Unauthorized request');

        recruiters.remove(req, res);
    });
    
    app.get('/recruiter/jobs', verifyToken, (req, res) => {
        if (!req.session.recruiter)
            return res.status(401).send('Unauthorized request');

        recruiters.displayJobs(req, res);
    });

    app.post('/recruiter/login', (req, res) => {
        recruiters.login(req, res);
    });

    // *********************** JobSeeker routes ***********************
    app.get('/users', verifyToken, (req, res) => {
        if (!req.session.admin)
            return res.status(401).send('Unauthorized request');

        jobSeekers.getAll(req, res);
    });

    app.get('/user', verifyToken, (req, res) => {
        if (!req.session.admin)
            return res.status(401).send('Unauthorized request');

        jobSeekers.getById(req, res);
    });

    app.post('/user', (req, res) => {
        jobSeekers.create(req, res);
    });

    app.put('/user', verifyToken, (req, res) => {
        if (!req.session.jobSeeker)
            return res.status(401).send('Unauthorized request');

        jobSeekers.update(req, res);
    });

    app.delete('/user', verifyToken, (req, res) => {
        if (req.session.admin)
            return res.status(401).send('Unauthorized request');

        jobSeekers.remove(req, res);
    });

    //user applied for a job
    app.put('/user/applied', verifyToken, (req, res) => {
        if (!req.session.jobSeeker)
            return res.status(401).send('Unauthorized request');

        jobSeekers.AppliedForJob(req, res);
    });

    app.post('/user/login', (req, res) => {
        jobSeekers.login(req, res);
    });

    // view the jobs from the jobSeeker
    app.get('/user/jobs', verifyToken, (req, res) => {
        if (!req.session.jobSeeker)
            return res.status(401).send('Unauthorized request');

        jobSeekers.displayJobs(req, res);
    });

    app.post('/upload', (req, res) => {
        req.files.fileKey.name = req.session.jobSeeker._id;
        let file = req.files.fileKey
        file.mv('./server/controllers/files/' + file.name + ".pdf");
        return res.json(true);
    })

    // *********************** Admin routes ***********************
    app.get('/admin/recruiters', verifyToken, (req, res) => {
        if (!req.session.admin)
            return res.status(401).send('Unauthorized request');

        admin.getAll(req, res);
    });

    app.put('/admin/activate', verifyToken, (req, res) => {
        if (!req.session.admin)
            return res.status(401).send('Unauthorized request');

        admin.activateOrDeactivate(req, res);
    });

    app.post('/admin/login', (req, res) => {
        admin.login(req, res);
    });

    // for testing, this will create and admin account
    app.post('/admin', (res, req) => {
        admin.create(req, res);
    });

    app.get('/sign_out', (req, res) => {
        req.session.destroy();

        return res.json("signed out");
    });

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
    });
}