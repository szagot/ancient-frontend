import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fase2',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './fase2.component.html',
  styleUrl: './fase2.component.scss'
})
export class Fase2Component {
  constructor(private service: GameService){  }

  getGamers() {
    return this.service.getGamers();
  }

  /**
   * Retorna a pessoa escolhida para estar fora do loop
   */
  chooseOutOfLoop(){
    return this.service.chooseOutOfLoop();
  }

  getNextGamer(){
    return this.service.getNextGamer();
  }

  isAllGamersChoosen(){
    return this.service.isAllGamersChoosen();
  }

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
