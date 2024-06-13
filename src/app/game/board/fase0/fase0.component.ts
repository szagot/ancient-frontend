import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-fase0',
  standalone: true,
  imports: [],
  templateUrl: './fase0.component.html',
  styleUrl: './fase0.component.scss'
})
export class Fase0Component {

  constructor(private service: GameService) {

  }

  nextFase() {
    const btn = document.querySelector('.next');
    const stage = document.querySelector('.stage');
    
    // Efeitos
    btn?.classList.add('active');
    stage?.classList.add('by');
    setTimeout(() => {
      this.service.nextFase();
      // Remoção de efeitos
      btn?.classList.remove('active');
      stage?.classList.remove('by');
    }, 1000);
  }

}
