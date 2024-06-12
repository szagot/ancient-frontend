import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ancient-frontend';
  navItems = [
    { route: '/', icon: 'bi-joystick', label: 'Jogo' },
    { route: '/admin/people', icon: 'bi-people-fill', label: 'Pessoas' },
    { route: '/admin/questions', icon: 'bi-patch-question-fill', label: 'Perguntas' },
  ];

  constructor(private routes: Router) { }

  go(url: string) {
    this.routes.navigateByUrl(url);
    return false;
  }
}
