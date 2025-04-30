import { Component } from '@angular/core';
import {AfterViewInit , ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../../services/products/product.service';
import { IProduct } from '../../../../interfaces/product';


@Component({
    selector: 'app-product',
    imports: [RouterLink, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss'
})
export class ProductComponent {

  // yaha jin column ke names ha inko html me bhi hona chaiye nahi tu error ata 
  displayedColumns: string[] = ['_id', 'name', 'shortDescription' , 'Price' , 'discount'  ,'action'];
  dataSource!: MatTableDataSource<IProduct>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productSer : ProductService) {}

  ngOnInit(){
    this.productSer.getAllProducts().subscribe((res : any)=>{
       console.log('all categories are : ',res);
       this.dataSource = new MatTableDataSource(res.allProducts);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCategory(deletedId : string){
     this.productSer.deleteProduct(deletedId).subscribe((res : any)=>{
        this.dataSource.data = this.dataSource.data.filter(category => category._id != deletedId)
        alert('Category Deleted Successfully !');
        console.log('deleted category is : ',res);
     })
  }

}

