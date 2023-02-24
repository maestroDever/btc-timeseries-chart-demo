import { NextApiRequest, NextApiResponse } from "next";
import Papa from "papaparse";
import fs from "fs";
import path from "path";

export default (_: NextApiRequest, res: NextApiResponse) => {
  // Return formatted coinmetrics data here
  let btcData;
  try {
    const dataDirectory = path.join(process.cwd(), "data");
    const fullPath = path.join(dataDirectory, "Coin_Metrics_Network_Data_2023-02-02T14-32.csv");
    const fileContent = fs.readFileSync(fullPath, "utf16le");


    Papa.parse(fileContent, {
      header: true,
      delimiter: "\t",
      complete: (res) => {
        btcData = {
          data: res.data,
          headers: res.meta.fields
        };
      }
    });
  } catch (error) {
    res.status(500).send('Error on parsing the request.')
  } finally {
    res.status(200).json(btcData);
  }
};
