import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { environment } from "src/environments/environment";
import { userData } from "../userData";
import * as $ from "jquery";
import { AuthenticationService } from "./authenticationService";

@Injectable()
export class InitService {
	constructor(private cookies: CookieService, private http: HttpClient, private auth: AuthenticationService) {}
	
    Init() {
        return new Promise<void>((resolve, reject) => {
            
            this.auth.UpdateUserData();

            setTimeout(() => {
                resolve();
            }, 250);
 
        });
    }
}
