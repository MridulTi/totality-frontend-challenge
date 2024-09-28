import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    owner:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    order:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Property"
    }
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
