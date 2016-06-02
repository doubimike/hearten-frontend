// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

// set up a mongoose model and pass it using module.exports
var userSchema = new Schema({ 
    username: String, 
    password: String, 
    admin: Boolean 
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null) ;
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);


// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var userSchema = new Schema({
//     username: {type: String,required: true},
//     password: {type: String,required: true},
//     created_at: Date,
//     updated_at: Date
// });

// var User = mongoose.model('User',userSchema);

// module.exports = User;
