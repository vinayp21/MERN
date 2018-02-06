import {Router} from 'express';
import jwt from 'jsonwebtoken';
import express from 'express';
import User from '../db/schemas/user';
import passwordEncoder from '../utilities/passwordEncoder';
import apiResponseGenerator from '../utilities/apiResponseGenerator';
import userAuthenticator from '../utilities/userAuthenticator';
import config from '../config';

const routes = new Router;
const app = express();
routes.post('/getAssignee',(req, res) => {
  var filter = {
    project:req.body.projectId,
    name: {$regex: ".*" + req.body.value + ".*"}
  };
  User.find(filter,{"name": 1, "userName": 1}).exec((err,data) =>{
    res.json(data);
  });
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
       let token = jwt.sign({userName: userName},config.secret,{expiresIn: 60 * 60});
       res.json(apiResponseGenerator.generate(false,{'token':token,'user':user}));
    });
});

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


module.exports = routes;
