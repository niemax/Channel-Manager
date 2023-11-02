CREATE TABLE `hotel_channels` (
	`hotel_id` integer,
	`channel_id` integer,
	`visible` integer DEFAULT 0,
	FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`channel_id`) REFERENCES `channels`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `hotels` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text
);
--> statement-breakpoint
ALTER TABLE `channels` DROP COLUMN `visible`;