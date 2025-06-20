import "~/styles/globals.css";
import "@uploadthing/react/styles.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import TopNav from "./_components/topnav";
import { extractRouterConfig } from "uploadthing/server";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { Toaster } from "sonner";
import { CSPostHogProvider } from "./_analytics/provider";
import { ourFileRouter } from "./api/uploadthing/core";
import Footer from "./_components/footer";
import Head from "next/head";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Delicipes",
  description: "Delicious and practical meals",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <body
          className={`font-sans ${inter.variable} dark flex flex-col gap-4`}
        >
          <div className="">
            <div className=" fixed z-50  w-full flex-col  bg-slate-800">
              <TopNav />
              <Footer />
            </div>
            <div className="h-24"></div>
            <main className="">{children}</main>
            {modal}
          </div>
          <div id="modal-root"></div>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
