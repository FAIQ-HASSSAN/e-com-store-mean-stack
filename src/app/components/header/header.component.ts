import { Component, signal } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { IAddCategory , Category } from '../../interfaces/category';
import { AuthService } from '../../services/auth/auth.service';
import { CustomerService } from '../../services/customer/customer.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [MatButtonModule,RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {

     categoryArr : Category[] = [];
     // name = signal('');
     constructor(private customerSer:CustomerService, public authSer : AuthService){}

     ngOnInit(){
     console.log('usernmae is : ',this.authSer.userName);
        this.customerSer.getAllCategories().subscribe((res : Category[])=>{
             this.categoryArr = res;
          //    this.name.set(this.authSer.userName);
          //    console.log("name is : ",this.name())
        })
     }

     logoutUser(){
          this.authSer.logOut();
     }
}
