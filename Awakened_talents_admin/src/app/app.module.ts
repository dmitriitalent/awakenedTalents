import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { UserRequestsComponent } from './components/user-requests/user-requests.component';
import { UsersComponent } from './components/users/users.component';
import { TeacherSubjectsComponent } from './components/teacher-subjects/teacher-subjects.component';

const appRoutes: Routes = [
	{ path: "subjects", component: SubjectsComponent },
	{ path: "userRequests", component: UserRequestsComponent},
	{ path: "users", component: UsersComponent }
]

@NgModule({
	declarations: [
		AppComponent,
		SubjectsComponent,
		UserRequestsComponent,
  UsersComponent,
  TeacherSubjectsComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		RouterModule.forRoot(appRoutes),
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }

