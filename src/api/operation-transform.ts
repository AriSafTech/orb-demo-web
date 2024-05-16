import { toCamelCase } from "@/lib/utils";

export const prefix = (operationId: string) => toCamelCase(operationId);
