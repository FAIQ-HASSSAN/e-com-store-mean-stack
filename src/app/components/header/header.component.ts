import { Component } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { IAddCategory , Category } from '../../interfaces/category';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

     categoryArr : Category[] = []
     constructor(private categorySer :CategoryService){}

     ngOnInit(){
        this.categorySer.getAllCategories().subscribe((res : Category[])=>{
             this.categoryArr = res;
        })
     }
}
