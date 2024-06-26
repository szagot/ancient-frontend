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
  questionsAnswered: number = 0;
  gamersQueue: Gamer[] = [];
  questions: Question[] = [];

  constructor(private service: GameService) {
    this.service.restartCountGamer();
    this.setActualGamer();
    this.setActualQuestion();
    this.setGamers();
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
    if (this.isAllGamersChoosen() && !this.endQuestions() ) {
      this.service.restartCountGamer();
      this.setGamers();
    } else {
      this.service.nextGamer();
    }
    this.setActualGamer();
    this.setActualQuestion();
    this.questionsAnswered++;
  }

  endQuestions(){
    return this.questionsAnswered >= (this.service.getQtQuestions() - 1);
  }

  setActualGamer() {
    this.actualGamer = this.service.getActualGamer();
  }

  isAllGamersChoosen() {
    return this.service.isAllGamersChoosen();
  }

  setGamers() {
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
    return this.actualQuestion;
  }
}
