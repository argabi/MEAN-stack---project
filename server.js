const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static( __dirname + '/public/dist/public' ));

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 200000 }
}));

app.use(fileUpload({
    createParentPath: true
}));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app)

app.listen(8000, () => console.log("listening on port 8000"));