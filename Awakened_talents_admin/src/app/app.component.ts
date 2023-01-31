import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import * as $ from "jquery";

import { Subject } from "../app/models/Subjects"
 

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {



	constructor(private http :HttpClient) { }
	title = 'Awakened_talents_admin';

	subject:Subject = new Subject();
	file: File = null!;
	addSubject() {
		const fileData = new FormData();
		fileData.append("file", this.file, this.file.name);
		if (this.file != null){
			var data = {
				name: this.subject.Name, 
				RouterName: this.subject.RouterName.replace(" ", ""),
				description: this.subject.Description, 
				teachersCount: this.subject.TeachersCount,
				type: this.subject.Type,
			}
			$.post("https://localhost:7289/Subject/addsubject", data).done(response=>{
				this.http.post("https://localhost:7289/Files/addImage?ImageId="+response, fileData).subscribe(res=>console.log(res))
			});			
		}
		else
		{
			alert("Загрузите картинку предмета");
		}
	}
	uploadFile(event: any) {
		this.file = event.target.files[0];
		var formats = [".png", "jpeg", ".jpg"] 
		if(!(formats.includes(this.file.name.slice(-4))))
		{
			alert("Недопустимое расширение файла. \nДоступны только: \n.png \n.jpeg \n.jpg")
			this.file = null!;
		}
	}
}
