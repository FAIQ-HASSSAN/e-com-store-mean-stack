import { Component } from '@angular/core';
import {AfterViewInit , ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CategoryService } from '../../../services/category/category.service';
import { Category } from '../../../interfaces/category';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink,MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatButtonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  displayedColumns: string[] = ['_id', 'name', 'action'];
  dataSource!: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private categorySer : CategoryService) {}

  ngOnInit(){
    this.categorySer.getAllCategories().subscribe((res : any)=>{
       console.log('all categories are : ',res);
       this.dataSource = new MatTableDataSource(res);
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
     this.categorySer.deleteCategory(deletedId).subscribe((res : any)=>{
        this.dataSource.data = this.dataSource.data.filter(category => category._id != deletedId)
        alert('Category Deleted Successfully !');
        console.log('deleted category is : ',res);
     })
  }
}