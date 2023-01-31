import { TeacherProfile } from "./TeacherProfile";

export class User {
    Id: string;
    Login: string;
    Password: string;
    Email: string;
    TeacherProfile: TeacherProfile;
    IsEmailConfirmed: boolean;
    FullName: string;
    Reputation: number;
    RegistrationDate: Date;
    
    constructor(login: string="") {
        this.Id = "";
        this.Login = login;
        this.Email = "";
        this.Password = "";
        this.TeacherProfile = null!;
        this.IsEmailConfirmed = false;
        this.FullName = ""
        this.Reputation = 0;
        this.RegistrationDate = null!;
    }
}
