import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Category , IAddCategory } from '../../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

   ApiUrl : string =  'http://localhost:3000/category'
   

  constructor(private http : HttpClient) {}

  getAllCategories(){
     return this.http.get<Category[]>(this.ApiUrl);
  }

  addNewCategory(name : string){
    return this.http.post<IAddCategory>(this.ApiUrl,{name : name});
  }

  deleteCategory(id:string){
     return this.http.delete<Category>(`${this.ApiUrl}/${id}`);
  }

  editCategory(id : string , name : string){
      return this.http.put<Category>(`${this.ApiUrl}/${id}`, {name});
  }

  getSingleCategory(id : string){
     return this.http.get<Category>(`${this.ApiUrl}/${id}`);
  }
}
