import { Expose } from 'class-transformer';

export class AccessTokenDto {
    constructor(token: string) {
        this.accessToken = token;
    }

    @Expose({name: 'access_token'})
    accessToken: string;
}