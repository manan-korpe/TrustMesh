import { Department } from "./department"

export enum UserRole {
  Admin = "Admin",
  Manager = "Manager",
  Auditor = "Auditor",
  User = "User",
}

export interface User{
  did:string | null,
  id:string,
  name:string,
  email:string
  dept:Department | null,
  role:UserRole,
  status:string,
  wallet:string | null,
  active:boolean
};