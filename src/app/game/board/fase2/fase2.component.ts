import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { CommonModule } from '@angular/common';
import { Gamer } from '../../../models/gamer.model';

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
  actualGamer: Gamer = new Gamer();
  chooseOutOfLoop: Gamer = new Gamer();
  show: boolean = false;

  constructor(private service: GameService) {
    this.setActualGamer();
    this.chooseOutOfLoop = this.service.getChooseOutOfLoop();
  }

  getGamers() {
    return this.service.getGamers();
  }

  setActualGamer() {
    this.actualGamer = this.service.getActualGamer();
  }

  nextGamer() {
    this.service.nextGamer();
    this.setActualGamer();
    this.show = false;
  }

  showPerson() {
    this.show = true;
  }

  isAllGamersChoosen() {
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

  getPersonChoosen() {
    return this.service.getLoopPerson();
  }

  hasEnoughQuestions() {
    return this.service.hasEnoughQuestions();
  }

  restartLoop() {
    this.service.clearGamers(true);
  }
}
