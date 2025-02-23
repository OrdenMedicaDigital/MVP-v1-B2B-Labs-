import api from "@/api";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getBillingInfo } from "@/db/queries";
import { formatCurrency } from "@/lib/formatCurrency";
import { Button, Card, Flex, Heading } from "@/once-ui/components";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Billing(){
    const session = await getServerSession(authOptions);
    const labId = session?.user.labId as number
    const billingInfo = await getBillingInfo(labId)

    const submit = async (formData:FormData) =>{
        "use server"
        console.log(labId)
        const paymentUrl = await api.message.submit({labId,amount:Number(billingInfo.totalAmountDue),paymentDate: new Date()})
        redirect(paymentUrl)
    }

    return (
        <Flex fillWidth gap="32" horizontal="end">
            <Card direction="column" padding="16" radius="l" flex={1}>
            <Heading variant="heading-strong-xs" size="xs">Total a pagar:</Heading>
            <Heading style={{
                fontSize:"82px"
            }}>{formatCurrency(Number(billingInfo.totalAmountDue))}</Heading>
            </Card>
            <Flex vertical="end">
            <form action={submit}>
            <Button disabled={billingInfo.totalAmountDue === "0"}>Realizar pago</Button>
            </form>
            </Flex>
        </Flex>
    )
}