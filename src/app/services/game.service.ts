import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';
import { Person } from '../models/person.model';
import { QuestionsService } from './questions.service';
import { PeopleService } from './people.service';
import { Gamer } from '../models/gamer.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  fase: number = 0;
  gamers: Gamer[] = [new Gamer()];
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
    this.configFase();
  }

  configFase() {
    if (this.fase == 1) {
      this.setLoopPerson();
      this.setLoopQuestions();
    }
  }

  getFase() {
    return this.fase;
  }

  addGamer(gamerName: string) {
    const gamer = new Gamer(gamerName);
    if (!this.getGamerByName(gamer.name)) {
      this.gamers.push(gamer);
    }
  }

  getTotalPoints() {
    return this.gamers.reduce((total, gamer) => total + gamer.points, 0);
  }

  chooseOutOfLoop() {
    if (!this.getGamers().length) {
      return new Gamer();
    }

    const randomIndex = Math.floor(Math.random() * this.getGamers().length);
    return this.getGamers()[randomIndex];
  }

  removeGamer(index: number) {
    if (index > -1 && this.gamers.length > 1) {
      this.gamers.splice(index, 1);
    }
  }

  /**
   * @param newLoop Se true, zera os jogadores também
   */
  clearGamers(newLoop = false) {
    // this.gamers = [new Gamer('Daniel', 75), new Gamer('Alini'), new Gamer('Alejandro'), new Gamer('Filipe'), new Gamer('')]; // TODO: remover essa linha
    if (newLoop) {
      this.gamers.forEach(gamer => gamer.points = 0);
    }
    this.fase = (this.getTotalPoints() > 0 && !newLoop) ? 1 : 0;
    this.actualGamerIndex = 0;
    this.allGamersChoosen = false;
    this.personChoosen = new Person();
    this.loopQuestions = [];
    this.configFase();
  }

  updateGamer(index: number, newName: string) {
    if (index > -1) {
      newName = newName.trim();
      if (!this.getGamerByName(newName)) {
        this.gamers[index].name = newName;
      } else {
        this.removeGamer(index);
      }
    }
  }

  getGamerByName(search: string) {
    return this.gamers.some(gamer => gamer.name.toLowerCase() === search.toLowerCase());
  }

  getGamers(onlyValid: boolean = true) {
    if (!onlyValid && this.getTotalPoints() == 0) {
      return this.gamers;
    }

    return this.gamers.filter((gamer) => gamer.isValidName());
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
