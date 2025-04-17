import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../../interfaces/brand';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http : HttpClient) { }

  ApiUrl : string =  environment.apiUrl;
  
  getAllBrands(){
     return this.http.get<IBrand[]>(this.ApiUrl+'/brand');
  }

  addNewBrand(name : string){
    return this.http.post<IBrand>(this.ApiUrl+'/brand',{name : name});
  }

  deleteBrand(id:string){
     return this.http.delete<IBrand>(`${this.ApiUrl+'/brand'}/${id}`);
  }

  editBrand(id : string , name : string){
      return this.http.put<IBrand>(`${this.ApiUrl+'/brand'}/${id}`, {name});
  }

  getSingleBrand(id : string){
     return this.http.get<IBrand>(`${this.ApiUrl+'/brand'}/${id}`);
  }
}
