var express = require('express');
var app = express();
var session = require('express-session');
app.use(session({secret: 'codingdojorocks'}));  // string for encryption
var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bicycle_db');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    fname: { 
        type: String, 
        required: true, 
        minlength: [3, "fname needs to be at least 3 characters"]

    },
    lname: { 
        type: String, 
        required: true, 
        minlength: [3, "lname needs to be at least 3 characters"]
    },
    email: { 
        type: String, 
        required: true, 
        validate: {
            validator: function(checkemail) {
                var found = true;
                return new Promise(function(resolve, reject){
                    User.findOne({email: checkemail}, function(err, user) {
                        if(user != null){
                            found = false;
                            resolve(found);
                        } else{
                            found =  true;
                            resolve(found);
                        }
                    })
                })
                return found;
            },
            message: "Email is already in use"
        },
    },
    password: { 
        type: String, 
        required: true, 
        minlength: [3, "Password needs to be at least 3 characters"]
    },

    bikes: [{type: Schema.Types.ObjectId, ref: 'bikes'}]
}, {timestamps: true});
var BikeSchema = new mongoose.Schema({
    _user: {type: Schema.Types.ObjectId, ref: 'users'},
    title: { 
        type: String, 
        required: true, 
    },
    price: { 
        type: String, 
        required: true, 
    },
    location: { 
        type: String, 
        required: true, 
    },
    url: { 
        type: String, 
        required: true, 
    },
    description: { 
        type: String, 
        required: true, 
    },
}, {timestamps: true});

mongoose.model('users', UserSchema); 
mongoose.model('bikes', BikeSchema); 

var User = mongoose.model('users');
var Bike = mongoose.model('bikes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // tell body-parser to read JSON

app.use(express.static( __dirname + '/bicycle-app/dist' ));

app.post('/newUser', function(req, res) {
    var user = new User(req.body);
    user.save(function(err) {
        if(err) {
            console.log(err);
            console.log('something went wrong');
            res.json({error: err})
        } else { 
            req.session.email = user.email;
            req.session._id = user._id;
            console.log('successfully added an user!');
            res.json({message: "successfully added a user"})
        }
    })
})

app.post('/login/:email', function(req, res) {
    User.findOne({email: req.params.email}, function(err, user) {
        if(err || user == null || user.password != req.body.password){
            res.json({message: "Invalid Email/Password combination", error: {message:"Invalid Email/Password combination"}});
        }
        else {
            if (user.password === req.body.password) {
                req.session.email = user.email;
                req.session._id = user._id;
                res.json({message: "Success", data: user});
            }
        }
    })
})

app.post('/newListing', function(req, res) {
    User.findOne({email: req.session.email}, function(err, user){
        var bike = new Bike(req.body);
        bike._user = user._id;
        user.bikes.push(bike);
        bike.save(function(err){
            user.save(function(err){
                if(err) { 
                    console.log('Error');            
                    res.json({error: err})
                } 
                else { 
                    console.log('added bike')
                    res.json({message: "successfully added a bike"}) 
                }
            });
        });
    });
})

app.get('/allBikes', function(req, res) {

    Bike.find({}, function(err, bikes) {
        if(err){
            console.log("Returned error", err);
            res.json({message: "Error", error: err})
         }
        else {
            console.log("server success")
            res.json({message: "Success", data: bikes, session: {id: req.session._id}})
        }
    })
})

app.get('/myListings/', function(req, res) {
    User.findOne({_id: req.session._id})
    .populate('bikes')
    .exec(function(err, bikes) {
        if(err) { 
            console.log('Error'); 
        } 
        else { 
            console.log("got some bikes on server", bikes);
            res.json({message: "Success", data: bikes})
        }                
    });
});

app.get('/userInfo/:bikeId', function(req,res){
    Bike.findOne({_id: req.params.bikeId}, function(err, bike) {
        if(err){
            console.log("Returned error", err);
            res.json({message: "Error", error: err})
        } else {
            User.find({_id: bike._user}, function(err, user){
                if(err){
                    console.log("Can't find User", err);
                    res.json({message: "Error", error: err})
                } else {
                    console.log('userinfo', user);
                    res.json({message: "Success", data: user})
                }
            })
        }
    })
});

app.put('/editBike/:id/', function(req, res) {
    Bike.update({_id: req.params.id}, req.body, function(err, task) {
        if(err) {
            console.log('something went wrong');
        } else { 
            console.log('successfully updated a task!');
            res.json({message: "successfully updated a task"})
        }
    })
})
app.delete('/removeBike/:id/', function(req, res) {
    Bike.remove({_id: req.params.id}, function(err, task) {
        if(err) {
            console.log('something went wrong');
        } else { 
            console.log('successfully removed a task!');
            res.json({message: "successfully removed an Bike"})
        }
    })
})

app.get('/botd/', function(req, res) {
    Bike.find({}, function(err, bikes) {
        if(err){
            console.log("Returned error", err);
            res.json({message: "Error", error: err})
         }
        else {
            res.json({message: "Success", data: bikes[Math.floor(Math.random() * bikes.length)]});
        }
    })
})

app.get('/logout/', function(req, res) {
    req.session.destroy();
    res.json({message: "cleared session" });
})


app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./bicycle-app/dist/index.html"))
});

app.listen(8000, function() {
    console.log("listening on port 8000");
})