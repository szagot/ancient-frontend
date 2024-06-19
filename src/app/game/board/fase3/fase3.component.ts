import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { Gamer } from '../../../models/gamer.model';
import { CommonModule } from '@angular/common';
import { Question } from '../../../models/question.model';

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
  actualQuestionIndex: number = 0;
  actualQuestion: Question = new Question();
  secondRound = false;
  gamersQueue: Gamer[] = [];
  questions: Question[] = [];

  constructor(private service: GameService) {
    this.service.restartCountGamer();
    this.setActualGamer();
    this.setActualQuestion();
    this.shuffleGamers();
    this.questions = this.service.getLoopQuestions();
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
    this.setActualQuestion();
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

  setActualQuestion() {
    this.actualQuestion = this.service.getLoopQuestions()[this.actualQuestionIndex++] || new Question();
    console.log(this.service.getLoopQuestions(), this.actualQuestion);

    return this.actualQuestion;
  }
}
