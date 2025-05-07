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
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from '../core/guards/auth/auth.guard';
import { AdminDashboardComponent } from './components/manage/admin-dashboard/admin-dashboard.component';
import { adminGuard } from '../core/guards/admin/admin.guard';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    {
        path:"",
        component : HomeComponent,
        canActivate : [authGuard]
    },
    {
        path:"admin/categories",
        component: CategoriesComponent,
        canActivate : [adminGuard]
    },
    {
        path:"admin/categories/add",
        component:CategoryFormComponent,
        canActivate : [adminGuard]
    },
    {
        path:"admin/categories/:id",
        component:CategoryFormComponent,
        canActivate : [adminGuard]
    },
    {
        path:"admin/brands",
        component:BrandsComponent,
        canActivate : [adminGuard]
    },
    {
        path:"admin/brands/add",
        component:BrandFormComponent,
        canActivate : [adminGuard]
    },
    {
        path:"admin/brands/:id",
        component:BrandFormComponent,
        canActivate : [adminGuard]
    },
    {
        path:'admin/products',
        component:ProductComponent,
        canActivate : [adminGuard]
    },
    {
        path:"admin/products/add",
        component:ProductFormComponent,
        canActivate : [adminGuard]
    },
    {
        path:"admin/products/:id",
        component:ProductFormComponent,
        canActivate : [adminGuard]
    },
    {
        path : 'product',
        component : ProductListComponent,
        canActivate : [authGuard]
    },
    {
        path : 'product/:id',
        component : ProductDetailComponent,
        canActivate : [authGuard]
    },
    {
        path: 'register',
        component : RegisterComponent
    },
    {
        path: 'login',
        component : RegisterComponent,
    },
    {
        path: 'admin',
        component : AdminDashboardComponent,
        canActivate : [adminGuard]
    },
    {
        path: 'profile',
        component : ProfileComponent,
        canActivate : [authGuard]
    }
];
