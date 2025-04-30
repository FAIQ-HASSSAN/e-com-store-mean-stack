import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './components/manage/category/categories/categories.component';
import { CategoryFormComponent } from './components/manage/category/category-form/category-form.component';
import { BrandsComponent } from './components/manage/brand/brands/brands.component';
import { BrandFormComponent } from './components/manage/brand/brand-form/brand-form.component';
import { ProductComponent } from './components/manage/products/product/product.component';
import { ProductFormComponent } from './components/manage/products/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

export const routes: Routes = [
    {
        path:"",
        component : HomeComponent,
    },
    {
        path:"admin/categories",
        component: CategoriesComponent
    },
    {
        path:"admin/categories/add",
        component:CategoryFormComponent
    },
    {
        path:"admin/categories/:id",
        component:CategoryFormComponent
    },
    {
        path:"admin/brands",
        component:BrandsComponent,
    },
    {
        path:"admin/brands/add",
        component:BrandFormComponent
    },
    {
        path:"admin/brands/:id",
        component:BrandFormComponent
    },
    {
        path:'admin/products',
        component:ProductComponent,
    },
    {
        path:"admin/products/add",
        component:ProductFormComponent,
    },
    {
        path:"admin/products/:id",
        component:ProductFormComponent
    },
    {
        path : 'product',
        component : ProductListComponent
    },
    {
        path : 'product/:id',
        component : ProductDetailComponent
    }
];
