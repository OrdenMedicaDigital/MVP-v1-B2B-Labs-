"use client"
import { Button } from "@/once-ui/components"
import { useRouter } from "next/navigation"

export default function RootPage(){
    const router = useRouter()
    return (
        <Button onClick={()=>router.push("/dashboard")}>Enter</Button>
    )
}