import Property from "@models/property.schema";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    let query = searchParams.get('query').toLowerCase().replaceAll(" ", "");

    // Use regex to match if the slug contains the query
    const properties = await Property.find({
      slug: { $regex: query, $options: 'i' }  // 'i' for case-insensitive
    });

    if (!properties || properties.length === 0) {
      return new NextResponse("No properties found", { status: 400 });
    }

    return new NextResponse(
      JSON.stringify({ message: "Said property fetched", data: properties }),
      { status: 200 }
    );

  } catch (error) {
    return new NextResponse("Error Fetching Property: " + error.message, {
      status: 500,
    });
  }
};
