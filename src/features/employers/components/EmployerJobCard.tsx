import React from "react";
import { JobCardProps } from "../jobs/types/job.types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";


export const EmployerJobCard: React.FC<JobCardProps> = ({ job }) => <Card className="hover:shadow-md transition cursor-pointer">
    <CardContent className="space-y-3 p-4">
        <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg">{job.title}</h3>

            <div className="flex gap-2">
                <Button size='icon' variant='ghost'>
                    <Pencil className="w-4 h-4" />
                </Button>
                <Button size='icon' variant='ghost' className="text-destructive">
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>
        </div>

        <div className="flex flex-wrap gap-2 text-sm">
            <Badge variant='secondary' className="bg-teal-500 text-white dark:bg-teal-600 font-bold">{job.jobType}</Badge>
            <Badge variant='secondary' className="bg-yellow-500 text-white dark:bg-yellow-600 font-bold">{job.workType}</Badge>
            <Badge variant='secondary' className="bg-red-500 text-white dark:bg-red-600 font-bold">{job.jobLevel}</Badge>
        </div>

        {job.location && (
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-4 h4" />
                {job.location}
            </p>
        )}

        {job.minSalary && job.maxSalary && (
            <p className="text-sm font-medium">
                {job.salaryCurrency} {job.minSalary} - {job.maxSalary} /
                {job.salaryPeriod}
            </p>
        )}
    </CardContent>
</Card>;