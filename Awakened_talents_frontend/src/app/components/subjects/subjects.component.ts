import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';
import * as env from 'src/environments/environment';


import { Subject } from "../../models/Subjects"

@Component({
	selector: 'app-subjects',
	templateUrl: './subjects.component.html',
	styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
	
	
	selected_subject: string = "";
	subjects: Subject[] = [];
	constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) 
	{
		this.selected_subject = this.activatedRoute.snapshot.params["subjectType"];
	}

	getSubjects(selected_subject: string) {
		this.http.get(env.environment.server_url + "/Subject/getsubjects?subjectType=" + selected_subject).subscribe({next: (data: any) => 
		{	
			this.subjects = data;
			this.subjects.forEach(element => {
				element.PicName = env.environment.server_url+"/assets/"+element.PicName
			});
		}})
	}

	ngOnInit(): void {
		this.getSubjects(this.selected_subject)
	}

	ngDoCheck():void {
		if (this.selected_subject != this.activatedRoute.snapshot.params["subjectType"])
		{
			this.selected_subject = this.activatedRoute.snapshot.params["subjectType"];
			this.getSubjects(this.selected_subject)
		}
	}
}


