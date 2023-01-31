import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TeacherProfile } from 'src/app/models/TeacherProfile';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authenticationService';
import { userData } from 'src/app/userData';
import { environment } from 'src/environments/environment';
import * as $ from "jquery";
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],
	providers: [AuthenticationService]
})
export class ProfileComponent {
	constructor(private cookies: CookieService, private router: Router, private auth: AuthenticationService, private http: HttpClient) { }
	
	userLogin = userData.user.Login;
	env = environment;
	userDataHtml = userData;
	ShowLogout() { this.userLogin = "Выйти" }
	HideLogout() { this.userLogin = userData.user.Login}

	Logout(): void {
		this.auth.Logout();
	}

	fullName: string = userData.user.FullName
	changeFullName() {
		userData.user.FullName = this.fullName
		console.log(userData.user)
	}

	fileAvatar: File = null!;
	updateAvatar($event: any) 
	{
		this.fileAvatar = $event.target.files[0];
		var formats = [".png", "jpeg", ".jpg"] 
		if(!(formats.includes(this.fileAvatar.name.slice(-4))))
		{
			alert("Недопустимое расширение файла. \nДоступны только: \n.png \n.jpeg \n.jpg")
			this.fileAvatar = null!;
		}
		if(this.fileAvatar != null)
		{
			const fileData = new FormData();
			fileData.append("file", this.fileAvatar, this.fileAvatar.name);
			this.http.post(environment.server_url + "/User/UpdateAvatar?UserId="+userData.user.Id, fileData ).subscribe(response=>{})
		} 
	}

	maxSymbolsCounterDescription:number = 300;
	symbolsCounterDescription: number = userData.user.TeacherProfile.Description.length;
	description = userData.user.TeacherProfile.Description;
	changeDescription() {
		this.symbolsCounterDescription = this.description.length
		userData.user.TeacherProfile.Description = this.description
	}

	updateUser() {
		$.post(environment.server_url + "/User/UpdateUser", userData.user).done(response => {
			console.log(response);
		})
	}

}
