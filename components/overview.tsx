"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "6.1",
    value: 2.5,
  },
  {
    name: "6.2",
    value: 2.8,
  },
  {
    name: "6.3",
    value: 3.2,
  },
  {
    name: "6.4",
    value: 3.5,
  },
  {
    name: "6.5",
    value: 3.8,
  },
  {
    name: "6.6",
    value: 3.6,
  },
  {
    name: "6.7",
    value: 3.2,
  },
  {
    name: "6.8",
    value: 3.0,
  },
  {
    name: "6.9",
    value: 3.5,
  },
  {
    name: "6.10",
    value: 3.8,
  },
  {
    name: "6.11",
    value: 4.0,
  },
  {
    name: "6.12",
    value: 4.2,
  },
  {
    name: "6.13",
    value: 4.0,
  },
  {
    name: "6.14",
    value: 3.8,
  },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    let riskLevel = "低危";
    let color = "text-blue-500";
    
    if (value >= 4.0) {
      riskLevel = "高危";
      color = "text-red-500";
    } else if (value >= 3.0) {
      riskLevel = "中危";
      color = "text-orange-500";
    }
    
    return (
      <div className="bg-background border rounded-md shadow-sm p-2 text-xs">
        <p className="font-medium">{`${label} 日火险指数`}</p>
        <p className={color}>{`${riskLevel} (${value})`}</p>
      </div>
    );
  }

  return null;
};

const CustomBar = (props: any) => {
  const { x, y, width, height, value } = props;
  let fill = "#3b82f6"; // 低危 - 蓝色
  
  if (value >= 4.0) {
    fill = "#ef4444"; // 高危 - 红色
  } else if (value >= 3.0) {
    fill = "#f97316"; // 中危 - 橙色
  }
  
  return <rect x={x} y={y} width={width} height={height} fill={fill} rx={2} />;
};

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
          domain={[0, 5]}
          ticks={[0, 1, 2, 3, 4, 5]}
        />
        <Tooltip content={<CustomTooltip />} cursor={false} />
        <Bar
          dataKey="value"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
          shape={<CustomBar />}
        />
      </BarChart>
    </ResponsiveContainer>
  )
} 