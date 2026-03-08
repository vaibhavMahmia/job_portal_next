import { db } from "@/config/db";
import { desc, eq } from "drizzle-orm";
import {
  applicants,
  users,
  resumes,
  jobApplications,
  jobs,
  employers,
} from "@/drizzle/schema";

export const getApplicantProfileData = async (userId: number) => {
  const [combinedData] = await db
    .select({
      user: users,
      applicant: applicants,
      resume: resumes,
    })
    .from(users)
    .leftJoin(applicants, eq(users.id, applicants.id))
    .leftJoin(resumes, eq(applicants.id, resumes.applicantId))
    .where(eq(users.id, userId))
    .limit(1); // Object Based Projection

  // If no user is found, combinedData will be undefined
  if (!combinedData || !combinedData.user) return null;

  const { user, applicant, resume } = combinedData;

  return {
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber ?? "",
    avatarUrl: user.avatarUrl ?? "",
    location: applicant?.location ?? "",
    dateOfBirth: applicant?.dateOfBirth
      ? new Date(applicant.dateOfBirth).toISOString().split("T")[0]
      : "",
    nationality: applicant?.nationality ?? "",
    gender: applicant?.gender ?? undefined,
    maritalStatus: applicant?.maritalStatus ?? undefined,
    education: applicant?.education ?? undefined,
    experience: applicant?.experience ?? "",
    websiteUrl: applicant?.websiteUrl ?? "",
    biography: applicant?.biography ?? "",
    resumeUrl: resume?.fileUrl ?? "",
    resumeName: resume?.fileName ?? "",
    resumeSize: resume?.fileSize ?? undefined,
  };
}

export type ApplicantProfileType = NonNullable<
  Awaited<ReturnType<typeof getApplicantProfileData>>
>;

export const getAppliedJobsForApplicant = async (userId: number) => {
  const applications = await db
    .select({
      // We group the data by table to make it easy to read in the UI
      application: jobApplications,
      job: jobs,
      employer: employers,
    })
    .from(jobApplications)
    // Join the jobs table where the application's jobId matches the job's id
    .innerJoin(jobs, eq(jobApplications.jobId, jobs.id))
    // Join the employers table where the job's employerId matches the employer's id
    .leftJoin(employers, eq(jobs.employerId, employers.id))
    // Filter by the logged-in applicant
    .where(eq(jobApplications.applicantId, userId))
    // Sort by most recently applied
    .orderBy(desc(jobApplications.appliedAt));

  return applications;
}