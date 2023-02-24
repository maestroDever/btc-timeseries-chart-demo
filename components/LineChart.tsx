import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  TimeUnit
} from "chart.js";
import "chartjs-adapter-date-fns";

import { BTC_DATA, Field } from "../utils/types";
import { colors } from "../utils/constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

type Props = {
  data: BTC_DATA[];
  fields: Field[];
  unit: string;
};

const LineChart = (props: Props) => {
  const { data, fields, unit } = props;

  const labels = data.map((d) => d[Field.TIME]);
  const datasets = fields.slice(1).map((field, index) => ({
    label: `>${(field.match(/\$\d+[a-zA-Z]+/) ?? [field])[0]}`,
    data: data.map((value) => value[field]),
    borderColor: colors[index],
    fill: false
  }));

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      },
      title: {
        display: false
      }
    },
    normalized: true,
    datasets: {
      line: {
        pointRadius: 0 // disable for all `'line'` datasets
      }
    },
    scales: {
      x: {
        type: "time" as const,
        time: {
          unit: unit as TimeUnit,
          tooltipFormat: "MM/dd/yyyy"
        },
        bounds: "ticks" as const,
        min: new Date(data[0][Field.TIME]).valueOf(),
        max: new Date(data[data.length - 1][Field.TIME]).valueOf()
      }
    }
  };

  const chartData = {
    labels,
    datasets
  };

  return <Line options={options} data={chartData} />;
};

export default LineChart;
