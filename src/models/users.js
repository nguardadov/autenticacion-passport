const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs'); // encriptar password
const {Schema} = mongoose;

const UserSchema =  new Schema({
    email:String,
    password: String
});

//encriptar contraseñas
UserSchema.methods.encryptPassword = (password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10));
};
//desencriptar password
UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password,this.password);
};

module.exports = mongoose.model('users',UserSchema);