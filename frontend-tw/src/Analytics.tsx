import Header from "./sections/Header";
import { CircleCheckBig, Clock, Gauge, RotateCcw } from "lucide-react";
import React from 'react';

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

export default function Analytics() {
    return (<>
        <Header />

        <section className="w-full flex justify-center overflow-hidden">
            <div className="sm:w-[40vw] w-screen min-h-screen h-full pb-26 shadow-lg">
                <div className="flex border-y-1 mt-4">
                    <StatCard count="92%" name="Compl. Rate" icon={<CircleCheckBig size={16} />} />
                    <StatCard count="4h" name="Avg. Time" icon={<Clock size={16} />} />
                    <StatCard count="19" name="Velocity" icon={<Gauge size={16} />} />
                    <StatCard count="5" name="Re-opened" icon={<RotateCcw size={16} />} />
                </div>
            </div>
        </section>
    </>);
}