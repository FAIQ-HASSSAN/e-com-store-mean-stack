import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../../services/category/category.service';
import { CommonModule } from '@angular/common';
import { single } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../../../interfaces/category';

@Component({
    selector: 'app-category-form',
    imports: [MatInputModule, MatButtonModule, CommonModule, FormsModule],
    templateUrl: './category-form.component.html',
    styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {

  value = signal('')
  editId = signal('');

  constructor(private categorySer : CategoryService, private router : Router,private activatedRoute : ActivatedRoute){
    console.log('activated route is : ',this.activatedRoute);
    const id = this.activatedRoute.paramMap.subscribe((res:any)=>{
      this.editId.set(res.params.id);
    });
    console.log('id is :',this.editId());
  }

  ngOnInit(){
     if(this.editId()){
        this.categorySer.getSingleCategory(this.editId()).subscribe((res:Category)=>{
           console.log('single category data is : ',res);
           this.value.set(res.name);
        })
     }
  }
  newAndEditCategory(){
     if(this.editId()){
        this.editCategory();
     }else{
      this.addNewCategory();
     }
     this.pageNavigation();
  }

  addNewCategory(){
    this.categorySer.addNewCategory(this.value()).subscribe((res)=>{
       alert('Category Added Successfully');
       this.router.navigateByUrl('/admin/categories');
    })
  }

  editCategory(){
     this.categorySer.editCategory(this.editId(),this.value()).subscribe((res)=>{
       alert('Category Updated Successfully');
       console.log('updated category is :',res);
     })
  }

  pageNavigation(){
    this.router.navigateByUrl('/admin/categories');
  }

}
