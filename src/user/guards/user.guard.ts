import { Injectable, ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Injectable()
export class UserGuard extends JwtAuthGuard {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Primeiro, verifica se o token JWT é válido
        const canActivate = await super.canActivate(context);
        if (!canActivate) {
            return false;
        }

        // Extrai o request e o usuário autenticado
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        // Adiciona o ID do usuário ao request para uso posterior
        if (user && user.userId) {
            request.userId = user.userId;
            request.userEmail = user.email;
        }

        return true;
    }
} 