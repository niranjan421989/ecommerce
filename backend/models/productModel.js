const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter Product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true, "Please Enter product Description"]
    },
    price:{
        type:Number,
        required:[true, "Please Enter Product Price"],
        maxLength:[8, "Price Cannot exceed 8 character"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
],
    category:{
        type:String,
        required:[true, "Please enter product category"]
    },
    stock:{
        type:Number,
        required:[true, "Please enter product stock"],
        maxLength:[4, "cannot exceed 4 character"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true,
        },
         name:{
             type:String,
             required:true,
         },
         rating:{
             type:Number,
             required:true
         },
         comment:{
             type:String,
             required:true
         },
         reviewDate:{
             type:Date,
             default:Date.now
         }
    }],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:false,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
});

module.exports = mongoose.model("Product", productSchema);