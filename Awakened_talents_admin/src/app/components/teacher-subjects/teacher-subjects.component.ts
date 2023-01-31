import { Component, Input } from '@angular/core';
import { Subject } from '../../models/Subjects';
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-teacher-subjects',
	templateUrl: './teacher-subjects.component.html',
	styleUrls: ['./teacher-subjects.component.css']
})
export class TeacherSubjectsComponent {
	@Input() user: User = new User();
	savedSubjectName: string = ""
	hover(subject: Subject)
	{
		this.savedSubjectName = subject.Name
		subject.Name = "Удалить " + this.savedSubjectName + "?";
	}
	unhover(subject: Subject)
	{
		subject.Name = this.savedSubjectName;
	}

	Delete(profileId: string, subjectRouterName: string)
	{
		if(confirm("Вы действительно хотите удалить преподаваемый предмет из списка преподаваемых предметов?"))		{
			$.post(environment.server_url + "/Teacher/DeleteSubject?profileId="+profileId+"&subjectRouterName="+subjectRouterName)
				.done(response=>{
					var subject: Subject = this.user.TeacherProfile.Subjects.filter(subject=>{subject.RouterName == subjectRouterName})[0]
					this.user.TeacherProfile.Subjects.splice(this.user.TeacherProfile.Subjects.indexOf(subject),1);
					console.log(this.user);
				}
			)
		}
	}
}
