import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { User } from "../models/User";
import * as env from "../../environments/environment";
import * as $ from "jquery"
import { Router } from "@angular/router";
import { userData } from "../userData";

@Injectable()
export class AuthenticationService {

	constructor(private http: HttpClient, private cookies: CookieService, private router: Router) {}
	
	IsAuth(): boolean {
		if (this.cookies.get("authtoken")!="")
		{ return true; } else { return false; }
	}
	UpdateUserData() {
		if(this.IsAuth()){
			$.get(env.environment.server_url+"/login/getUserData?authtoken=" + this.cookies.get("authtoken")).done(userDataResponse => {
				if( userDataResponse != "Not authenticate"){
					userData.user = JSON.parse(userDataResponse);
					$.get(env.environment.server_url+"/teacher/getTeacherProfile?authtoken=" + this.cookies.get("authtoken")).done(teacherDataResponse => {
						userData.user.TeacherProfile = JSON.parse(teacherDataResponse);
					});
				}
				
			});
		}
		return userData.user;
	}

	Logout() {
		this.cookies.delete("authtoken", "/")
		console.log("Logout authtoken: " + this.cookies.get("authtoken"));
		userData.user = new User();
		this.router.navigate(["/catalog/subjects"]);
		console.log("Logout post authtoken: " + this.cookies.get("authtoken"));
	}
}
