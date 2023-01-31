import { Component,  } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import * as $ from "jquery";
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/User';
import { UserRequest } from 'src/app/models/UserRequest';

@Component({
	selector: 'app-user-requests',
	templateUrl: './user-requests.component.html',
	styleUrls: ['./user-requests.component.css']
})
export class UserRequestsComponent {
	constructor(private http: HttpClient)
	{}

	ngOnInit()
	{
		this.getUserRequests()
	}

	userRequests: UserRequest[] = [];
	getUserRequests() {
		$.get(environment.server_url + "/UserRequests/GetUserRequests").done(response => 
		{
			this.userRequests = JSON.parse(response);
			console.log(this.userRequests)
		})
	}
	Delete(userRequest: UserRequest)
	{
		$.post(environment.server_url + "/UserRequests/Delete?Id=" + userRequest.Id).done(response =>
		{ 
			if( response == "OK") { 
				console.log("Запрос удален: \n" + userRequest); 
				this.userRequests.splice(this.userRequests.indexOf(userRequest),1)
			} 
		})
	}

	Allow(userRequest: UserRequest) 
	{
		$.post(environment.server_url + "/UserRequests/Allow?Id=" + userRequest.Id).done(response=>
		{
			if(response == "OK")
			{
				console.log("Запрос одобрен: \n" + userRequest);
				this.Delete(userRequest)
			}
			else
			{
				console.log(response)
				this.Delete(userRequest)
			}
		});
	}

}	
