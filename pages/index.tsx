import Head from "next/head";
import Layout from "../components/layout";
import { GetStaticProps } from "next";

import Papa from "papaparse";
import fs from "fs";
import path from "path";

export default function Home(props: { data: any; headers: any }) {
  return (
    <Layout home>
      <Head>
        <title>BTC Address Balances over Time</title>
      </Head>
      <section>
        <div className="max-w-2xl mx-auto p-8 text-center">Chart goes here</div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/btc-addresses");
  const data = await res.json();

  console.log({ data });
  return {
    props: {},
  };
};
