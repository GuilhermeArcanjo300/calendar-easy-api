import { ProfileRole } from "@prisma/client";

export class UserEntity {
    id: string;
    name: string;
    email: string;
    phone?: string;
    profile: ProfileRole;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}