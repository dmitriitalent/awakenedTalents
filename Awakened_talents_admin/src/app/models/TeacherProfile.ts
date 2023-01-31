import { Subject } from "../models/Subjects";
import { User } from "./User";

export class TeacherProfile {
    Id: string;
	Description: string;
    User: User;
    Subjects: Subject[];
    constructor() {
        this.Id = ""
        this.Description = ""
        this.User = null!;
        this.Subjects = [];
    }
}