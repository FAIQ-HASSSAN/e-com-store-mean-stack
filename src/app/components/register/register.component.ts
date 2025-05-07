import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { registration , login } from '../../interfaces/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatInput } from '@angular/material/input';


@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink,MatButtonModule,MatFormField,MatInput],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
     isReigster : boolean = false;
     isLogin : boolean = false;
     fb = inject(FormBuilder)
     registerForm! : FormGroup;    

     constructor(private router : Router,private authSer : AuthService){}

     ngOnInit(){
        this.checkUrl();
        this.registerFormCreation();
     }

     checkUrl(){
      if(this.router.url  === '/register'){
        this.isReigster = true;
      }else if(this.router.url === '/login'){
          this.isLogin = true;
      }
     }

     registerFormCreation(){
         this.registerForm = this.fb.group({
            name : ['',[Validators.required]],
            email : ['',Validators.required,Validators.email],
            password : ['',Validators.required]
         })
     }

     registerAndloginUser(){
         if(this.isReigster){
             this.authSer.registerNewUser(this.registerForm.value).subscribe((res : registration)=>{
                alert(`${res.user.name} Is Successfully Register`);
                this.router.navigateByUrl('/login');
             })
         }else if(this.isLogin){
             this.authSer.loginUser(this.registerForm.value).subscribe((res : login)=>{
                alert(`${res.userInfo.name} successfully logged in`);
                localStorage.setItem('user_token',res.token);
                // we cannot store object in local storage that is why using json.stringify we convert object into string
                localStorage.setItem('user_details',JSON.stringify(res.userInfo));
                this.router.navigateByUrl('/');
             })
         }
     }

     redirection(){
       if(this.isReigster){
          this.router.navigateByUrl('/login')
       }else if(this.isLogin){
          this.router.navigateByUrl('/register')
       }
     }
}
