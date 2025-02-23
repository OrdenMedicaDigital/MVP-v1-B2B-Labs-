import { getPlans } from "@/db/queries";
import { Button, Card, Column, Flex, Grid, Heading } from "@/once-ui/components";
import Plan from "@/components/Plan";
import Resume from "@/components/Resume";

export default async function Checkout(){
    const plans = await getPlans();

    return (
        <Flex gap="16" fillWidth padding="24">
            <Flex flex={1} direction="column" gap="16" padding="16">
                <Heading variant="heading-strong-xl">Seleccionar plan</Heading>
                
                <Grid gap="24" columns={3} fillWidth>
                {plans.map(plan=>{
                    return (
                        <Plan key={plan.id} plan={plan} />
                    )
                })}
                </Grid>
            </Flex>
            <Resume />
        </Flex>
    )
}