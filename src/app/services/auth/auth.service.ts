import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { registration , login} from '../../interfaces/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;
  constructor(private http : HttpClient, private router : Router) { }

  registerNewUser(registrationData : registration){
     return this.http.post<registration>(`${this.apiUrl}/auth/register`,registrationData);
  }

  loginUser(loginData : login){
     return this.http.post<login>(`${this.apiUrl}/auth/login`,loginData);
  }

  get isLoggedIn(){
     const token = localStorage.getItem('user_token');
     if(token){
       return true;
     }
       return false;
  }

  get userName(){
     const userInfo = localStorage.getItem('user_details');
     if(userInfo){
        return JSON.parse(userInfo).name;
     }
  }

  logOut(){
    localStorage.removeItem('user_details');
    localStorage.removeItem('user_token');
    this.router.navigateByUrl('/login');
  }

  get isAdmin(){
    const checkAdmin = localStorage.getItem('user_details');
    if(checkAdmin){
       const admin = JSON.parse(checkAdmin);
       if(admin.isAdmin){
         console.log('admin is : ',admin.isAdmin);
         return true;
       }
    }
    return false;
  }
}
