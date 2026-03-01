import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
interface ValidateSchemas {
    body?: z.ZodType;
    query?: z.ZodType;
    params?: z.ZodType;
}
export declare const validate: (schemas: ValidateSchemas | z.ZodType) => (req: Request, _res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=validate.d.ts.map