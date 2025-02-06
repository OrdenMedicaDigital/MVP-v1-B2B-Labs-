'use client'
import { Column, NavIcon, Row } from "@/once-ui/components"
import BlackBackround from "./BlackBaground"
import { useSidebarStore } from "@/app/store/sidebar"

export default function Main({
    children
}:{
    children: React.ReactNode
}){
    const {isMobile, toggle} = useSidebarStore()
    console.log(isMobile)
    return (
        <Column fillWidth maxWidth={"xl"} paddingX="m" style={{paddingLeft:isMobile ? "16px" : "280px"}} paddingY="l" gap="24" horizontal="center" zIndex={1}>
        <BlackBackround />
        <Row fillWidth gap="16" horizontal="start" hidden={!isMobile}>
        <NavIcon onClick={()=>toggle()} />
        </Row>
          {children}
        </Column>
    )
}