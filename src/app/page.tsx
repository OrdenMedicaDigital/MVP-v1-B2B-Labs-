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

const data = [
  {
    type: "Orden medica",
    date: "12/12/2021",
    patient: "Juan Perez",
    doctor: "Dr. Juan Perez",
    status: "En proceso",
  },
];

export default function HomePage() {
  return (
    <Column fillWidth>
      <Column fillWidth maxWidth="xl" padding="l" gap="24">
        <Row fillWidth fillHeight gap="16" vertical="center">
          <Input id="Serach" label="Search" labelAsPlaceholder />
          <Button>
            <Icon fillHeight name="filter" size="s" />
            <Heading color="white" as="h4">
              Filtrar
              </Heading>
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
                    <Heading as="h3" variant="body-default-m">
                      {item.type} | {item.status}
                    </Heading>
                    </Row>
                    <Row fillWidth horizontal="end" vertical="center">
                    <Heading as="h4" variant="body-default-s">
                      {item.date}
                    </Heading>
                    </Row>
                  </Row>
                    <Column fillWidth>
                      <Column fillWidth>
                        <Heading as="h4" variant="body-default-xl">
                          {item.patient}
                        </Heading>
                      </Column>
                      <Column fillWidth>
                        <Heading as="h4" variant="body-default-s">
                          {item.doctor}
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
