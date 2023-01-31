import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as $ from "jquery";
import { Subject } from '../../models/Subjects';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/User';
import { userData } from 'src/app/userData';
import { TeachersComponent } from '../teachers/teachers.component';

@Component({
	selector: 'app-become-teacher-menu',
	templateUrl: './become-teacher-menu.component.html',
	styleUrls: ['./become-teacher-menu.component.css']
})
export class BecomeTeacherMenuComponent implements OnInit {

	constructor() { }

	selectedSubject = "";
	selectedSubjectRouterName = "";
	isOpenSelectOptions = false;
	subjects: Subject[] = [];
	postDataContent = "Отправить заявку";
	ngOnInit(): void {
		console.log(userData.user)
		$.get(environment.server_url + "/subject/GetSubjects?subjectType=undefined").done(response =>
		{
			this.subjects = JSON.parse(response);
			this.selectedSubject = this.subjects[0].Name; 
			this.selectedSubjectRouterName = this.subjects[0].RouterName;
		})
	}

	@Output() onClose = new EventEmitter();
	closeMenu(){
		this.onClose.emit()
	}

	openSelectOptions()
	{
		this.isOpenSelectOptions = true;
	}
	closeSelectOptions()
	{
		this.isOpenSelectOptions = false;
	}
	toggleSelectOptions()
	{
		this.isOpenSelectOptions = !this.isOpenSelectOptions;
	}
	selectOption(selectedSubjectRouterName: string)
	{
		for (let index = 0; index < this.subjects.length; index++) {
			if(this.subjects[index].RouterName == selectedSubjectRouterName)
			{
				this.selectedSubject = this.subjects[index].Name;
				this.selectedSubjectRouterName = selectedSubjectRouterName
			}
		}
		this.closeSelectOptions();
	}

	data = {
		FullName: userData.user.FullName,
		Description: userData.user.TeacherProfile.Description,
		Subject: "",
		User: userData.user,
		SubjectType: ""
	}
	postRequest() {
		if(userData.user.TeacherProfile != null)
		{
			userData.user.TeacherProfile.Subjects.forEach(subject => {
				if(subject.RouterName == this.selectedSubjectRouterName)
				{
					this.postDataContent = "Вы уже преподаете этот предмет";
					setTimeout(() => {
						this.postDataContent = "Отправить заявку";
					}, 3000)
				}
			});
		}
		if(this.postDataContent == "Вы уже преподаете этот предмет") {return;}
		this.data.Subject = this.selectedSubjectRouterName;
		this.data.User = userData.user;
		$.post(environment.server_url + "/Teacher/addTeacherRequest", this.data).done(response => {
			if (response == "already teaching"){
				this.postDataContent = "Вы уже преподаете этот предмет";
				setTimeout(() => {
					this.postDataContent = "Отправить заявку";
				}, 3000)
				return;
			}
			this.closeMenu()
		})
	}
}
