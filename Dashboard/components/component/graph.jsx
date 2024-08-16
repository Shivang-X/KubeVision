import { Separator } from "@/components/ui/separator"
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CartesianGrid, XAxis, Area, AreaChart, Line, LineChart } from "recharts"
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart"

export function Graph({ data }) {
  console.log(data)
  return (
    (<div>
      <main >
        {/* <div className="max-w-6xl w-full mx-auto grid gap-2">
          <h1 className="font-semibold text-3xl">Analytics Dashboard</h1>
          <div className="flex items-center text-sm gap-2">
            <a href="#" className="font-medium" target="_blank">
              example.com
            </a>
            <Separator orientation="vertical" className="h-5" />
            <div className="text-muted-foreground flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 bg-[#09CE6B] rounded-full animate-ping duration-[5000]" />
              32 requests per minute
            </div>
          </div>
        </div> */}
        <div className="">
          <div className="grid md:grid-cols-1 gap-6">
            <Card>
              <div className="flex flex-row">
              <CardHeader>
              <CardTitle className="p-2 pt-0">
                  <span className="text-sm font-medium text-muted-foreground">
                    Success :
                  </span>{" "}
                  {Math.ceil(data?.totalStatus2And3)}
                </CardTitle>
              </CardHeader>
              <CardHeader>
              <CardTitle className="p-2 pt-0">
                  <span className="text-sm font-medium text-muted-foreground">
                    Failure :
                  </span>{" "}
                  {Math.ceil(data?.totalStatus4)}
                </CardTitle>
              </CardHeader>
              </div>
              <CardContent>
                <AreachartgradientChart />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-6">
            {/* <Card>
              <CardHeader className="flex flex-row items-center border-b">
                <CardTitle>Recent Requests</CardTitle>
                <CardDescription className="ml-auto">
                  <Button variant="outline" size="sm" className="gap-2 rounded-full bg-background">
                    View All
                    <Maximize2Icon className="w-4 h-4" />
                  </Button>
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 text-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">GET /api/users</div>
                    <div className="text-muted-foreground">200 OK</div>
                  </div>
                  <div className="font-semibold">125ms</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">POST /api/orders</div>
                    <div className="text-muted-foreground">201 Created</div>
                  </div>
                  <div className="font-semibold">250ms</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">GET /api/products</div>
                    <div className="text-muted-foreground">200 OK</div>
                  </div>
                  <div className="font-semibold">180ms</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">DELETE /api/users/123</div>
                    <div className="text-muted-foreground">204 No Content</div>
                  </div>
                  <div className="font-semibold">90ms</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">GET /api/reports</div>
                    <div className="text-muted-foreground">200 OK</div>
                  </div>
                  <div className="font-semibold">220ms</div>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </main>
    </div>)
  );
}

function AreachartgradientChart(props) {
  return (
    (<div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-2))",
          },
          mobile: {
            label: "Mobile",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="min-h-[300px]">
        <AreaChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186, mobile: 80 },
            { month: "February", desktop: 305, mobile: 200 },
            { month: "March", desktop: 237, mobile: 120 },
            { month: "February", desktop: 305, mobile: 200 },
            { month: "April", desktop: 73, mobile: 190 },
            { month: "May", desktop: 209, mobile: 130 },
            { month: "June", desktop: 214, mobile: 140 },
            { month: "May", desktop: 209, mobile: 130 },
            { month: "April", desktop: 73, mobile: 190 },
            { month: "May", desktop: 209, mobile: 130 },
            { month: "January", desktop: 186, mobile: 80 },
            { month: "April", desktop: 73, mobile: 190 },
            { month: "February", desktop: 305, mobile: 200 },
            { month: "January", desktop: 186, mobile: 80 },
            { month: "April", desktop: 73, mobile: 190 },
          ]}
          margin={{
            left: 12,
            right: 12,
          }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <defs>
            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            dataKey="mobile"
            type="natural"
            fill="url(#fillMobile)"
            fillOpacity={0.4}
            stroke="var(--color-mobile)"
            stackId="a" />
          <Area
            dataKey="desktop"
            type="natural"
            fill="url(#fillDesktop)"
            fillOpacity={0.4}
            stroke="var(--color-desktop)"
            stackId="a" />
        </AreaChart>
      </ChartContainer>
    </div>)
  );
}


function LinechartChart(props) {
  return (
    (<div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}>
        <LineChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
          margin={{
            left: 12,
            right: 12,
          }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line
            dataKey="desktop"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false} />
        </LineChart>
      </ChartContainer>
    </div>)
  );
}


function Maximize2Icon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" x2="14" y1="3" y2="10" />
      <line x1="3" x2="10" y1="21" y2="14" />
    </svg>)
  );
}


function XIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>)
  );
}
