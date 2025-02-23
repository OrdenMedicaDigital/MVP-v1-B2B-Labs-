import { getPlans } from "@/db/queries";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const plans = await getPlans();
    return NextResponse.json(plans);
}