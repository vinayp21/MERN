import {Router} from 'express';
import user from './user';
import task from './task';
import project from './project';
// import User from '../db/schemas/user';
// import passwordEncoder from '../utilities/passwordEncoder';
// import apiResponseGenerator from '../utilities/apiResponseGenerator';
import userAuthenticator from '../utilities/userAuthenticator';
import mailConfig from '../mailConfig'
const routes = new Router;
// routes.use('/mail',function(req, res, next){
//   mailConfig();
//   next();
// });
routes.use(userAuthenticator.authenticate);
routes.use('/user',user);
routes.use('/task',task);
routes.use('/project',project);

module.exports = routes;
