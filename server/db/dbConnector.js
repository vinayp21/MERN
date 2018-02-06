import mongoose from 'mongoose'
import dbConfig from './dbConfig'

let connector = {
  connect: () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(dbConfig.url);
  }
}

module.exports = connector;
