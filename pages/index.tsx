import Head from "next/head";
import Layout from "../components/layout";
import { GetStaticProps } from "next";

import Papa from "papaparse";
import fs from "fs";
import path from "path";
import { BTC_DATA, Field } from "../types";
import LineChart from "../components/LineChart";

export default function Home(props: Papa.ParseResult<BTC_DATA>) {
  const {
    data,
    meta: { fields = [] }
  } = props;

  return (
    <Layout home>
      <Head>
        <title>BTC Address Balances over Time</title>
      </Head>
      <section style={{ padding: "40px" }}>
        <div className="max-w-2xl mx-auto p-8 text-center">Chart goes here</div>

        <LineChart data={data} fields={fields as Field[]} />
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const dataDirectory = path.join(process.cwd(), "data");
    const fullPath = path.join(dataDirectory, "Coin_Metrics_Network_Data_2023-02-02T14-32.csv");
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const parseResult = Papa.parse<BTC_DATA>(fileContent, {
      header: true,
      dynamicTyping: true
    });

    if (parseResult.errors.length) throw new Error("Error whiel parsing the csv file...");

    return {
      props: {
        ...parseResult
      }
    };
  } catch (error) {
    throw error;
  }
};
