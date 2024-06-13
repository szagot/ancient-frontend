import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fase0',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './fase0.component.html',
  styleUrl: './fase0.component.scss'
})
export class Fase0Component {

  // Número de layers para efeito no título
  layers = Array(20).fill(0);

  constructor(private service: GameService) {  }

  nextFase() {
    const btn = document.querySelector('.next');
    const board = document.querySelector('.board');
    
    // Efeitos
    btn?.classList.add('active');
    board?.classList.add('by');
    setTimeout(() => {
      this.service.nextFase();
      // Remoção de efeitos
      btn?.classList.remove('active');
      board?.classList.remove('by');
    }, 1000);
  }
}
