import { TeacherProfile } from "./TeacherProfile";
import { User } from "./User";

export class Subject { 
    Id: number;
    Name: string;
    RouterName: string;
    Description: string;
    TeachersCount: number;
    Type: string;
    PicName: string;
    TeacherProfiles: TeacherProfile[];
    User: User;
    constructor() {
        this.Name = "";
        this.RouterName = "";
        this.Description = "";
        this.TeachersCount = 0;
        this.Id = 0;
        this.Type = "";
        this.PicName = "";
        this.TeacherProfiles = [];
        this.User = null!;;
    }
}

