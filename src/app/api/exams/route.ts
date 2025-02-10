import { getAllExams } from "@/db/queries"
import { NextResponse } from "next/server"

export const GET = async () => {
    return NextResponse.json(await getAllExams())
}