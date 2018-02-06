import bcrypt from 'bcrypt'

const saltRounds = 10;

let passwordEncoder = {
  encode: (unEncodedPassword,callback) => {
    bcrypt.hash(unEncodedPassword, saltRounds, function(err,encodedPassword){
      if(err){
        callback(err);
        return;
      }
      callback(null,encodedPassword);
    });
  },

  compare: (password,encodedPassword,callback) => {
    bcrypt.compare(password, encodedPassword, function(err, isAuthenticated) {
      if(!isAuthenticated){callback(err); return;}
      callback(null,isAuthenticated);
    });
  }
}

module.exports = passwordEncoder;
