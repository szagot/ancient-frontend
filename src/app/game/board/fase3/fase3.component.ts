import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { Gamer } from '../../../models/gamer.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fase3',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './fase3.component.html',
  styleUrl: './fase3.component.scss'
})
export class Fase3Component {
  actualGamer: Gamer = new Gamer();
  secondRound = false;
  gamersQueue: Gamer[] = [];

  constructor(private service: GameService) {
    this.service.restartCountGamer();
    this.setActualGamer();
    this.shuffleGamers();
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

  nextGamer() {
    if (this.isAllGamersChoosen() && !this.secondRound) {
      this.secondRound = true;
      this.service.restartCountGamer();
      this.shuffleGamers();
    } else {
      this.service.nextGamer();
    }
    this.setActualGamer();
  }

  setActualGamer() {
    this.actualGamer = this.service.getActualGamer();
  }

  isAllGamersChoosen() {
    return this.service.isAllGamersChoosen();
  }

  shuffleGamers() {
    this.gamersQueue = this.service.getGamers();
  }

  getNextGamerQueue() {
    let next = this.service.actualGamerIndex + 1;
    if (next >= this.gamersQueue.length) {
      next = 0;
    }
    return this.gamersQueue[next];
  }
}
