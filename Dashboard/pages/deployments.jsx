"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CartesianGrid, XAxis, Line, LineChart, Pie, PieChart } from "recharts"
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { getAvgResponseTime, getDeployments, getDesiredReplicas, getPods, getServices, getTotalRequests } from "@/services/k8sServices"
import Aside from "@/components/component/aside"
import Header from "@/components/component/header"

export default function Deployments() {

    const [ deployments, setDeployments ] = useState([]);

    useEffect(() => {
      if (typeof window !== 'undefined') {
        fetchDeployments();
      }
    }, []);
  
    const fetchDeployments = async () => {
      const response = await getDeployments();
      setDeployments(response);
    }

  return (
    <>
    <div className="grid min-h-screen w-full grid-cols-[240px_1fr]">
      <Aside/>
      <div className="flex flex-col">
        <Header/>
        <main className="flex-1 space-y-4 p-4 md:p-6">
          <div className="grid grid-cols-1 gap-4  md:grid-cols-1 lg:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Deployments</CardTitle>
                {/* <CardDescription>Total number of pods running</CardDescription> */}
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Namespace</TableHead>
                      <TableHead>IP Address</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deployments.map(deployment => {
                      return <>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">{deployment.metric.deployment}</div>
                          </TableCell>
                          <TableCell>
                            <div dateTime="2023-06-25">{deployment.metric.namespace}</div>
                          </TableCell>
                          <TableCell>
                            <div dateTime="2023-06-25">{deployment.metric.node}</div>
                          </TableCell>
                        </TableRow>
                      </>
                    })}
                  </TableBody>
                </Table>
              </CardContent>
              {/* <CardFooter className="text-sm text-muted-foreground">Showing the last 3 orders</CardFooter> */}
            </Card>
          </div>
        </main>
      </div>
    </div>
    </>
  );
}


function BellIcon(props) {
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
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>)
    );
  }
  
  
  function DollarSignIcon(props) {
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
        <line x1="12" x2="12" y1="2" y2="22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>)
    );
  }
  
  
  function HomeIcon(props) {
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
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>)
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
            data={typeof window !== 'undefined' ? [...JSON.parse(localStorage.getItem("Req/min"))] : [
              {month: 2, desktop: 0}]}
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
  
  
  function MenuIcon(props) {
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
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>)
    );
  }
  
  
  function Package2Icon(props) {
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
        <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
        <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
        <path d="M12 3v6" />
      </svg>)
    );
  }
  
  
  function PackageIcon(props) {
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
        <path d="m7.5 4.27 9 5.15" />
        <path
          d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>)
    );
  }
  
  
  function PiechartcustomChart(props) {
    return (
      (<div {...props}>
        <ChartContainer
          config={{
            visitors: {
              label: "Visitors",
            },
            chrome: {
              label: "Chrome",
              color: "hsl(var(--chart-1))",
            },
            safari: {
              label: "Safari",
              color: "hsl(var(--chart-2))",
            },
            firefox: {
              label: "Firefox",
              color: "hsl(var(--chart-3))",
            },
            edge: {
              label: "Edge",
              color: "hsl(var(--chart-4))",
            },
            other: {
              label: "Other",
              color: "hsl(var(--chart-5))",
            },
          }}>
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={[
                { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
                { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
                { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
                { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
                { browser: "other", visitors: 90, fill: "var(--color-other)" },
              ]}
              dataKey="visitors"
              nameKey="browser" />
          </PieChart>
        </ChartContainer>
      </div>)
    );
  }
  
  
  function SettingsIcon(props) {
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
        <path
          d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>)
    );
  }
  
  
  function ShoppingCartIcon(props) {
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
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path
          d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>)
    );
  }
  
  
  function TrendingDownIcon(props) {
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
        <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
        <polyline points="16 17 22 17 22 11" />
      </svg>)
    );
  }
  
  
  function TrendingUpIcon(props) {
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
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>)
    );
  }
  
  
  function UsersIcon(props) {
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
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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
  
