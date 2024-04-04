import './globals.css'
import {Header} from "~/src/components/Header";
import React from "react";
import {Providers} from "~/app/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <head>
        <title> Boards</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
    </head>

    <body className={"bg-gray-900 text-gray-50"}>
        <Header/>
        <div className={"p-4"}> {children}</div>
        <Providers/>
    </body>

    </html>
  )
}
