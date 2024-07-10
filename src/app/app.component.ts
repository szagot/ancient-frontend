import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterOutlet, Event } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ancient-frontend';
  currentRoute: string = '';
  navItems = [
    { route: '/', icon: 'bi-joystick', label: 'Jogo' },
    { route: '/admin/people', icon: 'bi-people-fill', label: 'Pessoas' },
    { route: '/admin/questions', icon: 'bi-patch-question-fill', label: 'Perguntas' },
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects;
    });
  }

  go(url: string) {
    this.router.navigateByUrl(url);
    return false;
  }

  sameRoute(url: string) {
    return url === this.currentRoute;
  }
}
