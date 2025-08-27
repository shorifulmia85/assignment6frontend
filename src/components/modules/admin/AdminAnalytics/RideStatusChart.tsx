/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type StatusKey =
  | "requested"
  | "accepted"
  | "picked_up"
  | "in_transit"
  | "completed"
  | "cancelled";

interface StatusData {
  status: StatusKey | string;
  count: number;
}

interface StatusBreakdownProps {
  data: StatusData[];
}

const STATUS_ORDER: StatusKey[] = [
  "requested",
  "accepted",
  "picked_up",
  "in_transit",
  "completed",
  "cancelled",
];

const COLORS: Record<StatusKey, string> = {
  requested: "var(--muted)", // light neutral
  accepted: "var(--primary)", // brand indigo
  picked_up: "var(--accent)", // blue
  in_transit: "var(--secondary)", // tinted
  completed: "var(--chart-2)", // green
  cancelled: "var(--destructive)", // red
};

// label pretty: "picked_up" -> "Picked up"
const pretty = (s: string) =>
  s.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());

export default function RideStatusChart({ data }: StatusBreakdownProps) {
  const sorted = [...data].sort((a, b) => {
    const ia = STATUS_ORDER.indexOf(a.status as StatusKey);
    const ib = STATUS_ORDER.indexOf(b.status as StatusKey);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
  });

  // chart data with fills
  const chartData = sorted.map((d) => ({
    ...d,
    fill: COLORS[d.status as StatusKey] ?? "var(--muted-foreground)",
  }));

  const total = chartData.reduce((sum, x) => sum + (x.count || 0), 0);
  type PieViewBox = { cx: number; cy: number };
  return (
    <Card className="border-muted">
      <CardHeader>
        <CardTitle>Rides by Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={4}
                stroke="var(--card)"
                strokeWidth={2}
              >
                {chartData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.fill} />
                ))}

                <Label
                  position="center"
                  content={(props) => {
                    const vb = (props as any).viewBox as PieViewBox | undefined;
                    if (!vb) return null;
                    const { cx, cy } = vb;

                    return (
                      <text
                        x={cx}
                        y={cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="var(--foreground)"
                      >
                        <tspan fontSize="14" opacity="0.7">
                          Total
                        </tspan>
                        <tspan x={cx} dy="18" fontSize="18" fontWeight="600">
                          {total}
                        </tspan>
                      </text>
                    );
                  }}
                />
              </Pie>

              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.10)",
                  color: "var(--foreground)",
                }}
                formatter={(value: number, _name, item: any) => {
                  const status = item?.payload?.status ?? "";
                  return [value, pretty(status)];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="space-y-2 mt-4">
          {chartData.map((item) => {
            const pct = total ? Math.round((item.count / total) * 100) : 0;
            return (
              <div
                key={item.status}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ background: item.fill }}
                  />
                  <span className="text-sm capitalize text-muted-foreground">
                    {pretty(item.status)}
                  </span>
                </div>
                <div className="text-sm font-medium">
                  {item.count} {total ? `(${pct}%)` : ""}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
