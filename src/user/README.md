# User Module

Este módulo gerencia usuários com autenticação JWT.

## Endpoints

### POST /users
Cria um novo usuário.

**Body:**
```json
{
  "name": "Nome do Usuário",
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

### PUT /users
Atualiza o usuário autenticado (requer token JWT).

**Headers:**
```
Authorization: Bearer <seu_token_jwt>
```

**Body:**
```json
{
  "name": "Novo Nome",
  "email": "novo@exemplo.com",
  "phone": "11999999999"
}
```

## Autenticação

Para usar endpoints protegidos:

1. Faça login para obter um token JWT
2. Inclua o token no header: `Authorization: Bearer <token>`
3. O `UserGuard` automaticamente extrai o ID do usuário do token
4. Use o decorator `@UserId()` para obter o ID no controller

## Estrutura

- `UserGuard`: Guard que valida JWT e extrai dados do usuário
- `@UserId()`: Decorator para extrair o ID do usuário do request
- `UserService`: Lógica de negócio para usuários
- `UserRepository`: Acesso ao banco de dados 