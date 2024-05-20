import { RegistrationRequestAttributeRoleNameEnum } from "./generated";
import type { Components } from "./generated-api-types";
import AdminLayout from "../app/admin/(closed)/layout";

// export type AppRole = RegistrationRequestAttributeRoleNameEnum;
export type AppRole = "consumer" | "merchant" | "admin";

export type RegistrationRoles =
  Components.Schemas.RegistrationRequestAttribute["role_name"];
