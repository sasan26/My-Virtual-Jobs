var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');

// database models
var User = require('../models/user.js');
var Pic = require('../models/pic.js');
var UserScores = require('../models/score.js');
var School = require('../models/school.js');
var Payment = require('../models/pay.js');
var PaymentHis = require('../models/payhistory.js');
var incomeHis = require('../models/income.js');
var payoutHis = require('../models/payout.js');

// register new account route
router.post('/register', function(req, res) {
    User.register(new User({
            username: req.body.username,
            usertype: req.body.usertype,
            balance: 100
        }),
        req.body.password,
        function(err, account) {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            passport.authenticate('local')(req, res, function() {
                return res.status(200).json({
                    status: 'Registration successful!'
                });
            });
        });
});

// delete an account route
router.delete('/register/:id', function(req, res) {  
   var id = req.params.id;
    User.remove({ _id: mongoose.Types.ObjectId(id) }, function(err) {
        if (err) { console.log(err); }
                res.json({ message: 'Deleted!' });            
        });
});

// update an email route
router.put('/register/:id', function(req, res) {  
   var id = req.params.id;
    User.update({ _id: mongoose.Types.ObjectId(id) }, {
        $set: { username: req.body.username }
    }, function(err) {
        if (err) { console.log(err); }
                res.json({ message: 'Updated' });            
        });
});

// login user route
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            res.status(200).json({
                status: 'Login successful!',
                user: user._id,
                username: user.username,
                usertype: user.usertype
            });
        });
    })(req, res, next);
});

// logout route
router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
});


router.get('/status', function(req, res) {


    if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false
        });
    }
    res.status(200).json({
        status: true
    });
});


router.get('/profile', function(req, res) {
   User.findOne({
        _id: req.body.id
    }, function(err, data) {
        if (err) {
            return res.status(500).json({
                err: err
            });
        } else {
            return res.status(200).json({
                status: 'profile found!',
                data: data
            });
        }
    });
});

// add a new job route
router.post('/superhero', function(req, res) {
   
    var picture = new Pic(req.body);
    // add to db
    picture.save(function(err){
        if(err) res.send(err);
        //If no errors, send it back to the client
        res.json(req.body);
    });                         
});

// get all jobs route
router.get('/superhero', function(req, res) {
   //Query the DB and if no errors, send all the superheroes
    var query = Pic.find({});
    query.exec(function(err, superheroes){
        if(err) {res.send(err);

        }
        //If no errors, send them back to the client
        res.json(superheroes);});
});

// delete a job route
router.delete('/superhero/:id', function(req, res) {  
   var id = req.params.id;
    Pic.remove({ _id: mongoose.Types.ObjectId(id) }, function(err) {
        if (err) { console.log(err); }
                res.json({ message: 'Deleted!' });            
        });
});

// add balance route
router.post('/score', function(req, res) {
   
    var userScore = new UserScores(req.body);
    // add to db
    userScore.save(function(err){
        if(err) res.send(err);
        //If no errors, send it back to the client
        res.json(req.body);
    });                         
});

// update a balance route
router.put('/score/:id', function(req, res) {  
   var id = req.params.id;
    UserScores.update({ _id: mongoose.Types.ObjectId(id) }, {
        $set: { balance: req.body.balance, username: req.body.username }
    }, function(err) {
        if (err) { console.log(err); }
                res.json({ message: 'Updated' });            
        });
});

// delete a user balance route
router.delete('/score/:id', function(req, res) {  
   var id = req.params.id;
    UserScores.remove({ _id: mongoose.Types.ObjectId(id) }, function(err) {
        if (err) { console.log(err); }
                res.json({ message: 'Deleted!' });            
        });
});

// get a user balance route
router.get('/score', function(req, res) {
   //Query the DB and if no errors, send all the superheroes
    var query = UserScores.find({});
    query.exec(function(err, superheroes){
        if(err) {res.send(err);

        }
        //If no errors, send them back to the client
        res.json(superheroes);
    });
});


router.post('/school', function(req, res) {
   
    var schoolScore = new School(req.body);
    // add to db
    schoolScore.save(function(err){
        if(err) res.send(err);
        //If no errors, send it back to the client
        res.json(req.body);
    });                         
});


router.get('/school', function(req, res) {
   //Query the DB and if no errors, send all the superheroes
    var query = School.find({});
    query.exec(function(err, superheroes){
        if(err) {res.send(err);

        }
        //If no errors, send them back to the client
        res.json(superheroes);});
});


router.post('/payments', function(req, res) {
   
    var paymentVal = new Payment(req.body);
    // add to db
    paymentVal.save(function(err){
        if(err) res.send(err);
        //If no errors, send it back to the client
        res.json(req.body);
    });                         
});

router.get('/payments', function(req, res) {
   //Query the DB and if no errors, send all the superheroes
    var query = Payment.find({});
    query.exec(function(err, superheroes){
        if(err) {res.send(err);

        }
        //If no errors, send them back to the client
        res.json(superheroes);});
});

router.put('/payments/:id', function(req, res) {  
   var id = req.params.id;
    Payment.update({ _id: mongoose.Types.ObjectId(id) }, {
        $set: { status: req.body.status }
    }, function(err) {
        if (err) { console.log(err); }
                res.json({ message: 'Updated' });            
        });
});

router.post('/paymenthistory', function(req, res) {
   
    var sas = new PaymentHis(req.body);
    // add to db
    sas.save(function(err){
        if(err) res.send(err);
        //If no errors, send it back to the client
        res.json(req.body);
    });                         
});

router.get('/paymenthistory', function(req, res) {
   //Query the DB and if no errors, send all the superheroes
    var query = PaymentHis.find({});
    query.exec(function(err, superheroes){
        if(err) {res.send(err);

        }
        //If no errors, send them back to the client
        res.json(superheroes);});
});

router.post('/income', function(req, res) {
   
    var sas = new incomeHis(req.body);
    // add to db
    sas.save(function(err){
        if(err) res.send(err);
        //If no errors, send it back to the client
        res.json(req.body);
    });                         
});

router.get('/income', function(req, res) {
   //Query the DB and if no errors, send all the superheroes
    var query = incomeHis.find({});
    query.exec(function(err, superheroes){
        if(err) {res.send(err);

        }
        //If no errors, send them back to the client
        res.json(superheroes);});
});

router.post('/payout', function(req, res) {
   
    var sas = new payoutHis(req.body);
    // add to db
    sas.save(function(err){
        if(err) res.send(err);
        //If no errors, send it back to the client
        res.json(req.body);
    });                         
});

router.get('/payout', function(req, res) {
   //Query the DB and if no errors, send all the superheroes
    var query = payoutHis.find({});
    query.exec(function(err, superheroes){
        if(err) {res.send(err);

        }
        //If no errors, send them back to the client
        res.json(superheroes);});
});









module.exports = router;




















