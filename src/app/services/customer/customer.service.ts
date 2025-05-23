import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct } from '../../interfaces/product';
import { environment } from '../../../environments/environment';
import { Category } from '../../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  http = inject(HttpClient);
  ApiUrl = environment.apiUrl;

  constructor() { }

  getNewProducts(){
     return this.http.get<IProduct[]>(`${this.ApiUrl}/customer/new-products`);
  }

  getFeatureProducts(){
    return this.http.get<IProduct[]>(`${this.ApiUrl}/customer/feature-products`);
  }

  getAllCategories(){
    return this.http.get<Category[]>(`${this.ApiUrl}/customer/categories`)
  }
}
