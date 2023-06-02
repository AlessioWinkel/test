import { User } from "@prisma/client";

export interface LecturerInput {
    userId: number;
    expertise: string;
}