import { createOrder, getAllOrders, getOrderById } from "@/db/queries";
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


export const GET = async (req:NextRequest) => {
    const orders = await getAllOrders();
    const mappedOrders = await Promise.all(orders.map(async order => {
        const data = await getOrderById(order.orderId);
        return {
            orderId: data?.orderId,
            patientName: data?.patient.name,
            patientPaterno: data?.patient.paterno,
            patientMaterno: data?.patient.materno,
            date: data?.orderDate,
            state: order.orderState,
            exams: data?.exams
    }}))
    return NextResponse.json(mappedOrders);
}