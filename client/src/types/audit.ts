import { User } from "./user";

export interface AuditLog{
    id:number,
    time:string,
    actor:User,
    action:string,
    target:string,
    source:string,
    status:string,
    hash:string
}