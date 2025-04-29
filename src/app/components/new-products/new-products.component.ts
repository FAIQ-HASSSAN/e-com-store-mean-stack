import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CustomerService } from '../../services/customer/customer.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { IProduct } from '../../interfaces/product';

@Component({
  selector: 'app-new-products',
  standalone: true,
  imports: [CommonModule,MatButtonModule],
  templateUrl: './new-products.component.html',
  styleUrl: './new-products.component.scss'
})
export class NewProductsComponent {

  @ViewChild('cardsList') cardsList! : ElementRef;
  tileSize : number = 0;
  isClickedLeft: boolean = false;  // Initially, right arrow is highlighted (false for left)
  isClickedRight: boolean = true;  // Initially, right arrow is highlighted (true for right)
  @Input() newProducts : IProduct[] = [];

  styleObject1 = {
    'border': '1px solid',
    'background': 'none'
  };

  styleObject2 = {
    'border': 'none',
    'background': '#E2FB9D'
  };
 
  constructor(
    private customSer: CustomerService,
    private cdr: ChangeDetectorRef
  ) {
      setTimeout(() => {
        this.countSectionInnerWidth();
      });
  }
  countSectionInnerWidth() {
    console.log('i am in countSectionInnerWidth "');
    this.cdr.detectChanges();
    if (this.cardsList) {
      if (this.cardsList?.nativeElement?.offsetWidth > 300) {
        this.tileSize = Math.floor(this.cardsList?.nativeElement?.offsetWidth / 2.5);
      } else {
           this.tileSize = Math.floor(this.cardsList?.nativeElement?.offsetWidth /1.2);
      }}
  }

  scrollLeft(): void {
    if (this.cardsList) {
      this.isClickedLeft = true;
      this.isClickedRight = false;
      this.cardsList.nativeElement.scrollTo({
        left: this.cardsList.nativeElement.scrollLeft - this.tileSize,
        behavior: "smooth",
      });
    }
  }

  scrollRight(): void {
    if (this.cardsList) {
      this.isClickedLeft = false;
      this.isClickedRight = true;
      this.cardsList.nativeElement.scrollTo({
        left: this.cardsList.nativeElement.scrollLeft + this.tileSize,
        behavior: "smooth",
      });
    }
  }

}
