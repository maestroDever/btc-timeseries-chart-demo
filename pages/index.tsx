import { useState, useMemo } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";

import Papa from "papaparse";
import fs from "fs";
import path from "path";

import Layout from "../components/layout";
import LineChart from "../components/LineChart";

import { BTC_DATA, Field, FilterOption } from "../utils/types";
import { filterOptions } from "../utils/constants";

export default function Home(props: Papa.ParseResult<BTC_DATA>) {
  const {
    data,
    meta: { fields = [] }
  } = props;

  const [filterOption, setFilterOption] = useState<FilterOption>();

  const filteredData = useMemo(() => {
    if (!filterOption) return data;
    return data.filter(
      (v) =>
        new Date(v[Field.TIME]) >= filterOption.range.min &&
        new Date(v[Field.TIME]) <= filterOption.range.max
    );
  }, [filterOption]);

  return (
    <Layout home>
      <Head>
        <title>BTC Address Balances over Time</title>
      </Head>
      <section className="p-10">
        <div className="max-w-2xl mx-auto p-8 text-center">Chart goes here</div>

        <LineChart
          data={filteredData}
          fields={fields as Field[]}
          unit={filterOption?.timeUnit ?? ("year" as const)}
        />

        <div className="flex justify-end gap-5">
          {filterOptions.map((option) => (
            <button className="" onClick={() => setFilterOption(option)} key={option.label}>
              {option.label}
            </button>
          ))}
        </div>
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
