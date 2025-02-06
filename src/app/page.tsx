import {
  Button,
  Column,
  Flex,
  Heading,
  Input,
  Row,
} from "@/once-ui/components";
import { Header } from "@/once-ui/modules";
import Link from "next/link";

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
        <Row fillWidth>
          <Input id="Serach" label="Search" labelAsPlaceholder />
        </Row>
        <Row fillWidth>
          <Heading as="h2">Ordenes medicas</Heading>
        </Row>
        <Row fillWidth>
          <Column fillWidth>
            {data.map((item, index) => {
              return (
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
              );
            })}
          </Column>
        </Row>
      </Column>
    </Column>
  );
}
