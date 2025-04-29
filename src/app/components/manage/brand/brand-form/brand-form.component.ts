import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../../services/category/category.service';
import { CommonModule } from '@angular/common';
import { single } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BrandService } from '../../../../services/brand/brand.service';
import { IBrand } from '../../../../interfaces/brand';

@Component({
  selector: 'app-brand-form',
  standalone: true,
  imports: [MatInputModule,MatButtonModule,CommonModule,FormsModule],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.scss'
})
export class BrandFormComponent {

  value = signal('')
  editId = signal('');

  constructor(private brandSer : BrandService, private router : Router,private activatedRoute : ActivatedRoute){
    console.log('activated route is : ',this.activatedRoute);
    const id = this.activatedRoute.paramMap.subscribe((res:any)=>{
      this.editId.set(res.params.id);
    });
    console.log('id is :',this.editId());
  }

  ngOnInit(){
     if(this.editId()){
        this.brandSer.getSingleBrand(this.editId()).subscribe((res:any)=>{
           console.log('single category data is : ',res.result.name);
           this.value.set(res.result.name);
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
    this.brandSer.addNewBrand(this.value()).subscribe((res)=>{
       alert('Category Added Successfully');
       this.router.navigateByUrl('/admin/categories');
    })
  }

  editCategory(){
     this.brandSer.editBrand(this.editId(),this.value()).subscribe((res)=>{
       alert('Category Updated Successfully');
       console.log('updated category is :',res);
     })
  }

  pageNavigation(){
    this.router.navigateByUrl('/admin/brands');
  }

}

