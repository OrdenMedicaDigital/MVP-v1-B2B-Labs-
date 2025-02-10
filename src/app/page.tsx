import { insertExams } from "@/db/exams";
import { getAllOrders } from "@/db/queries";
import {
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  Input,
  Row,
  SmartLink,
} from "@/once-ui/components";


export default async function HomePage() {
  const data = await getAllOrders();
  return (
    <Column fillWidth>
      <Column fillWidth maxWidth="xl" padding="l" gap="24">
        <Row fillWidth fillHeight gap="16" vertical="center">
          <Input id="Serach" label="Search" labelAsPlaceholder />
          <Button>
            <Icon fillHeight name="filter" size="s" />
              Filtrar
          </Button>
        </Row>
        <Row fillWidth>
          <Heading as="h2">Ordenes medicas</Heading>
        </Row>
        <Row fillWidth>
          <Column fillWidth>
            {data.map((item, index) => {
              return (
                <SmartLink href="/order" key={index} fillWidth>
                <Row key={index} fillWidth gap="8">
                  <Column fillWidth padding="m" background="surface" radius="m">
                  <Row fillWidth>
                    <Row fillWidth>
                    </Row>
                    <Row fillWidth horizontal="end" vertical="center">
                    <Heading as="h4" variant="body-default-s">
                      {item.orderDate}
                    </Heading>
                    </Row>
                  </Row>
                    <Column fillWidth>
                      <Column fillWidth>
                        <Heading as="h4" variant="body-default-xl">
                          {item.patient.name}
                        </Heading>
                      </Column>
                    </Column>
                  </Column>
                </Row>
                </SmartLink>
              );
            })}
          </Column>
        </Row>
      </Column>
    </Column>
  );
}
