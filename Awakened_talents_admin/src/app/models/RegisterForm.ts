
export class RegisterForm {
	public login: string;
	public password: string;
	public email: string;
	constructor(login: string, email: string, password: string) {
		this.login = login
		this.password = password
		this.email = email
	}	
}

