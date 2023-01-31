import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { LoginForm } from "src/app/models/LoginForm";
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { CookieService } from "ngx-cookie-service";

import * as env from "../../../environments/environment";
import * as $ from "jquery";
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authenticationService';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	providers: [AuthenticationService],
	animations: [
		trigger("payAttention", [
			state("true", style({})),
			state("false", style({})),
			transition("false => true", [
				animate("10s", keyframes([
					style({offset: 0.005, transform: "translate(10px, 10px) rotate(10deg)", opacity: 1, visibility: "visible", }),
    				style({offset: 0.01,  transform: "translate(-10px, 7px) rotate(-10deg)" }),
    				style({offset: 0.015, transform: "translate(9px, 7px) rotate(8deg)" }),
    				style({offset: 0.02,  transform: "translate(-8px, 6px) rotate(-8deg)" }),
    				style({offset: 0.025, transform: "translate(-7px, 6px) rotate(6deg)" }),
    				style({offset: 0.03,  transform: "translate(-5px, 5px) rotate(-6deg)" }),
    				style({offset: 0.035, transform: "translate(4px, 6px) rotate(4deg)" }),
    				style({offset: 0.04,  transform: "translate(-5px, 4px) rotate(-4deg)" }),
    				style({offset: 0.045, transform: "translate(-3px, 4px) rotate(2deg)" }),
    				style({offset: 0.05, transform: "translate(-2px, 2px) rotate(-2deg)" }),
    				style({offset: 0.055, transform: "translate(1px, 1px) rotate(0deg)" }),
    				style({offset: 0.06,  transform: "translate(0px, 0px) rotate(0deg)" }),
    				style({offset: 0.8, opacity: 1 }),
    				style({offset: 0.9, opacity: 0.5 }),
    				style({offset: 1,  opacity: 0 })
				]))
			]),
			transition("true => false", [
				animate("10s", keyframes([
					style({offset: 0.005, transform: "translate(10px, 10px) rotate(10deg)", opacity: 1, visibility: "visible", }),
    				style({offset: 0.01, transform: "translate(-10px, 7px) rotate(-10deg)" }),
    				style({offset: 0.015, transform: "translate(9px, 7px) rotate(8deg)" }),
    				style({offset: 0.02, transform: "translate(-8px, 6px) rotate(-8deg)" }),
    				style({offset: 0.025, transform: "translate(-7px, 6px) rotate(6deg)" }),
    				style({offset: 0.03, transform: "translate(-5px, 5px) rotate(-6deg)" }),
    				style({offset: 0.035, transform: "translate(4px, 6px) rotate(4deg)" }),
    				style({offset: 0.04, transform: "translate(-5px, 4px) rotate(-4deg)" }),
    				style({offset: 0.045, transform: "translate(-3px, 4px) rotate(2deg)" }),
    				style({offset: 0.05, transform: "translate(-2px, 2px) rotate(-2deg)" }),
    				style({offset: 0.055, transform: "translate(1px, 1px) rotate(0deg)" }),
    				style({offset: 0.06, transform: "translate(0px, 0px) rotate(0deg)" }),
    				style({offset: 0.8, opacity: 1 }),
    				style({offset: 0.9, opacity: 0.5 }),
    				style({offset: 1,  opacity: 0 })
				]))
			]),
		]),
	],
})
export class LoginComponent {
	constructor(private http:HttpClient, private router: Router, private cookies: CookieService, private auth: AuthenticationService) {}
	LoginForm: LoginForm = new LoginForm("", "");
	error = ""
	errorWindow = false;

	onKeydown(event: KeyboardEvent) {
		if(event.key == "enter") { this.Login(); }
	}
	Login(): void {
		this.cookies.deleteAll();
		if(this.LoginForm.login == "") 
		{
			this.errorWindow = !this.errorWindow;
			this.error = "Вы не заполнили поле логин."; 
			return;
		}
		if(this.LoginForm.password == "") 
		{
			this.errorWindow = !this.errorWindow;
			this.error = "Вы не заполнили поле пароль."; 
			return
		}
		$.post(env.environment.server_url+"/login/login", this.LoginForm).done(response => {
			if(response == "Wrong login or password") {
				this.errorWindow = !this.errorWindow;
				this.error = "Неверный логин или пароль.";
				return;
			}
			this.cookies.set("authtoken", response, undefined, "/");
			this.auth.UpdateUserData();
			this.router.navigate(["/catalog/subjects"]);
		});
	
	}
}
