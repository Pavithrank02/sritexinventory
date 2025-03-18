import React from "react";
import Card, { CardContent } from "./Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarGraph = ({ data, name, detailKey, getLabel }) => {
   
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">{name}</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis
              dataKey={(entry) => getLabel(entry)}
              tick={{ fontSize: 12 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey={(entry) =>
                entry[detailKey]?.reduce(
                  (sum, item) => sum + (item.quantity || 0),
                  0
                )
              }
              fill="#82ca9d"
              name={`Total Quantity (${detailKey})`}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BarGraph;
