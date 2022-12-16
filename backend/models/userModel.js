const mongoose =require("mongoose")
const validator =require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto =require("crypto")

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter your name"],
        maxLength:[30, "Name can not exceed 30 charachter"],
        minLength:[4, "name should have more then 4 charackter"]
    },
    email:{
        type:String,
        required:[true, "Please enter your email"],
        unique:true,
        valdate:[validator.isEmail, "Please enter a valid email"],

    },
    password:{
        type:String,
        required:[true, "Please enter your password"],
        minLength:[8, "Password should be graeter then 8 charachter"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role: {
        type:String,
        default:"user",
    },
    createdAt:{
        type:Date,
        default:Date.now
    },

    resetPasswordToken:String,
    resetPasswordExpired:Date,
});

userSchema.pre("save", async function(next) {
 if(!this.isModified("password")){
     next();
 }
    this.password=await bcrypt.hash(this.password, 10);
});

// jwt Token

userSchema.methods.getJWTToken = function () {
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRE,
    });
};

//Campare Password
userSchema.methods.comparePassword = async function (enteredpassword){
    return await bcrypt.compare(enteredpassword, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {

    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpired = Date.now() + 15 * 60 * 1000;
    return resetToken;
}

module.exports = mongoose.model("User", userSchema);