import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from "ngx-cookie-service";
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { ContentSidebarComponent } from './components/content-sidebar/content-sidebar.component';
import { AboutComponent } from './components/about/about.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { HomeComponent } from './components/home/home.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthenticationService } from './services/authenticationService';
import { User } from './models/User';
import { userData } from './userData';
import { environment } from 'src/environments/environment';
import { InitService } from './services/initService';
import { SubjectComponent } from './components/subject/subject.component';
import { BecomeTeacherMenuComponent } from './components/become-teacher-menu/become-teacher-menu.component';

const appRoutes: Routes = [
	{path: "catalog", component: ContentComponent, children: [
		{path: "", component: SubjectsComponent},
		{path: ":subjectType", component: SubjectsComponent},
	]},
	{path: "teachers", component: TeachersComponent},
	{path: "teachers/:RouterName", component: TeachersComponent},
	{path: "reviews", component: ReviewsComponent},
	{path: "about", component: AboutComponent},
	{path: "page", component: ProfileComponent},
	{path: "login", component: LoginComponent},
	{path: "register", component: RegisterComponent},
]



export function InitApp(initService: InitService) {
	return (): Promise<any> =>
	{
		return initService.Init();
	}
}

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		ContentComponent,
		ContentSidebarComponent,
		AboutComponent,
		TeachersComponent,
		SubjectsComponent,
		HomeComponent,
		ReviewsComponent,
		LoginComponent,
		ProfileComponent,
		RegisterComponent,
		SubjectComponent,
		BecomeTeacherMenuComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		RouterModule.forRoot(appRoutes),
		HttpClientModule,
		FormsModule,
		BrowserAnimationsModule
	],
	providers: [
		InitService,
		CookieService,
		AuthenticationService,
		{ provide: APP_INITIALIZER, useFactory: InitApp, deps: [InitService],multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
