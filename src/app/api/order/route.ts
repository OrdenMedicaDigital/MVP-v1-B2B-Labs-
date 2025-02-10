import { createOrder } from "@/db/queries";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req:NextRequest) => {
    try{
    const {patient,exams} = await req.json();
    const {id} = await createOrder(patient, exams);
    return NextResponse.json({message: "Order created", id});
    }catch(e){
        if(e instanceof Error){
            console.log(e.message);
        return NextResponse.json({message: "Error creating order", error: e.message},{
            status:500
        });
    }
    }
}