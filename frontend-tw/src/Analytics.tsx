import Header from "./sections/Header";
import { ChevronLeft, CircleCheckBig, Clock, Gauge, RotateCcw } from "lucide-react";
import { Button } from "./components/ui/button";
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from "./components/ui/toggle-group";
import { ChartContainer, ChartTooltip, type ChartConfig } from "./components/ui/chart";
import { AreaChart, CartesianGrid, XAxis, Area, YAxis} from "recharts";
import { Link } from "react-router";

function StatCard(props: {count: string, name: string, icon: React.ReactNode}) {
    return (
        <div
            className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l hover:bg-gray-100 data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
        >
            <span className="text-xs text-muted-foreground flex items-center gap-2">
                {props.icon}
                {props.name}
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
                {props.count}
            </span>
        </div>
    )
}

// TODO: fix type
const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-md border bg-white p-3 shadow-sm">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-sm text-gray-600">Rate: {data.rate}%</p>
          <p className="text-sm text-gray-600">
            Completed: {data.completed} / {data.total}
          </p>
        </div>
      );
    }
  
    return null;
  };

export default function Analytics() {
    const completionRateData = [
        { week: 'Week 1', completed: 85, total: 100, rate: 85 },
        { week: 'Week 2', completed: 92, total: 105, rate: 87.6 },
        { week: 'Week 3', completed: 88, total: 95, rate: 92.6 },
        { week: 'Week 4', completed: 96, total: 110, rate: 87.3 },
    ];
    
    return (<>
        <Header />

        <section className="w-full flex justify-center overflow-hidden">
            <div className="sm:w-[40vw] w-screen min-h-screen h-full pb-26 shadow-lg">
                <div className="flex justify-between items-center m-2 md:m-4 mt-5">
                    <div className="flex items-center gap-5">
                        <Link to={'/app'}>
                            <Button variant='ghost'>
                                {/* NOTE: size is not supported for icons inside <Button> */}
                                <ChevronLeft style={{ scale: 2 }} />
                            </Button>
                        </Link>
                        <p className='text-2xl md:text-3xl'>Analytics</p>
                    </div>
                    <ToggleGroup type='single' variant='outline' className="mr-2 md:mr-4">
                        <ToggleGroupItem value='1d'>1D</ToggleGroupItem>
                        <ToggleGroupItem value='1w'>1W</ToggleGroupItem>
                        <ToggleGroupItem value='2w'>2W</ToggleGroupItem>
                        <ToggleGroupItem value='1m'>1M</ToggleGroupItem>
                        <ToggleGroupItem value='6m'>6M</ToggleGroupItem>
                    </ToggleGroup>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 border-y-1 mt-4">
                    <StatCard count="92%" name="Compl. Rate" icon={<CircleCheckBig size={16} />} />
                    <StatCard count="4h" name="Avg. Time" icon={<Clock size={16} />} />
                    <StatCard count="19" name="Velocity" icon={<Gauge size={16} />} />
                    <StatCard count="5" name="Re-opened" icon={<RotateCcw size={16} />} />
                </div>

                <ChartContainer config={{} as ChartConfig} className="h-80 w-full my-8">
                    <AreaChart
                        accessibilityLayer
                        data={completionRateData}
                        margin={{
                            left: 12,
                            right: 36,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis
                            dataKey="week"
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        />
                        <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                        <ChartTooltip
                            cursor={false}
                            content={<CustomTooltip />}
                        />
                        <Area
                            dataKey="rate"
                            type="monotone"
                            fill="#2563eb"
                            fillOpacity={0.4}
                            stroke="#2563eb"
                        />
                    </AreaChart>
                </ChartContainer>

            </div>
        </section>
    </>);
}