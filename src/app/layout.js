import localFont from "next/font/local";
import "./globals.css";
import { inter } from "@/app/fonts";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { NextUIProvider } from "@nextui-org/react";
import "./webfonts/uicons-regular-straight.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// const icons = localFont({
//   src: "./webfonts/uicons-regular-straight.woff",
//   weight: "100 900",
// });

export const metadata = {
  title: "WBG",
  description: "Western Balkan Tour Guide",
};

export default async function RootLayout({ children }) {
  const locale = await getLocale();

  console.log("locale", locale)

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      {/* <head>
        <link href="./webfonts/uicons-regular-straight.css" rel="stylesheet" />
      </head> */}
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${inter.className} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <NextUIProvider>{children}</NextUIProvider>
        </NextIntlClientProvider>

         {/* <div>bodyyyyy</div>
        <i className="fi fi-rs-camera"></i> */}
        {/* <link href="./webfonts/uicons-regular-straight.css" rel="stylesheet" />  */}
      </body>
    </html>
  );
}
