import { NextRequest, NextResponse } from "next/server"


const templateId = "ba7da132c4b3f2463803b6cdf5353ae040a998eae38bd67045f8198ed1ae5587"

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