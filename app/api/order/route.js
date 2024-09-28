
import Cart from "@models/cart.schema";
import Order from "@models/order.schema";
import { connectToDB } from "@utils/database";
import { verifyJWT } from "@utils/verifyjwt";
import { NextResponse } from "next/server";

await connectToDB();

export const POST=async(req)=>{
    try {
        const userId=await verifyJWT(req);
        const{cartId}=await req.json();
        const userCart=await Cart.findOne({_id:cartId}).populate('orderList');
        if(!userCart) return new NextResponse("Error Fetching Cart",{status:400});
    
        const orders =userCart.orderList;

        const newOrders = await Promise.all(
            orders.map(async (order) => {
                
                const newOrder = new Order({
                    owner:userId,
                    order:order,
                });

                return await newOrder.save();
            })
        );
        const deletedCart=await Cart.findOneAndUpdate({_id:cartId},{
            $set:{orderList:[],amountPayable:0,totalCost:0,totalTax:0}
        })
        if (!deletedCart) return new NextResponse("Error Updating Cart",{status:500})

        return new NextResponse(
            JSON.stringify({ message: orders.length>1?"Orders added successfully":"Order added successfully", data: newOrders }),
            { status: 200 }
        );
    } catch (error) {
        return new NextResponse("Error Posting Order",{status:500});
    }
    
}

export const GET=async(req)=>{

    try {
        const userId=await verifyJWT(req);
        console.log(userId)
        const userOrders=await Order.find({owner:userId}).populate("order")
        
        if(!userOrders) return new NextResponse("Error Fetching All Orders",{status:400});

        return new NextResponse(JSON.stringify({message:"Orders fetched successfully",data:userOrders}),{status:200})

    } catch (error) {
        return new NextResponse("Error Fetching Orders: " + error.message, {
            status: 500,
        });
    }
}