import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';
import { Person } from '../models/person.model';
import { QuestionsService } from './questions.service';
import { PeopleService } from './people.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  fase: number = 0;
  gamers: string[] = [''];
  actualGamerIndex: number = 0;
  allGamersChoosen: boolean = false;
  loopQuestions: Question[] = [];
  personChoosen: Person = new Person();

  constructor(
    private questionService: QuestionsService,
    private peopleService: PeopleService,
  ) {
    this.clearGamers();
  }

  setFase(fase: number) {
    this.fase = fase;
  }

  nextFase() {
    this.fase = (this.fase < 3) ? (this.fase + 1) : 0
    if (this.fase == 1) {
      this.setLoopPerson();
      this.setLoopQuestions();
    }
  }

  getFase() {
    return this.fase;
  }

  addGamer(gamer: string) {
    gamer = gamer.trim();
    if (!this.getGamerByName(gamer)) {
      this.gamers.push(gamer);
    }
  }

  chooseOutOfLoop() {
    if (!this.getGamers().length) {
      return '';
    }

    const randomIndex = Math.floor(Math.random() * this.getGamers().length);
    return this.getGamers()[randomIndex];
  }

  removeGamer(index: number) {
    if (index > -1 && this.gamers.length > 1) {
      this.gamers.splice(index, 1);
    }
  }

  clearGamers() {
    this.fase = 0;
    this.actualGamerIndex = 0;
    this.allGamersChoosen = false;
    this.personChoosen = new Person();
    this.loopQuestions = [];
  }

  updateGamer(index: number, newName: string) {
    if (index > -1) {
      newName = newName.trim();
      if (!this.getGamerByName(newName)) {
        this.gamers[index] = newName;
      } else {
        this.removeGamer(index);
      }
    }
  }

  getGamerByName(search: string) {
    return this.gamers.some(gamer => gamer.toLowerCase() === search.toLowerCase());
  }

  getGamers(onlyValid: boolean = true) {
    if (!onlyValid) {
      return this.gamers;
    }

    return this.gamers.filter((gamer) => gamer.replace(/\s+/, '') !== '');
  }

  getActualGamer() {
    return this.gamers[this.actualGamerIndex];
  }

  nextGamer() {
    if (!this.allGamersChoosen) {
      this.actualGamerIndex++;
      if ((this.actualGamerIndex + 2) > this.getGamers().length) {
        this.allGamersChoosen = true;
      }
    }
  }

  isAllGamersChoosen() {
    return this.allGamersChoosen;
  }

  numberOfGamersIsValid() {
    return this.getGamers().length > 3;
  }

  setLoopPerson() {
    this.peopleService.getAll().subscribe((people: Person[]) => {
      if (!people.length) {
        return;
      }

      const randomIndex = Math.floor(Math.random() * people.length);
      this.personChoosen = people[randomIndex];
    });
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  setLoopQuestions() {
    if (!this.getGamers().length) {
      return;
    }

    this.questionService.getAll().subscribe((questions: Question[]) => {
      if (!questions.length) {
        return;
      }

      const questionShuffle = this.shuffleArray(questions);

      const qtQuestions = this.getGamers().length * 2;
      for (let i = 0; i <= qtQuestions; i++) {
        if (i >= questionShuffle.length) {
          break;
        }

        this.loopQuestions.push(questionShuffle[i]);
      }
    });
  }

  getLoopPerson() {
    return this.personChoosen;
  }

  getLoopQuestions() {
    return this.loopQuestions;
  }
}
