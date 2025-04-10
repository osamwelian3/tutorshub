'use client'

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import data from "./data.json"
import { CheckCircle2Icon, LoaderIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "sonner";
import { StudentProgressChart } from "@/components/student-progress-interactive-area-chart";
import { useAppSelector } from "@/app/store/store";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const user = useAppSelector(state => state.user.user)

  if (!user) {
    return <Skeleton />
  }
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <CourseCards />
          {/* <SectionCards /> */}
          <div className="px-4 lg:px-6">
            <StudentProgressChart />
          </div>
          <DataTable data={[
            {
              id: 1,
              name: "Biology 101",
              class: "Sciences",
              status: "In Progress",
              score: 22.5,
              grade: "Pass",
              tutor: "John Doe",
              user: user
            },
            {
              id: 1,
              name: "Python Programming",
              class: "ICT 423",
              status: "In Progress",
              score: 75.5,
              grade: "Credit",
              tutor: "John Keaner",
              user
            },
            {
              id: 1,
              name: "Instrumentals",
              class: "Music",
              status: "Done",
              score: 96.5,
              grade: "Distinction",
              tutor: "Calvin Stewart",
              user
            },
          ]} />
        </div>
      </div>
    </div>
  )
}

const CourseCards = () => {

  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      {
        [1,2,3,4,5].map(() => (
          <Card className="@container/card py-3 cursor-pointer" onClick={() => toast("Cooming Soon")}>
            <CardHeader className="relative h-20" style={{ backgroundColor: 'blue' }}>

            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium text-[25px] text-black">
                Biology 101 <br />
                BIO 101
              </div>
              <div className="text-muted-foreground flex gap-2 justify-between">
                <Badge
                  variant="outline"
                  className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3"
                >
                  {"Done" === "Done" ? (
                    <CheckCircle2Icon className="text-green-500 dark:text-green-400" />
                  ) : (
                    <LoaderIcon />
                  )}
                  {"Done"}
                </Badge>
              </div>
            </CardFooter>
          </Card>
          
        ))
      }
      <Card className="@container/card py-3 cursor-pointer" onClick={() => toast("Cooming Soon")}>
        <CardHeader className="relative h-20" style={{ backgroundColor: 'indigo' }}>

        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-[25px] text-black">
            Python Programming <br />
            ICT 423
          </div>
          <div className="text-muted-foreground flex gap-2 justify-between">
            <Badge
              variant="outline"
              className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3"
            >
              {"Done" !== "Done" ? (
                <CheckCircle2Icon className="text-green-500 dark:text-green-400" />
              ) : (
                <LoaderIcon />
              )}
              {"Progress"}
            </Badge>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
