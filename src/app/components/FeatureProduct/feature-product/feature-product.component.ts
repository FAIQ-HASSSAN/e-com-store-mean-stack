import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input, input, signal, SimpleChanges, ViewChild } from '@angular/core';
import { CustomerService } from '../../../services/customer/customer.service';
import { MatButtonModule } from '@angular/material/button';
import { IProduct } from '../../../interfaces/product';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-feature-product',
    // schemas : [CUSTOM_ELEMENTS_SCHEMA],
    standalone : true,
    imports: [CommonModule, MatButtonModule,RouterLink],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './feature-product.component.html',
    styleUrl: './feature-product.component.scss'
})
export class FeatureProductComponent {
  @ViewChild("cardsList") cardsList?: ElementRef<HTMLUListElement>;
  @Input() featureProducts : IProduct[] = []; 
  tileSize: number = 0;
  data = input<any>({
    id: 10,
    sectionTitle: "Feature Products",
    heading: "Feature Products",
    ctaLabel: "Feature Products",
    ctaUrl: "http://54.90.184.183/ by huzaifa",
  });
  sliderData = input<any>();

  constructor(private customSer : CustomerService,private cdr: ChangeDetectorRef
  ) {
      setTimeout(() => {
        this.countSectionInnerWidth();
      });
  }
  countSectionInnerWidth() {
    this.cdr.detectChanges();
    if (this.cardsList) {
      if (this.cardsList?.nativeElement?.offsetWidth > 440) {
        this.tileSize = Math.floor(
          this.cardsList?.nativeElement?.offsetWidth / 2.5
        );
      } else {
           this.tileSize = Math.floor(
             this.cardsList?.nativeElement?.offsetWidth /1.2
           );
      }

      }
  
  }
  scrollLeft(): void {
    if (this.cardsList) {
      this.cardsList.nativeElement.scrollTo({
        left: this.cardsList.nativeElement.scrollLeft - this.tileSize,
        behavior: "smooth",
      });
    }
  }

  scrollRight(): void {
    if (this.cardsList) {
      this.cardsList.nativeElement.scrollTo({
        left: this.cardsList.nativeElement.scrollLeft + this.tileSize,
        behavior: "smooth",
      });
    }
  }
 
}
