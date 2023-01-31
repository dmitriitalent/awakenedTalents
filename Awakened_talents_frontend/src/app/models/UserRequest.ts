// namespace AwakenedTalents.Models
// {
//     public class UserRequest
//     {
//         public int Id { get; set; }
//         public User User { get; set; }
//         public string JsonData { get; set; }
//         public string RequestDescription { get; set; }
//     }
// }

import { User } from "./User";

export class UserRequest {
    Id: number;
    User: User;
    JsonData: string;
    RequestDescription: string;
    constructor() {
        this.Id = null!;
        this.User = null!;
        this.JsonData = null!;
        this.RequestDescription = null!;
    }
}
