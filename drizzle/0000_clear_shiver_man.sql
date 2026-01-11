CREATE TYPE "public"."task_status" AS ENUM('NOT_STARTED', 'IN_PROGRESS', 'COMPLETE', 'BLOCKED');--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"color" varchar(32),
	"icon" varchar(64),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"parent_id" uuid,
	"order" integer NOT NULL,
	"level" integer NOT NULL,
	"name" text NOT NULL,
	"assignee" text,
	"status" "task_status" DEFAULT 'NOT_STARTED' NOT NULL,
	"due" timestamp,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
