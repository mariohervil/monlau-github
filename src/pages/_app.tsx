import "@uploadthing/react/styles.css";
import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { api } from "~/utils/api";
import Layout from "~/components/Layout";
import "~/styles/globals.css";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Layout>
        <Head>
          <title>Monlau Codes</title>
          <meta name="description" content="github for students" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps}/>
        <Toaster position="bottom-center" />
      </Layout>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
