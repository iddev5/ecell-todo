import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartColumnIncreasing, Funnel } from "lucide-react"
import { useAppDispatch } from "@/lib/store"
import { changeSortOrder } from "@/features/todoSlice"

export default function Options() {
    const dispatch = useAppDispatch();
    
    const onSort = (e: string) => {
        dispatch(changeSortOrder(e));
    }

    return (
        <div className="w-full p-4 border-b-1 border-grey-200 flex justify-between items-center">
            <div>
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="done">Done</TabsTrigger>
                    <TabsTrigger value="inprog">In-progress</TabsTrigger>
                </TabsList>
            </div>
            <div className="flex items-center gap-3">
                <Button variant="secondary">
                    <ChartColumnIncreasing />
                </Button>
                <Funnel className="opacity-50" />
                <Select onValueChange={onSort}>
                    <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="new">Newest first</SelectItem>
                        <SelectItem value="old">Oldest first</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
};