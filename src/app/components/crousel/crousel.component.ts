import { Component, input, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { IProduct } from '../../interfaces/product';

declare var $: any;

@Component({
    selector: 'app-crousel',
    standalone : true,
    imports: [SlickCarouselModule],
    templateUrl: './crousel.component.html',
    styleUrl: './crousel.component.scss'
})
export class CrouselComponent {

  sliderImages = input.required<IProduct[]>();
 
  ngAfterViewInit() {
    // Initialize Slick Carousel
    $('.slick-carousel').slick({
      dots: true,         // Show navigation dots
      infinite: true,     // Enable infinite scroll
      speed: 500,         // Speed of the transition
      slidesToShow: 1,    // Show one image at a time
      slidesToScroll: 1,  // Scroll one image at a time
      autoplay: true,     // Autoplay the carousel
      autoplaySpeed: 1500, // Speed of autoplay (in milliseconds)
      arrows : true,
      // fade : true,
      // pauseOnHover: true,
    });
  }
}
