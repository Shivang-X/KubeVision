"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Card,

  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CartesianGrid, XAxis, Line, LineChart, Pie, PieChart } from "recharts";
import {
  ChartTooltipContent,
  ChartTooltip,
  ChartContainer,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import {
  getAvgResponseTime,
  getCPUStats,
  getDeployments,
  getDesiredReplicas,
  getHPA,
  gethpa,
  getIncommingRequestsData,
  getMemoryStats,
  getNodeData,
  getPods,
  getPV,
  getPVC,
  getReplicaSets,
  getServices,
  getTotalRequests,
  getValuesByInstance,
} from "@/services/k8sServices";
import Aside from "./aside";
import axios from "axios";
import { Graph } from "./graph";
import Header from "./header";
// import fetch from 'node-fetch'; 

export function Dashboard() {

  
  const [deployment, setDeployments] = useState([]);
  const [services, setServices] = useState([]);
  const [pods, setPods] = useState([]);
  const [replicaSets, setReplicaSets] = useState([]);
  const [pv, setPV] = useState([]);
  const [pvc, setPVC] = useState([]);
  const [hpa, setHPA] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [desiredReplicas, setDesiredReplicas] = useState();
  const [totalRequests, setgetTotalRequests] = useState();
  const [avgResponseTime, setAvgResponseTime] = useState();
  const [cpuStats, setCPUStats] = useState();
  const [incommingReqData, setIncommingReqData] = useState();
  const [valuesByInstance, setValuesByInstance] = useState({});
  const [loading, setLoading] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoading(true);
      fetchDeployments();
      fetchServices();
      fetchPods();
      fetchReplicaSets();
      fetchDesiredReplicas();
      fetchTotalIncommingRequests();
      fetchAvgResponseTime();
      fetchValuesByInstance();
      fetchNodesData();
      fetchCPUstats();
      fetchIncommingRequestsData();
      fetchPV();
      fetchPVC();
      fetchHPA();
      setLoading(false);
    }

  }, []);

  const fetchDeployments = async () => {
    const response = await getDeployments();
    setDeployments(response);
  };

  const fetchServices = async () => {
    const response = await getServices();
    setServices(response);
  };

  const fetchPods = async () => {
    const response = await getPods();
    setPods(response);
  };

  const fetchReplicaSets = async () => {
    const response = await getReplicaSets();
    setReplicaSets(response);
  }

  const fetchPV = async () => {
    const response = await getPV();
    setPV(response);
  }

  const fetchPVC = async () => {
    const response = await getPVC();
    setPVC(response);
  }

  const fetchHPA = async () => {
    const response = await getHPA();
    setHPA(response);
  }

  const fetchDesiredReplicas = async () => {
    const response = await getDesiredReplicas();
    setDesiredReplicas(response[0].value[1]);
  };

  const fetchTotalIncommingRequests = async () => {
    const response = await getTotalRequests();
    setgetTotalRequests(response);
  };

  const fetchAvgResponseTime = async () => {
    const response = await getAvgResponseTime();
    setAvgResponseTime(response);
  };

  const fetchValuesByInstance = async () => {
    const response = await getValuesByInstance();
    setValuesByInstance(response);
  };

  const fetchNodesData = async () => {
    const response = await getNodeData();
    setNodes(response);
  };

  const fetchCPUstats = async () => {
    const repsonse = await getCPUStats();
    setCPUStats(repsonse);
  };

  const fetchIncommingRequestsData = async () => {
    const response = await getIncommingRequestsData();
    setIncommingReqData(response);
  }
  

  return (
    <div className="grid min-h-screen w-full grid-cols-[240px_1fr]">
      <Aside />
      <div className="flex flex-col">
        <Header/>
        {loading ? (<h1>Loading</h1>) : (<main className="flex-1 space-y-4 p-4 md:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="ml-8 mr-0">
              <Card className="mb-4 mt-0 ">
                <CardHeader className="flex items-center justify-between p-3">
                  <div className="text-sm font-medium text-muted-foreground">
                    Pods
                  </div>
                  {/* <UsersIcon className="h-5 w-5 text-muted-foreground" /> */}
                  <img className="h-10" src="/pod.png"/>
                </CardHeader>
                <CardContent className="flex items-end justify-between">
                  <div className="text-2xl font-bold">{pods.length}</div>
                  <div className="flex items-center gap-1 text-sm font-medium text-red-500 bg-[#ffe2e2] px-4 py-1 rounded">
                    {/* <TrendingUpIcon className="h-4 w-4" />
                    5.4% */}
                    {/* <div> */}
                      Over Provisioned
                    {/* </div> */}
                  </div>
                </CardContent>
              </Card>
              <Card className="mt-0 mb-0">
                <CardHeader className="flex items-center justify-between p-3">
                  <div className="text-sm font-medium text-muted-foreground">
                    Avg Response Time
                  </div>
                  {/* <PackageIcon className="h-5 w-5 text-muted-foreground" /> */}
                  <img className="h-10" src="/response.png"/>
                </CardHeader>
                <CardContent className="flex items-end justify-between">
                  <div className="text-2xl font-bold">
                    {avgResponseTime?.toFixed(2)}
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium text-green-500">
                    {/* <TrendingUpIcon className="h-4 w-4" />
                    2.2% */}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="ml-0 mr-8 ">
              <Card className="mb-4 mt-0">
                <CardHeader className="flex items-center justify-between p-3">
                  <div className="text-sm font-medium text-muted-foreground">
                    Total Requests
                  </div>
                  <img className="h-10" src="/request.png"/>
                </CardHeader>
                <CardContent className="flex items-end justify-between">
                  <div className="text-2xl font-bold">{totalRequests}</div>
                  <div className="flex items-center gap-1 text-sm font-medium text-red-500">
                    {/* <TrendingDownIcon className="h-4 w-4" />
                    1.2% */}
                  </div>
                </CardContent>
              </Card>
              <Card className="mt-0">
                <CardHeader className="flex items-center justify-between p-3">
                  <div className="text-sm font-medium text-muted-foreground">
                    Desired Replicas
                  </div>
                  {/* <DollarSignIcon className="h-5 w-5 text-muted-foreground" /> */}
                  <img className="h-10" src="/hpa.png"/>
                </CardHeader>
                <CardContent className="flex items-end justify-between">
                  <div className="text-2xl font-bold">
                    {Math.ceil(desiredReplicas)}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-thin text-muted-foreground font-medium italic">
                    <span>Powered by</span><span className="font-medium">AI</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader className="flex flex-row p-3 pb-5">
              {/* <img className="h-10" src="/node.png"/> */}
                <CardTitle className="p-2 pb-0">Node</CardTitle>
              </CardHeader>
              <div clasName="m-2">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="text-sm font-medium text-muted-foreground">
                          Namespace
                        </div>
                      </TableCell>
                      <TableCell>
                        <h1>{nodes?.metric?.namespace}</h1>
                      </TableCell>
                    </TableRow>
                    <TableRow clasName="m-2">
                      <TableCell>
                        <div className="text-sm font-medium text-muted-foreground">
                          Instance
                        </div>
                      </TableCell>
                      <TableCell>
                        <h1>{nodes?.metric?.instance}</h1>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="text-sm font-medium text-muted-foreground">
                          OS Image
                        </div>
                      </TableCell>
                      <TableCell>
                        <h1>
                          {nodes?.metric?.id} ({nodes?.metric?.pretty_name})
                        </h1>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="text-sm font-medium text-muted-foreground">
                          OS Like
                        </div>
                      </TableCell>
                      <TableCell>
                        <h1>{nodes?.metric?.id_like}</h1>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="text-sm font-medium text-muted-foreground">
                          Internal DNS Name
                        </div>
                      </TableCell>
                      <TableCell>
                        <h1>{nodes?.metric?.node}</h1>
                      </TableCell>
                    </TableRow>
                    {/* <TableRow>
                      <TableCell>
                        <div className="text-sm font-medium text-muted-foreground">
                          Count
                        </div>
                      </TableCell>
                      <TableCell>
                        <h1>{nodes?.value[1]}</h1>
                      </TableCell>
                    </TableRow> */}
                  </TableBody>
                </Table>
              </div>
            </Card>
            <Card>
              <CardHeader className="p-3 pb-5">
                <CardTitle className="p-2 pb-0">Summary</CardTitle>
              </CardHeader>
              <div clasName="m-2">
                <Table>
                  <TableBody>
                    <TableRow clasName="m-2">
                      <TableCell>
                        <div className="text-sm font-medium text-muted-foreground">
                          Deployments
                        </div>
                      </TableCell>
                      <TableCell>
                        <h1>{deployment.length}</h1>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="text-sm font-medium text-muted-foreground">
                          Services
                        </div>
                      </TableCell>
                      <TableCell>
                        <h1>{services.length}</h1>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="text-sm font-medium text-muted-foreground">
                          Replica Sets
                        </div>
                      </TableCell>
                      <TableCell>
                        <h1>{replicaSets.length}</h1>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="text-sm font-medium text-muted-foreground">
                          PVs
                        </div>
                      </TableCell>
                      <TableCell>
                        <h1>{pv.length}</h1>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="text-sm font-medium text-muted-foreground">
                          PVCs
                        </div>
                      </TableCell>
                      <TableCell>
                        <h1>{pvc.length}</h1>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="text-sm font-medium text-muted-foreground">
                          HPAs
                        </div>
                      </TableCell>
                      <TableCell>
                        <h1>{hpa.length}</h1>
                      </TableCell>
                    </TableRow>
                    {/* <TableCell>
                            <div dateTime="2023-06-25">deployment.metric.namespace</div>
                          </TableCell>
                          <TableCell>
                            <div dateTime="2023-06-25">deployment.metric.node</div>
                          </TableCell>
                          <TableCell>$99.00</TableCell> */}
                  </TableBody>
                </Table>
              </div>
              {/* <CardFooter className="text-sm text-muted-foreground">Showing the last 3 orders</CardFooter> */}
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row justify-between p-4">
                <CardTitle className="p-2 pb-0">CPU</CardTitle>
                <CardTitle className="p-2 pt-0">
                  <span className="text-sm font-medium text-muted-foreground">
                    Cores :
                  </span>{" "}
                  {cpuStats?.value[1]}
                </CardTitle>
              </CardHeader>
              <div clasName="m-2">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="text-sm font-medium text-muted-foreground">
                          Node Group
                        </div>
                      </TableCell>
                      <TableCell>
                        <h1>
                          {cpuStats?.metric?.alpha_eksctl_io_nodegroup_name}
                        </h1>
                      </TableCell>
                    </TableRow>
                    <TableRow clasName="m-2">
                      <TableCell>
                        <div className="text-sm font-medium text-muted-foreground">
                          Architecture
                        </div>
                      </TableCell>
                      <TableCell>
                        <h1>{cpuStats?.metric?.beta_kubernetes_io_arch}</h1>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="text-sm font-medium text-muted-foreground">
                          Instance type
                        </div>
                      </TableCell>
                      <TableCell>
                        <h1>
                          {cpuStats?.metric?.node_kubernetes_io_instance_type}
                        </h1>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="text-sm font-medium text-muted-foreground">
                          OS
                        </div>
                      </TableCell>
                      <TableCell>
                        <h1>{cpuStats?.metric?.kubernetes_io_os}</h1>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="text-sm font-medium text-muted-foreground">
                          Internal DNS Name
                        </div>
                      </TableCell>
                      <TableCell>
                        <h1>{cpuStats?.metric?.instance}</h1>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="text-sm font-medium text-muted-foreground">
                          Machine ID
                        </div>
                      </TableCell>
                      <TableCell>
                        <h1>{cpuStats?.metric?.machine_id}</h1>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="text-sm font-medium text-muted-foreground">
                          Region
                        </div>
                      </TableCell>
                      <TableCell>
                        <h1>
                          {cpuStats?.metric?.topology_kubernetes_io_region}
                        </h1>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="text-sm font-medium text-muted-foreground">
                          Zone
                        </div>
                      </TableCell>
                      <TableCell>
                        <h1>{cpuStats?.metric?.topology_kubernetes_io_zone}</h1>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="text-sm font-medium text-muted-foreground">
                          Lifecycle
                        </div>
                      </TableCell>
                      <TableCell>
                        <h1>{cpuStats?.metric?.node_lifecycle}</h1>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Card>
            {/* <Card>
              <CardHeader>
                <CardTitle className="p-2 pb-0">Request/Min</CardTitle>
                <CardDescription className="p-2 pt-0 pb-0">
                  A summary of your sales performance over time.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LinechartChart />
              </CardContent>
            </Card> */}
            <Graph data={incommingReqData}/>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 border bg-card">
            <div class="flex items-center justify-center">
              <div class="text-card-foreground shadow-sm w-1/2 m-2">
                <Card>
                  <CardHeader className="flex items-center justify-between p-3">
                    <div className="text-sm font-medium text-muted-foreground">
                      Total Requests
                    </div>
                    {/* <ShoppingCartIcon className="h-5 w-5 text-muted-foreground" /> */}
                    <img className="h-10" src="/request.png"/>
                  </CardHeader>
                  <CardContent className="flex items-end justify-between">
                    <div className="text-2xl font-bold">{totalRequests}</div>
                    <div className="flex items-center gap-1 text-sm font-medium text-red-500">
                      <TrendingDownIcon className="h-4 w-4" />
                      1.2%
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div>
              {Object.keys(valuesByInstance).map((key, i) => (
                <>
                  <div class="rounded-lg border bg-card text-card-foreground shadow-sm m-3">
                    <div className="flex flex-row justify-evenly">
                      <CardContent className="pt-2 pb-2">
                        Pod {i + 1}
                      </CardContent>
                      <CardContent className="pt-2 pb-2">
                        IP Address : {key}
                      </CardContent>
                      <CardContent className="pt-2 pb-2">
                        Incomming traffic : {valuesByInstance[key]}
                      </CardContent>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
          
        </main>)}
      </div>
    </div>
  );
}

function BellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function DollarSignIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function LinechartChart(props) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <LineChart
          accessibilityLayer
          data={
            typeof window !== "undefined"
              ? [...JSON.parse(localStorage.getItem("Req/min"))]
              : [{ month: 2, desktop: 0 }]
          }
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="desktop"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}



function Package2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function PackageIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function PiechartcustomChart(props) {
  return (
    <div {...props}>
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
        }}
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={[
              { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
              { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
              {
                browser: "firefox",
                visitors: 187,
                fill: "var(--color-firefox)",
              },
              { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
              { browser: "other", visitors: 90, fill: "var(--color-other)" },
            ]}
            dataKey="visitors"
            nameKey="browser"
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function TrendingDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
      <polyline points="16 17 22 17 22 11" />
    </svg>
  );
}

function TrendingUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
