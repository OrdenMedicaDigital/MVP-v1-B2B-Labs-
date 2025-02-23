"use client";
import {
  Button,
  Column,
  Flex,
  Heading,
  Input,
  PasswordInput,
} from "@/once-ui/components";
import { signIn, useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";

export default function RootPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const session = useSession();
  console.log(session)

  useEffect(() => {
    if (session?.data?.user.role === "MainAdmin") {
      window.location.href = "/admin/dashboard";
    }else if(session.data){
      window.location.href = "/dashboard";
    }
  }, [session]);

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await signIn("credentials", {
      email: email as string,
      password: password as string,
      redirect:false
    });

    if(!response?.ok){
      alert("Credenciales incorrectas")
    }
  };

  if(session.status === "loading") {
    return null;
  }

  return (
    <Flex
      horizontal="center"
      style={{ height: "100vh" }}
      vertical="center"
      direction="column"
      fillWidth
      gap="16"
      flex={1}
    >
      <Column gap="16" maxWidth={"s"} padding="16">
        <Heading variant="heading-strong-xl">Bienvenido</Heading>
        <form
          id="login"
          onSubmit={login}
          className="w-full flex flex-col gap-4"  
        >
          <Input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="text"
            label="Correo"
          />
          <PasswordInput
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            label="Contraseña"
          />
          <Button fillWidth>Ingresar</Button>
        </form>
      </Column>
    </Flex>
  );
}
