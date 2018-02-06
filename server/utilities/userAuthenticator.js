import User from '../db/schemas/user';
import apiResponseGenerator from './apiResponseGenerator';
import passwordEncoder from './passwordEncoder';
import jwt from 'jsonwebtoken';
import express from 'express';
import config from '../config';

const app = express();

let isUserPresent = (userName, callback) => {
  User.findOne({
    'userName': userName
  }, (err, user) => {
    if (err) {
      callback(apiResponseGenerator.generate(true, 'error in retriving information'));
      return;
    }
    callback(null, user);
  })
};

let isPasswordCorrect = (password, encodedPassword, callback) => {
  passwordEncoder.compare(password, encodedPassword, (err, isAuthenticated) => {
    if (!isAuthenticated) {
      callback(apiResponseGenerator.generate(true, 'user-name or password is wrong'));
      return;
    }
    callback(null, true);
  });
};

let authenticateUser = (userName, password, callback) => {
  isUserPresent(userName, (err, user) => {
    if (err) {
      callback(err);
      return;
    } else if (!user) {
      callback(apiResponseGenerator.generate(true, 'user doesnt exist'));
      return;
    }
    isPasswordCorrect(password, user.password, (err, isAuthenticated) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, user);
    });
  });
};


let verifyUser = (req, callback) => {

  jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        callback(apiResponseGenerator.generate(true, 'Failed to authenticate the token'));
        return;
      }
      req.decoded = decoded;
      callback(null, token);
    });
  }


let userAuthenticator = {
  authenticate: (req, res, next) => {
    console.log(req.path);
    if (req.path === '/user/register' || req.path === '/user/authenticate' || req.path === '/project/'|| req.method=== 'OPTIONS') {
      next();
      return;
    }

    let token = req.headers['authorization'];
    if (!token) {
      res.json(apiResponseGenerator.generate(true, 'No token provided'));
    }
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        res.json(apiResponseGenerator.generate(true, 'Invalid token'));
        return;
      }
      next();
    });
  },

'isUserPresent': isUserPresent,
'authenticateUser': authenticateUser,
'verifyUser': verifyUser
};

module.exports = userAuthenticator;
