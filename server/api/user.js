import {Router} from 'express';
import jwt from 'jsonwebtoken';
import express from 'express';
import User from '../db/schemas/user';
import passwordEncoder from '../utilities/passwordEncoder';
import apiResponseGenerator from '../utilities/apiResponseGenerator';
import userAuthenticator from '../utilities/userAuthenticator';
import config from '../config';
import multer from 'multer';
const routes = new Router;
const app = express();
let path = require('path')
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'server/assets/profile/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
var upload = multer({ storage: storage });

routes.post('/getAssignee',(req, res) => {
  var filter = {
    project:req.body.projectId,
    name: {$regex: ".*" + req.body.value + ".*"}
  };
  User.find(filter,{"name": 1, "userName": 1}).exec((err,data) =>{
    res.json(data);
  });
});
routes.post('/profileImage', upload.single('profile'), function (req, res, next) {
  //console.log(req.file);
  res.json(req.file);
});

routes.post('/getProjectUsersByTeam', (req, res) => {
   User.find(req.body.teamDetails,{"name": 1, "userName": 1}).exec((err, data) => {
     if(err){
       res.json(apiResponseGenerator.generate(true, 'Unable to retrieve users'));
       return;
     }
     res.json(apiResponseGenerator.generate(false, data));
   })
});
routes.post('/register', (req, res) => {
  console.log(req.body.registrationDetails);
  let registrationDetails = req.body.registrationDetails,
  userName = registrationDetails.userName;
  userAuthenticator.isUserPresent(userName, (err, user) => {
    if (err) {
      res.json(err);
      return;
    } else if (user) {
      res.json(apiResponseGenerator.generate(true, 'user already registered'));
      return;
    }

    passwordEncoder.encode(registrationDetails.password, (err, encodedPassword) => {
      let newUser = new User();
      newUser.userName = userName;
      newUser.password = encodedPassword;
      newUser.name = registrationDetails.name;
      newUser.project = registrationDetails.project;
      newUser.team = registrationDetails.team;
      newUser.isAdmin = registrationDetails.isAdmin;
      newUser.image = registrationDetails.image;
      newUser.save(function(err, user) {
        if (err) {
          res.json(apiResponseGenerator.generate(true, 'error in creating user'));
          return;
        }
        res.json(apiResponseGenerator.generate(false,user));
      });
    });

  });
});

routes.post('/authenticate', (req, res) => {

  let credentials = req.body.credentials,
   userName = credentials.userName,
   password = credentials.password;
   userAuthenticator.authenticateUser(userName, password, (err, user) => {
      if (err) {
        res.json(err);
        return;
      }
       req.session.userInfo=user;
       console.log(req.sessionID);
       res.cookie('session-id', req.sessionID, { httpOnly: false});
       let token = jwt.sign({userName: userName},config.secret,{expiresIn: 60 * 60});
       res.json(apiResponseGenerator.generate(false,{'token':token,'user':user}));
    });
});
routes.post('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('session-id');
  res.json(apiResponseGenerator.generate(false,'Logout Success'));
})
routes.post('/delete', (req, res) => {
  let newUser = new User();
  let credentials = req.body.credentials;

  User.deleteOne({
    userName: credentials.userName
  }, (err) => {
    if (err) {
      res.json(apiResponseGenerator.generate(true, 'error occured while deleting user'));
      return;
    }
    res.json(apiResponseGenerator.generate(false));
  });
});

routes.post('/update', (req, res) => {
  let userData = req.body.credentials,
  update = req.body.update;
  User.findOneAndUpdate({
    userName: userData.userName
  }, update, (err) => {
    if (err) {
      res.json(apiResponseGenerator.generate(true, 'something went wrong while updating'));
      return;
    }
    res.json(apiResponseGenerator.generate(false));
  });
});

routes.post('/logout', (req, res) => {
  req.session.authenticate=false;
  res.json(apiResponseGenerator.generate(false,'logged out!'));
});

module.exports = routes;
