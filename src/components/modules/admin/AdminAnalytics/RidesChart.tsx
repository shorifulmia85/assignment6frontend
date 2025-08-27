/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface RidesData {
  rides: number;
  date: string;
}

type Palette =
  | "primary"
  | "accent"
  | "chart-1"
  | "chart-2"
  | "chart-3"
  | "chart-4"
  | "chart-5";

interface RidesChartProps {
  data: RidesData[];
  color?: Palette;
}

const colorVarMap: Record<Palette, string> = {
  primary: "var(--primary)",
  accent: "var(--accent)",
  "chart-1": "var(--chart-1)",
  "chart-2": "var(--chart-2)",
  "chart-3": "var(--chart-3)",
  "chart-4": "var(--chart-4)",
  "chart-5": "var(--chart-5)",
};

const RidesChart = ({ data, color = "chart-1" }: RidesChartProps) => {
  const chartData = data.map((d) => ({
    ...d,
    date: new Date(d.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }));

  const cssVars = {
    ["--rides-base" as any]: colorVarMap[color],

    ["--rides-start" as any]:
      "color-mix(in oklch, var(--rides-base) 95%, transparent 5%)",

    ["--rides-end" as any]:
      "color-mix(in oklch, var(--rides-base) 60%, var(--card) 40%)",

    ["--tooltip-bg" as any]: "var(--card)",
    ["--tooltip-border" as any]: "var(--border)",
    ["--tooltip-fg" as any]: "var(--foreground)",
  } as React.CSSProperties;

  return (
    <Card className="border-muted" style={cssVars}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <span
            className="w-3 h-3 rounded-full"
            style={{ background: "var(--rides-base)" }}
          />
          Daily Rides
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <defs>
                <linearGradient id="ridesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={"var(--rides-start)"} />
                  <stop offset="95%" stopColor={"var(--rides-end)"} />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                className="text-muted-foreground text-xs"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                className="text-muted-foreground text-xs"
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--tooltip-bg)",
                  border: "1px solid var(--tooltip-border)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.10)",
                }}
                labelStyle={{ color: "var(--tooltip-fg)" }}
                formatter={(value: number) => [value, "Rides"]}
              />

              <Bar
                dataKey="rides"
                fill="url(#ridesGradient)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RidesChart;
