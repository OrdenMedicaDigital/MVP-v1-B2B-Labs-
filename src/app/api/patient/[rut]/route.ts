import { getComunas, getPatientInfo, getRegiones } from "@/db/queries";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/nextauth";

export const GET = async (req:NextRequest,{params}:{
    params: Promise<{rut:string}>
})=>{
    const rut = (await params).rut
    const session = await getServerSession(authOptions)
    const labId = session?.user.labId as number
    const [ patient ] = await getPatientInfo(rut,labId)
    const region = await getRegiones()
    const regionUser = region.filter((v,i)=>v.name===patient.region)[0]
    const comunas = await getComunas(regionUser.idRegion)
    const comunaUser = comunas.filter(v=>v.name===patient.comuna)[0];
    const p = {
        ...patient,
        comuna: comunaUser,
        region:regionUser
    }
    return NextResponse.json(p)
}