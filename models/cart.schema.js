import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    owner:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    orderList:{
      type:[
        {
          type:mongoose.Schema.ObjectId,
          ref:"Property"
        }
      ]
    },
    totalCost:{
      type: Number,
      required:true,
      default:0
    },
    totalTax:{
      type:Number,
      default:0
    },
    amountPayable:{
      type:Number,
      default:0
    }
  },
  { timestamps: true }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
