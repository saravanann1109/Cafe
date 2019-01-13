import { Role } from "./role";

export class User {
    _id:string;
    Id: string;
    Name: string;
    EmployeeId: string;
    IsActive: boolean;
    Department: string;
    EmailId: string;
    UserName: string;
    Password:string;
    CreatedBy:string;
    CreatedDate:string;
    ModifiedBy:string;
    ModifiedDate:string;
    Role : Role;
    ForcePasswordReset : boolean;
    constructor() {
    }
}