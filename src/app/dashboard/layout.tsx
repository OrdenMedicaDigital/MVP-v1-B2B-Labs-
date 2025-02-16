import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";

import classNames from "classnames";
import { headers } from "next/headers";
import { Metadata } from "next";

import {
  baseURL,
  style,
  meta,
  og,
  schema,
  social,
} from "@/once-ui/resources/config";
import {
  Background,
  Column,
  Flex,
  Row,
  ToastProvider,
} from "@/once-ui/components";

import { Inter } from "next/font/google";
import { Roboto_Mono } from "next/font/google";
import { Header, Sidebar } from "@/once-ui/modules";
import BlackBackround from "@/components/BlackBaground";
import Main from "@/components/Main";

const primary = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
});

const code = Roboto_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

type FontConfig = {
  variable: string;
};

/*
	Replace with code for secondary and tertiary fonts
	from https://once-ui.com/customize
*/
const secondary: FontConfig | undefined = undefined;
const tertiary: FontConfig | undefined = undefined;
/*
 */

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host");
  const metadataBase = host ? new URL(`https://${host}`) : undefined;

  return {
    title: meta.title,
    description: meta.description,
    metadataBase,
  };
}

const schemaData = {
  "@context": "https://schema.org",
  "@type": schema.type,
  url: "https://" + baseURL,
  logo: schema.logo,
  name: schema.name,
  description: schema.description,
  email: schema.email,
  sameAs: Object.values(social).filter(Boolean),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <>
        <Sidebar/>
        <Main>          {children}</Main>
        </>
  );
}
