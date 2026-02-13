import { User } from "../user.entity";
import { UsersService } from "../users.service";
import { Request, Response, NextFunction } from "express";
import { Injectable, NestMiddleware } from "@nestjs/common";

declare global {
    namespace Express {
        interface Request {
            currentUser?: User | null;
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private userService: UsersService) { }
    async use(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.session || {};

        if (userId) {
            const user = await this.userService.findUserById(userId);
            req.currentUser = user;
        }

        next();
    }
}