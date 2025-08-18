import { NotFoundException } from "@nestjs/common";

export class ArgumentNullExpection {
    static throwIfNull(value: any, message: string) {
        if (!value) {
            throw new NotFoundException(message);
        }
    }
}