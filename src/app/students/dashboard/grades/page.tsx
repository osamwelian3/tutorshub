'use client'

import { useAppSelector } from '@/app/store/store'
import { DataTable } from '@/components/data-table'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function Page() {
    const user = useAppSelector(state => state.user.user)

    if (!user) {
        return <Skeleton />
    }

    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
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
                            id: 2,
                            name: "Python Programming",
                            class: "ICT 423",
                            status: "In Progress",
                            score: 75.5,
                            grade: "Credit",
                            tutor: "John Keaner",
                            user
                        },
                        {
                            id: 3,
                            name: "Instrumentals",
                            class: "Music",
                            status: "Done",
                            score: 96.5,
                            grade: "Distinction",
                            tutor: "Calvin Stewart",
                            user
                        },
                    ]} />
                    {/* <div className="px-4 lg:px-6">
                        <div className='flex justify-end'>
                            <p>Total score: </p>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Page