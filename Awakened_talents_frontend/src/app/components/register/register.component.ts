import { Component } from '@angular/core';
import { RegisterForm } from 'src/app/models/RegisterForm';
import * as env from "../../../environments/environment";
import * as $ from "jquery";
import { Router } from "@angular/router";
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { AuthenticationService } from 'src/app/services/authenticationService';
import { CookieService } from 'ngx-cookie-service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
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

export class RegisterComponent {
	constructor(private router: Router, private auth: AuthenticationService, private cookies: CookieService) {}
	sleep(millis: number) {
		var t = (new Date()).getTime();
		var i = 0;
		while (((new Date()).getTime() - t) < millis) {
			i++;
		}
	}
	error = ""
	errorWindow = false;
	registerForm: RegisterForm = new RegisterForm("", "", "")
	passwordConfirm = "";
	tet = false;
	register() {
		var data = {
			login: this.registerForm.login,
			email: this.registerForm.email,
			password: this.registerForm.password,
		}

		if (this.registerForm.password.length < 5)
		{
			this.errorWindow = !this.errorWindow;
			this.error = "Пароль меньше 5 символов.";
			return;
		}
		if (this.registerForm.email.includes("@")==false || this.registerForm.email[this.registerForm.email.length-1]=="@")
		{
			this.errorWindow = !this.errorWindow;
			this.error = "Email введен некорректно.";
			return;
		}
		if(this.passwordConfirm != this.registerForm.password)
		{
			this.errorWindow = !this.errorWindow;
			this.error = "Пароли не совпадают.";
			return;
		}
		$.post(env.environment.server_url+"/login/registration", data).done(response => {
			if(response == "Login taken")
			{
				this.errorWindow = !this.errorWindow; 
				this.error = "Этот login уже используется.";
				return;
			}
			this.cookies.set("authtoken", response, undefined, "/");
			this.auth.UpdateUserData();
			this.router.navigate(["/catalog/subjects"]);
		});
	}
}
