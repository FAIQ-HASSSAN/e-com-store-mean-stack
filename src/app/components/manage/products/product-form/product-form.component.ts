import { Component, Inject, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ProductService } from '../../../../services/products/product.service';
import { MatSelectModule } from '@angular/material/select';
import { IBrand } from '../../../../interfaces/brand';
import { IAddCategory } from '../../../../interfaces/category';
import { BrandService } from '../../../../services/brand/brand.service';
import { JsonPipe } from '@angular/common';
import { CategoryService } from '../../../../services/category/category.service';
import { forkJoin, single } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
    selector: 'app-product-form',
    imports: [MatCheckboxModule, MatSelectModule, ReactiveFormsModule, MatButton, MatFormField, MatLabel, MatInput],
    templateUrl: './product-form.component.html',
    standalone : true,
    styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {

    brand = signal<IBrand[]>([])
    cateogry = signal<IAddCategory[]>([]);
    id = '';

    router = inject(Router)

    formBuilder = inject(FormBuilder);
    productForm = this.formBuilder.group({ 
      // we can use new formcontrol or ['',[Validators.required]], same meaning
      name : ['',[Validators.required , Validators.minLength(5)]],
      description : ['',[Validators.required,Validators.minLength(50)]],
      shortDescription : new FormControl(null,[Validators.required , Validators.minLength(10)]),
      Price : new FormControl(0,[Validators.required]),
      discount : new FormControl(0),
      images : new FormArray([]),
      categoryId : new FormControl('',[Validators.required]),
      brandId : new FormControl('',[Validators.required]),
      isFeatured : [false,[Validators.required]],
      isNewProducts : [false,[Validators.required]]
    })

    constructor(private route : ActivatedRoute, private categorySer : CategoryService , private productSer : ProductService, private brandSer : BrandService){}
  
    ngOnInit(){
      this.route.paramMap.subscribe((res)=>{
        const id = res.get('id');
        if(id){
            this.id = id;
            this.productSer.getProductById(id).subscribe((singleBrand : any)=>{
               for (let index = 0; index < singleBrand.images.length; index++) {
                  this.addControl();
               }
               this.productForm.patchValue(singleBrand);
               this.getBrandsAndCategory();
            })
        }else{
           this.addFormControl()
           this.getBrandsAndCategory();
        }
       })
    }

    getBrandsAndCategory(){
      this.getData().subscribe((data : any)=>{
        this.brand.set(data[0].result);
        this.cateogry.set(data[1]);
    })
    }

    getData(){
      const allBrands = this.brandSer.getAllBrands();
      const allCategories =  this.categorySer.getAllCategories();
      return forkJoin([allBrands , allCategories]);
    }

    getImageControl(){
       return this.productForm.get('images') as FormArray; 
    }

    addFormControl(){
      // return this.formBuilder.group({
      //    image : new FormControl('')
      // })
      return new FormControl('');
    }

    addControl(){
        this.getImageControl().push(this.addFormControl());
    }

    removeControl(){
       this.getImageControl().removeAt(this.getImageControl().controls.length-1);
    }

    get productObj(){
       const obj = {
        name : this.productForm.get('name')?.value ?? '',
        description:this.productForm.get('description')?.value ?? '',
        shortDescription : this.productForm.get('shortDescription')?.value ?? '',
        Price : this.productForm.get('Price')?.value ?? '',
        discount : this.productForm.get('discount')?.value ?? '',
        images : this.productForm.get('images')?.value ?? '',
      }
      return obj;
    }

    addProduct(){
      console.log('form value is : ',this.productForm.value);
      const obj = this.productObj;
      if(obj){
        this.productSer.addProduct(this.productForm.value as any).subscribe((res : any)=>{
            alert(`${res.message}`);
            this.router.navigateByUrl('/admin/products');
        });
      }
    }

    updateProduct(){
        this.productSer.updateSingleProduct(this.id,this.productForm.value as any).subscribe((res : any)=>{
           alert(`${res.message}`);
           this.router.navigateByUrl('/admin/products');
        })
    }

    onFileSelected(event: any, index: number) {
      console.log('event is : ',event);
      console.log('inex is : ',index);
      const file = event.target.files[0];
      console.log('file is : ',file);
      if (!file) return;
    
      const formData = new FormData();
      formData.append('image', file);
    
      this.productSer.uploadImage(formData).subscribe((res: any) => {
        const imageUrl = res.imageUrl;
        const imagesArray = this.getImageControl();
        imagesArray.at(index).setValue(imageUrl);
      });
    }
    
}
