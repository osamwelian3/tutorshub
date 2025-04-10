"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
const chartData = [
  { date: "2024-04-01", biology: 222, python_programming: 150 },
  { date: "2024-04-02", biology: 97, python_programming: 180 },
  { date: "2024-04-03", biology: 167, python_programming: 120 },
  { date: "2024-04-04", biology: 242, python_programming: 260 },
  { date: "2024-04-05", biology: 373, python_programming: 290 },
  { date: "2024-04-06", biology: 301, python_programming: 340 },
  { date: "2024-04-07", biology: 245, python_programming: 180 },
  { date: "2024-04-08", biology: 409, python_programming: 320 },
  { date: "2024-04-09", biology: 59, python_programming: 110 },
  { date: "2024-04-10", biology: 261, python_programming: 190 },
  { date: "2024-04-11", biology: 327, python_programming: 350 },
  { date: "2024-04-12", biology: 292, python_programming: 210 },
  { date: "2024-04-13", biology: 342, python_programming: 380 },
  { date: "2024-04-14", biology: 137, python_programming: 220 },
  { date: "2024-04-15", biology: 120, python_programming: 170 },
  { date: "2024-04-16", biology: 138, python_programming: 190 },
  { date: "2024-04-17", biology: 446, python_programming: 360 },
  { date: "2024-04-18", biology: 364, python_programming: 410 },
  { date: "2024-04-19", biology: 243, python_programming: 180 },
  { date: "2024-04-20", biology: 89, python_programming: 150 },
  { date: "2024-04-21", biology: 137, python_programming: 200 },
  { date: "2024-04-22", biology: 224, python_programming: 170 },
  { date: "2024-04-23", biology: 138, python_programming: 230 },
  { date: "2024-04-24", biology: 387, python_programming: 290 },
  { date: "2024-04-25", biology: 215, python_programming: 250 },
  { date: "2024-04-26", biology: 75, python_programming: 130 },
  { date: "2024-04-27", biology: 383, python_programming: 420 },
  { date: "2024-04-28", biology: 122, python_programming: 180 },
  { date: "2024-04-29", biology: 315, python_programming: 240 },
  { date: "2024-04-30", biology: 454, python_programming: 380 },
  { date: "2024-05-01", biology: 165, python_programming: 220 },
  { date: "2024-05-02", biology: 293, python_programming: 310 },
  { date: "2024-05-03", biology: 247, python_programming: 190 },
  { date: "2024-05-04", biology: 385, python_programming: 420 },
  { date: "2024-05-05", biology: 481, python_programming: 390 },
  { date: "2024-05-06", biology: 498, python_programming: 520 },
  { date: "2024-05-07", biology: 388, python_programming: 300 },
  { date: "2024-05-08", biology: 149, python_programming: 210 },
  { date: "2024-05-09", biology: 227, python_programming: 180 },
  { date: "2024-05-10", biology: 293, python_programming: 330 },
  { date: "2024-05-11", biology: 335, python_programming: 270 },
  { date: "2024-05-12", biology: 197, python_programming: 240 },
  { date: "2024-05-13", biology: 197, python_programming: 160 },
  { date: "2024-05-14", biology: 448, python_programming: 490 },
  { date: "2024-05-15", biology: 473, python_programming: 380 },
  { date: "2024-05-16", biology: 338, python_programming: 400 },
  { date: "2024-05-17", biology: 499, python_programming: 420 },
  { date: "2024-05-18", biology: 315, python_programming: 350 },
  { date: "2024-05-19", biology: 235, python_programming: 180 },
  { date: "2024-05-20", biology: 177, python_programming: 230 },
  { date: "2024-05-21", biology: 82, python_programming: 140 },
  { date: "2024-05-22", biology: 81, python_programming: 120 },
  { date: "2024-05-23", biology: 252, python_programming: 290 },
  { date: "2024-05-24", biology: 294, python_programming: 220 },
  { date: "2024-05-25", biology: 201, python_programming: 250 },
  { date: "2024-05-26", biology: 213, python_programming: 170 },
  { date: "2024-05-27", biology: 420, python_programming: 460 },
  { date: "2024-05-28", biology: 233, python_programming: 190 },
  { date: "2024-05-29", biology: 78, python_programming: 130 },
  { date: "2024-05-30", biology: 340, python_programming: 280 },
  { date: "2024-05-31", biology: 178, python_programming: 230 },
  { date: "2024-06-01", biology: 178, python_programming: 200 },
  { date: "2024-06-02", biology: 470, python_programming: 410 },
  { date: "2024-06-03", biology: 103, python_programming: 160 },
  { date: "2024-06-04", biology: 439, python_programming: 380 },
  { date: "2024-06-05", biology: 88, python_programming: 140 },
  { date: "2024-06-06", biology: 294, python_programming: 250 },
  { date: "2024-06-07", biology: 323, python_programming: 370 },
  { date: "2024-06-08", biology: 385, python_programming: 320 },
  { date: "2024-06-09", biology: 438, python_programming: 480 },
  { date: "2024-06-10", biology: 155, python_programming: 200 },
  { date: "2024-06-11", biology: 92, python_programming: 150 },
  { date: "2024-06-12", biology: 492, python_programming: 420 },
  { date: "2024-06-13", biology: 81, python_programming: 130 },
  { date: "2024-06-14", biology: 426, python_programming: 380 },
  { date: "2024-06-15", biology: 307, python_programming: 350 },
  { date: "2024-06-16", biology: 371, python_programming: 310 },
  { date: "2024-06-17", biology: 475, python_programming: 520 },
  { date: "2024-06-18", biology: 107, python_programming: 170 },
  { date: "2024-06-19", biology: 341, python_programming: 290 },
  { date: "2024-06-20", biology: 408, python_programming: 450 },
  { date: "2024-06-21", biology: 169, python_programming: 210 },
  { date: "2024-06-22", biology: 317, python_programming: 270 },
  { date: "2024-06-23", biology: 480, python_programming: 530 },
  { date: "2024-06-24", biology: 132, python_programming: 180 },
  { date: "2024-06-25", biology: 141, python_programming: 190 },
  { date: "2024-06-26", biology: 434, python_programming: 380 },
  { date: "2024-06-27", biology: 448, python_programming: 490 },
  { date: "2024-06-28", biology: 149, python_programming: 200 },
  { date: "2024-06-29", biology: 103, python_programming: 160 },
  { date: "2024-06-30", biology: 446, python_programming: 400 },
]

const chartConfig = {
  visitors: {
    label: "Performance Overview",
  },
  desktop: {
    label: "Biology",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Python Programming",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function StudentProgressChart() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("30d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardTitle>Performance Overview</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:block hidden">
            Performance for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <div className="absolute right-4 top-4">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="@[767px]/card:flex hidden"
          >
            <ToggleGroupItem value="90d" className="h-8 px-2.5">
              Last 3 months
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" className="h-8 px-2.5">
              Last 30 days
            </ToggleGroupItem>
            <ToggleGroupItem value="7d" className="h-8 px-2.5">
              Last 7 days
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="@[767px]/card:hidden flex w-40"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="biology"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="python_programming"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
