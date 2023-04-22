import { API_ENVS } from '@chat-app/api/env';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
export const API_KEY_HEADER = 'api-key';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const key = req.headers[API_KEY_HEADER] ?? req.query.api_key;

    return this.isKeyValid(key);
  }

  isKeyValid(key: string) {
    const { API_KEY_SECRET } = API_ENVS;
    const secret = API_KEY_SECRET;
    return key === secret;
  }
}
