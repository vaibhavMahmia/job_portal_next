ALTER TABLE `applicants` MODIFY COLUMN `date_of_birth` date;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('admin','applicant','employer') NOT NULL DEFAULT 'applicant';--> statement-breakpoint
ALTER TABLE `users` ADD `avatar_url` text;--> statement-breakpoint
ALTER TABLE `employers` DROP COLUMN `avatar_url`;