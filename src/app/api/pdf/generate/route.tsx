import carbone from "carbone"
import { NextRequest, NextResponse } from "next/server"


const templateId = "0847716df5f35054877f92b7d2e877fcbe1bfcb9c81b47bf9f5f343344a1259c"

export const POST = async (req:NextRequest) => {
    const {data} = await req.json()
    const res = await fetch(`http://209.46.120.43:4000/render/${templateId}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({data,convertTo:"pdf"})
    })
    const result = await res.json()
    return NextResponse.json(result)
}