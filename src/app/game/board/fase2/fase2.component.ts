import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-fase2',
  standalone: true,
  imports: [],
  templateUrl: './fase2.component.html',
  styleUrl: './fase2.component.scss'
})
export class Fase2Component {
  constructor(private service: GameService){  }

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
