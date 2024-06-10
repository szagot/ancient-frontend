import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ancient-frontend';

  constructor(private routes: Router){}

  go(url: string){
    this.routes.navigateByUrl(url);
    return false;
  }
}
