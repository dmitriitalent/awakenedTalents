import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherProfile } from 'src/app/models/TeacherProfile';
import * as $ from "jquery";
import { AuthenticationService } from 'src/app/services/authenticationService';
import { userData } from 'src/app/userData';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
  providers: [AuthenticationService]
})
export class TeachersComponent implements OnInit {

	selected_subject: string;
	constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, public auth: AuthenticationService) 
	{
		this.selected_subject = this.activatedRoute.snapshot.params["RouterName"];
	}

	teachers: any;
  	ngOnInit(): void {
		$.get(environment.server_url+"/Teacher/GetTeachers?SubjectRouteName="+this.selected_subject).done(resp => {
			this.teachers = JSON.parse(resp);
		})
  	}
	menuClasses = "openMenuBtn";
	menuContent = "Стать учителем";
	menuIsOpen = false;
	hasCloseCommand = false;
	openMenu()
	{
		if(this.hasCloseCommand)
		{
			this.hasCloseCommand = false;
		}
		else
		{
			this.menuIsOpen = true;
			this.menuClasses = "menu overflowHidden"
			this.menuContent = ""
			setTimeout(() => {
				if(this.menuClasses != "openMenuBtn"){
					this.menuClasses = "menu"
				}
			}, 1000);
		}
	}
	closeMenu($event: any) {
		this.hasCloseCommand = true;
		this.menuContent = "Стать учителем"; 
		this.menuIsOpen = false;
		this.menuClasses = "openMenuBtn"
	}
	
}
