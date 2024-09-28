import Cart from "@models/cart.schema";
import Property from "@models/property.schema";
import { verifyJWT } from "@utils/verifyjwt";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const userId = await verifyJWT(req);
    const { slug } = await req.json();


    const property = await Property.findOne({ slug });
    if (!property) {
      return new NextResponse("Said Property not found", { status: 200 });
    }

    let currentUserCart = await Cart.findOne({ owner: userId });

    if (!currentUserCart) {
      console.log("NEW CART CREATING!");

      const newCart = new Cart({
        owner: userId,
        orderList: [property._id],
        totalCost: Number(property.price),
        totalTax: Number(property.taxPayable),
        amountPayable: Number(property.price) + Number(property.taxPayable),
      });

      await newCart.save();
      return new NextResponse(
        JSON.stringify({ message: "New cart created successfully", data: newCart.toObject() }),
        { status: 201 }
      );
    } else {
      currentUserCart = await Cart.findOneAndUpdate(
        { owner: userId },
        {
          $push: { orderList: property._id },
          $inc: {
            totalCost: Number(property.price),
            totalTax: Number(property.taxPayable),
            amountPayable: Number(property.price) + Number(property.taxPayable),
          },
        },
        { new: true }
      );

      return new NextResponse(
        JSON.stringify({ message: "Cart updated successfully", data: currentUserCart.toObject() }),
        { status: 200 }
      );
    }
  } catch (error) {
    return new NextResponse("Error adding to the cart: " + error.message, {
      status: 500,
    });
  }
};


export const GET=async(req)=>{
    try {
        const userId=await verifyJWT(req);
        const userCart=await Cart.findOne({owner:userId}).populate("orderList")

        if(!userCart) return new NextResponse("Cart not found",{status:400})
        
            return new NextResponse(JSON.stringify({message:"User Cart Fetched",data:userCart}),{status:200})
        
    } catch (error) {
        return new NextResponse("Error fetching user cart: " + error.message, {
            status: 500,
        });
    }
};