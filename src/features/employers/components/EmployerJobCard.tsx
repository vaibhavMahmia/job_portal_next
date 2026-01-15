import React from "react";
import { JobCardProps } from "../jobs/types/job.types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const EmployerJobCard: React.FC<JobCardProps> = ({ job, onDelete, onEdit }) => <Card className="hover:shadow-md transition cursor-pointer">
    <CardContent className="space-y-3 p-4">
        <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg">{job.title}</h3>

            <div className="flex gap-2">
                <Button size='icon' variant='ghost' onClick={() => onEdit?.(job.id)}>
                    <Pencil className="w-4 h-4" />
                </Button>
                {/*  Delete with confirmation*/}
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button size='icon' variant='ghost' className="text-destructive hover:text-destructive hover:bg-destructive/10">
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannoyt be undone. This will permantly delete the job listing for{" "}
                                <span className="font-semibold text-foreground">
                                    "{job.title}"
                                </span>
                                .
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive font-white hover:bg-destructive/90" onClick={() => onDelete?.(job.id)}>
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>

        <div className="flex flex-wrap gap-2 text-sm">
            <Badge variant='secondary' className="bg-teal-600 text-white dark:bg-teal-700 font-bold">{job.jobType}</Badge>
            <Badge variant='secondary' className="bg-yellow-600 text-white dark:bg-yellow-700 font-bold">{job.workType}</Badge>
            <Badge variant='secondary' className="bg-red-600 text-white dark:bg-red-700 font-bold">{job.jobLevel}</Badge>
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