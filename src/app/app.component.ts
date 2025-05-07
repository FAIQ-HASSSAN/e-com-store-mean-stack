import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
    selector: 'app-root',
    imports: [CommonModule ,RouterOutlet, MatButtonModule, HeaderComponent, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'webapp';
  ischeck : boolean = false;
  currentPath: string = '';

  constructor(private activatedRoute : ActivatedRoute,private route : Router){}

  ngOnInit(){
     this.route.events.subscribe((event)=>{
         if(event instanceof NavigationStart){
           this.currentPath = event.url;
           if(this.currentPath === '/register'){
              this.ischeck = true;
           }else if(this.currentPath === '/login'){
            this.ischeck = true;
         }
         }
     })
  }
}
