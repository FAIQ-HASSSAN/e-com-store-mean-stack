import { Component, signal } from '@angular/core';
import { CustomerService } from '../../services/customer/customer.service';
import { IProduct } from '../../interfaces/product';
import { forkJoin } from 'rxjs';
import { FeatureProductComponent } from "../../components/FeatureProduct/feature-product/feature-product.component";
import { NewProductsComponent } from "../../components/new-products/new-products.component";
import { CrouselComponent } from "../../components/crousel/crousel.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FeatureProductComponent, NewProductsComponent, CrouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  featuredProducts : IProduct[] = [];
  newProducts = signal<IProduct[]>([])

  constructor(private customerSer : CustomerService){}

  get featureAndNewProducts(){
       const featuredProduct = this.customerSer.getFeatureProducts();
       const newProducts = this.customerSer.getNewProducts();

       return forkJoin([featuredProduct , newProducts]);
  }

  ngOnInit(){
      this.featureAndNewProducts.subscribe((res : any)=>{
         this.featuredProducts = res[0];
         this.newProducts.set(res[1]);
      })
  }

}
