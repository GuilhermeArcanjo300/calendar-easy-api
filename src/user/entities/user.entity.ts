import { ProfileRole } from "@prisma/client";
import { EnterpriseEntity } from "src/enterprise/entities/enterprise.entity";

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

    enterprise?: EnterpriseEntity;
}