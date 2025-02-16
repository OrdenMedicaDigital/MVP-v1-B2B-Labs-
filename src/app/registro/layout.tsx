import { Flex } from "@/once-ui/components";

export default function RegisterLayout({
    children
}:{
    children: React.ReactNode
}){
    return (
        <Flex fillWidth horizontal="center">
{children}
        </Flex>
    )
}