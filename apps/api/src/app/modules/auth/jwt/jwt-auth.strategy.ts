import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from '@chat-app/api/shared';
import { API_ENVS } from '@chat-app/api/env';

const { JWT_SECRET } = API_ENVS;
@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // available options: https://github.com/mikenicholson/passport-jwt#configure-strategy
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Users can send us the JWT token either by a bearer token in an authorization header...
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        // ... or in a cookie named "jwt"
        (request: Request) => request?.cookies?.jwt,
      ]),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    // For the jwt-strategy, Passport first verifies the JWT's signature and decodes the JSON.
    // It then invokes our validate() method passing the decoded JSON as its single parameter.
    // Based on the way JWT signing works, we're guaranteed that we're receiving a valid token
    // that we have previously signed and issued to a valid user.
    // `payload` is that what JwtAuthService#login() has created and what thereafter
    // GithubOauthController#githubAuthCallback() has saved as cookie named "jwt".

    // TODO delete
    console.log(
      `${JwtAuthStrategy.name}#${
        this.validate.name
      }(): payload = ${JSON.stringify(payload, null, 4)}`
    );

    // Passport assigns the value we return from this method to the Request object as `req.user`.
    // AppController#getProfile() uses this as an example.
    const { displayName, photo } = payload;
    return { displayName, photo };
  }
}
