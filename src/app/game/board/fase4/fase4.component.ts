import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-fase4',
  standalone: true,
  imports: [],
  templateUrl: './fase4.component.html',
  styleUrl: './fase4.component.scss'
})
export class Fase4Component {
  constructor(private service: GameService){  }

  nextFase() {
    const btn = document.querySelector('.next');
    const board = document.querySelector('.board');
    
    // Efeitos
    btn?.classList.add('active');
    board?.classList.add('by');
    setTimeout(() => {
      // TODO: Remover a soma automática de pontos
      const choosenOne = this.service.getChooseOutOfLoop();
      this.service.getGamerByName('daniel')?.addPoints(choosenOne.name.toLowerCase() == 'daniel');
      this.service.getGamerByName('sara')?.addPoints(choosenOne.name.toLowerCase() == 'daniel');
      choosenOne.addBonus(true);

      this.service.nextFase();
      // Remoção de efeitos
      btn?.classList.remove('active');
      board?.classList.remove('by');
    }, 1000);
  }
}
