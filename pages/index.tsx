import Head from "next/head";
import Layout from "../components/layout";
import { GetStaticProps } from "next";

import Papa from "papaparse";
import fs from "fs";
import path from "path";

enum Field {
  TIME = "Time",
  "OVER 1k" = "BTC / Addr Cnt of Bal ≥ $1K",
  "OVER 10k" = "BTC / Val in Addrs w/ Bal ≥ $10K USD",
  "OVER 100k" = "BTC / Val in Addrs w/ Bal ≥ $100K USD",
  "OVER 1M" = "BTC / Val in Addrs w/ Bal ≥ $1M USD",
  "OVER 10M" = "BTC / Val in Addrs w/ Bal ≥ $10M USD"
}

type BTCDATA = Record<Field, string | number>;

export default function Home(props: Papa.ParseResult<BTCDATA>) {
  const {
    data,
    meta: { fields = [] }
  } = props;

  return (
    <Layout home>
      <Head>
        <title>BTC Address Balances over Time</title>
      </Head>
      <section>
        <div className="max-w-2xl mx-auto p-8 text-center">Chart goes here</div>
        <table>
          <thead>
            <tr>
              {fields.map((field) => (
                <th key={field}>{field}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index}>
                {fields.map((field) => (
                  <td key={field + index}>{entry[field as Field]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const dataDirectory = path.join(process.cwd(), "data");
    const fullPath = path.join(dataDirectory, "Coin_Metrics_Network_Data_2023-02-02T14-32.csv");
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const parseResult = Papa.parse<BTCDATA>(fileContent, {
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
