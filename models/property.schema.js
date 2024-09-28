import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address:{
      type:String,
      required:true
    },
    house:{
      type:String,
      required:true,
    },
    slug:{
      type:String,
      required:true,
      unique:true
    },
    //city, state , country
    location:{
      type:String,
      required:true
    },
    zipcode:{
      type:String,
      required:true
    },
    price:{
      type:String,
    },
    star:{
      type:String,
    },
    sales:{
      type:String,
    },
    localTax:{
      type:Number,
      default:0
    },
    tags:[
      {
        type:String
      }
    ],
    keywords:[
      {
        type:String,
      }
    ],
    owner:{
      type:String
    },
    description:{type:String},
    details:{
      beds:{type:String},
      area:{type:String},
      bathrooms:{type:String},
      floor:{type:String}
    },
    taxPayable:{
      type:Number,
      default:0
    },
    img:[
      {
        type:String,
        required:true
      }
    ],

  },
  { timestamps: true }
);

const Property = mongoose.models.Property || mongoose.model("Property", propertySchema);

export default Property;
