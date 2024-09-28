import Property from "@models/property.schema";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

await connectToDB();

export const POST = async (req) => {
    try {
        const { data } = await req.json();
        const properties = Array.isArray(data) ? data : [data];

        const newProperties = await Promise.all(
            properties.map(async (property) => {
                if (property.star > 5) {
                    throw new Error(`Property star rating must be less than or equal to 5. Received: ${property.star}`);
                }
                const newProperty = new Property({
                    name: property.name,
                    address: property.address,
                    house: property.house,
                    location: property.location,
                    slug:property.name.toLowerCase().replaceAll(" ",""),
                    zipcode: property.zipcode.toString(),
                    price: property.price.toString(),
                    star: property.star.toString(),
                    sales: property.sales,
                    img:property.img,
                    localTax: property.localTax.toString(),
                    tags: property.tags,
                    keywords: property.keywords,
                    owner: property.owner,
                    description: property.description,
                    details: property.details,
                    taxPayable: property.taxPayable.toString(),
                });

                return await newProperty.save();
            })
        );

        return new NextResponse(
            JSON.stringify({ message: properties.length>1?"Properties added successfully":"Property added successfully", data: newProperties }),
            { status: 200 }
        );
    } catch (error) {
        return new NextResponse("Error Adding Properties: " + error.message, {
            status: 500,
        });
    }
};

export const GET=async(req)=>{
    try {
        
        const{searchParams}=new URL(req.url);
        let query=searchParams.get('query').toLowerCase().replaceAll(" ","");
        if (query==="all"){
            const allProperties=await Property.find();

            if (!allProperties) return new NextResponse("No properties found", {status:400})

            return new NextResponse(JSON.stringify({message:"All Properties Fetched",data:allProperties}),{status:200})
        }else{
            const properties=await Property.findOne({slug:query});
            if (!properties) return new NextResponse("No properties found", {status:400});
            return new NextResponse(JSON.stringify({message:"Said property Fetched",data:properties}),{status:200});
        }
    
    } catch (error) {
        return new NextResponse("Error Fetching Property: " + error.message, {
            status: 500,
        });
    }
};