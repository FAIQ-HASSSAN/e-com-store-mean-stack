import { Component } from '@angular/core';
import {AfterViewInit , ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { BrandService } from '../../../../services/brand/brand.service';
import { IBrand } from '../../../../interfaces/brand';

@Component({
    selector: 'app-brands',
    imports: [RouterLink, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule],
    templateUrl: './brands.component.html',
    styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  displayedColumns: string[] = ['_id', 'name', 'action'];
  dataSource!: MatTableDataSource<IBrand>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private brandSer : BrandService) {}

  ngOnInit(){
    this.brandSer.getAllBrands().subscribe((res : any)=>{
       console.log('all categories are : ',res);
       this.dataSource = new MatTableDataSource(res.result);
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
     this.brandSer.deleteBrand(deletedId).subscribe((res : any)=>{
        this.dataSource.data = this.dataSource.data.filter(category => category._id != deletedId)
        alert('Category Deleted Successfully !');
        console.log('deleted category is : ',res);
     })
  }

}
