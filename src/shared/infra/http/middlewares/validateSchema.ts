import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

interface IValidateSchema {
  body?: AnyZodObject;
  params?: AnyZodObject;
}

export function validateSchema(params: IValidateSchema) {
  return (request: Request, response: Response, next: NextFunction) => {
    if (params?.params) {
      const result = params.params.safeParse(request.params);

      if (!result.success) {
        const errors = result.error.format()._errors;

        return response.status(400).json({ status: 400, error: errors });
      }
    }

    if (params.body) {
      const result = params.body.safeParse(request.body);

      if (!result.success) {
        const errors = result.error.format()._errors;

        return response.status(400).json({ status: 400, error: errors });
      }
    }

    return next();
  };
}
