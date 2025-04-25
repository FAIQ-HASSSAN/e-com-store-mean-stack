import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IProduct } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
   
   apiUrl = environment.apiUrl;
 
   constructor(private http : HttpClient) {}

   getAllProducts(){
    return this.http.get<IProduct[]>(this.apiUrl+'/product')
   }

   deleteProduct(id : string){
    return this.http.delete<IProduct>(`${this.apiUrl}/product/${id}`);
   }

   getProductById(id: string){
     return this.http.get<IProduct>(`${this.apiUrl}/product/${id}`);
   }

   updateSingleProduct(id : string , data : IProduct){
       return this.http.put<IProduct>(`${this.apiUrl}/product/${id}`,data);
   }

   addProduct(product : IProduct){
      return this.http.post<IProduct>(`${this.apiUrl}/product`,product)
   }

}
