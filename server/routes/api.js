var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');

var User = require('../models/user.js');
var Pic = require('../models/pic.js');
var UserScores = require('../models/score.js');
var School = require('../models/school.js');


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


router.post('/getSettings', function(req, res) {
    User.findOne({
        _id: req.body.id
    }, function(err, data) {
        if (err) {
            return res.status(500).json({
                err: err
            });
        } else {
            return res.status(200).json({
                status: 'Retrieved Settings!',
                data: data
            });
        }
    });
});


router.delete('/register/:id', function(req, res) {  
   var id = req.params.id;
    User.remove({ _id: mongoose.Types.ObjectId(id) }, function(err) {
        if (err) { console.log(err); }
                res.json({ message: 'Deleted!' });            
        });
});


router.put('/register/:id', function(req, res) {  
   var id = req.params.id;
    User.update({ _id: mongoose.Types.ObjectId(id) }, {
        $set: { username: req.body.username }
    }, function(err) {
        if (err) { console.log(err); }
                res.json({ message: 'Updated' });            
        });
});


router.post('/updateSettings', function(req, res) {
    User.findOneAndUpdate({
        _id: req.body.id
    }, {
        $set: {
            first: req.body.first,
            last: req.body.last,
            city: req.body.city,
            state: req.body.state
        }
    }, {
        new: true
    }, function(err, data) {
        if (err) {
            return res.status(500).json({
                err: err
            });
        } else {
            return res.status(200).json({
                status: 'Updated Settings!',
                data: data
            });
        }
    });
});


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


router.post('/superhero', function(req, res) {
   
    var picture = new Pic(req.body);
    // add to db
    picture.save(function(err){
        if(err) res.send(err);
        //If no errors, send it back to the client
        res.json(req.body);
    });                         
});


router.get('/superhero', function(req, res) {
   //Query the DB and if no errors, send all the superheroes
    var query = Pic.find({});
    query.exec(function(err, superheroes){
        if(err) {res.send(err);

        }
        //If no errors, send them back to the client
        res.json(superheroes);});
});


router.delete('/superhero/:id', function(req, res) {  
   var id = req.params.id;
    Pic.remove({ _id: mongoose.Types.ObjectId(id) }, function(err) {
        if (err) { console.log(err); }
                res.json({ message: 'Deleted!' });            
        });
});


router.post('/score', function(req, res) {
   
    var userScore = new UserScores(req.body);
    // add to db
    userScore.save(function(err){
        if(err) res.send(err);
        //If no errors, send it back to the client
        res.json(req.body);
    });                         
});


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

router.put('/score/:id', function(req, res) {  
   var id = req.params.id;
    UserScores.update({ _id: mongoose.Types.ObjectId(id) }, {
        $set: { balance: req.body.balance, username: req.body.username }
    }, function(err) {
        if (err) { console.log(err); }
                res.json({ message: 'Updated' });            
        });
});

router.delete('/score/:id', function(req, res) {  
   var id = req.params.id;
    UserScores.remove({ _id: mongoose.Types.ObjectId(id) }, function(err) {
        if (err) { console.log(err); }
                res.json({ message: 'Deleted!' });            
        });
});






module.exports = router;




















