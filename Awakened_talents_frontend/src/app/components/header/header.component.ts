import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/services/authenticationService';
import { userData } from 'src/app/userData';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
	providers: [AuthenticationService]
})
export class HeaderComponent {

	constructor(private router: Router, private auth: AuthenticationService, private cookies: CookieService) {	}

	Hidden_query = true;
	LoginType = "Вход";
	LoginTypeRoute = "login";
	ngDoCheck(): void {
		if(this.router.url.includes("/catalog"))
		{ this.Hidden_query = false; }
		else
		{ this.Hidden_query = true; }

		if (this.auth.IsAuth())
		{
			this.LoginType = "Профиль";
			this.LoginTypeRoute = "page"
		}
		// if (this.auth.isAuth()) 
		// { 
		// 	this.LoginType = "Профиль"; 
		// 	this.LoginTypeRoute = "profile/asd"
		// 	if(userData.user.Id == 0) {
		// 		this.auth.UpdateUserData();
		// 	}
		// 	console.log("authtoken: " + this.cookies.get("authtoken"))
		// } 
		else 
		{ 
			this.LoginType = "Вход"; 
			this.LoginTypeRoute = "login"
		}
	}
}
