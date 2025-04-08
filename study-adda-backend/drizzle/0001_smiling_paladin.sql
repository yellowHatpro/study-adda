CREATE TYPE "public"."room_role" AS ENUM('guru', 'student');--> statement-breakpoint
ALTER TABLE "users_to_rooms" ADD COLUMN "room_role" "room_role";