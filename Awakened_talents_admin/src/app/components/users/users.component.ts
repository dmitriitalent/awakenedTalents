import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../models/User';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css']
})
export class UsersComponent {
	
	users: User[] = [];
	IsTeacher(user: User)
	{
		if(user.TeacherProfile == null) {
			return false;
		}
		else if(user.TeacherProfile.Subjects == null){
			return false;
		}
		else if (user.TeacherProfile.Subjects.length == 0){
			return false;
		}
		else
		{
			return true;
		}
	}
	

	ngOnInit()
	{
		$.get(environment.server_url + "/User/GetUsers").done(response=>
		{
			this.users = JSON.parse(response);
			console.log(this.users)
		});
	}
}
