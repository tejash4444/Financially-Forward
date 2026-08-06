import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { useState } from "react";
import { FileSearch, Loader2, PieChart, Radar, Target} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectValue,
    SelectTrigger,
    SelectItem,
} from "@/components/ui/select";

import { AreaVariant } from "@/components/area-variant";
import { BarVariant } from "@/components/bar-variant";

import { PieVariant } from "@/components/pie-variant";
import { RadarVariant } from "@/components/radar-variant";
import { RadialVariant } from "@/components/radial-variant";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
    data?:{
        name: string;
        value: number;
    }[]; /*this [] creates an array of these above elemnts given */
};

export const SpendingPie = ({data = []}: Props) => {
    const [chartType, setChartType ] = useState("pie");

    const onTypeChange = (type: string) => {
        //todo add paywall
        setChartType(type);
    }

    return(
        <Card className="border-none drop-shadow-sm">
            <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
                <CardTitle className="text-xl line-clamp-1">
                    Categories
                </CardTitle>
                <Select
                    defaultValue={chartType}
                    onValueChange={onTypeChange}
                >
                    <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
                        <SelectValue placeholder="Chart type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pie" >
                            <div className="flex items-center">
                                <PieChart className="size-4 mr-2 shrink-0" />
                                <p className="line-clamp-1">
                                    Pie Chart
                                </p>
                            </div>
                        </SelectItem>
                        <SelectItem value="radar" >
                            <div className="flex items-center">
                                <Radar className="size-4 mr-2 shrink-0" />
                                <p className="line-clamp-1">
                                    Radar Chart
                                </p>
                            </div>
                        </SelectItem>
                        <SelectItem value="radio" >
                            <div className="flex items-center">
                                <Target className="size-4 mr-2 shrink-0" />
                                <p className="line-clamp-1">
                                    Radial Chart
                                </p>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                {data.length === 0 ? (
                    <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
                        <FileSearch className="size-6 text-muted-foreground" />
                        <p className="text-muted-foreground text-sm">
                            No data for this period
                        </p>
                    </div>
                ):(
                    <>
                    {chartType === "pie" && <PieVariant data={data} />}
                    {chartType === "radar" && <RadarVariant data={data} />}
                    {chartType === "radio" && <RadialVariant data={data} />}
                    </>
                )}
            </CardContent>
        </Card>
    )
}

export const SpendingPieLoading = () => {
    return (
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="flex justify-between space-y-2 lg:flex-row lg:items-center lg:space-y-0">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-8 w-full lg:w-[120px]" />
        </CardHeader>
        <CardContent>
          <div className="flex h-[350px] w-full items-center justify-center">
            <Loader2 className="size-6 animate-spin text-slate-300" />
          </div>
        </CardContent>
      </Card>
    );
  };