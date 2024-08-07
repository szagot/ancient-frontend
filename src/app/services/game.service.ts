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
  allQuestions: Question[] = [];
  personChoosen: Person = new Person();
  choosenOne: Gamer = new Gamer();
  people: Person[] = [];

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
    this.fase = (this.fase < 4) ? (this.fase + 1) : 0
    this.configFase();
  }

  configFase() {
    if (this.fase == 1) {
      this.setLoopPerson();
    }
    if (this.fase == 0) {
      this.clearGamers();
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
    return this.getGamers().reduce((total, gamer) => total + gamer.points, 0);
  }

  getChooseOutOfLoop() {
    if (this.choosenOne.isValidName() || !this.getGamers().length) {
      return this.choosenOne;
    }

    const randomIndex = Math.floor(Math.random() * this.getGamers().length);
    this.choosenOne = this.getGamers()[randomIndex] || new Gamer();
    return this.choosenOne;
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
    if (newLoop) {
      this.gamers.forEach(gamer => gamer.points = 0);
    }
    this.fase = (this.getTotalPoints() > 0 && !newLoop) ? 1 : 0;
    this.actualGamerIndex = 0;
    this.allGamersChoosen = false;
    this.personChoosen = new Person();
    this.loopQuestions = [];
    this.allQuestions = [];
    this.choosenOne = new Gamer();
    if (this.fase > 0) {
      this.configFase();
    }
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
    return this.gamers.filter(gamer => gamer.name.toLowerCase() === search.toLowerCase())[0];
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

  restartCountGamer() {
    this.allGamersChoosen = false;
    this.actualGamerIndex = 0
  }

  isAllGamersChoosen() {
    return this.allGamersChoosen;
  }

  numberOfGamersIsValid() {
    return this.getGamers().length > 2;
  }

  setLoopPerson() {
    this.peopleService.getAll().subscribe((people: Person[]) => {
      if (!people.length) {
        return;
      }

      this.people = people;

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

  getQtQuestions() {
    const qtGamers = this.getGamers().length;
    return qtGamers * ((qtGamers > 3) ? (qtGamers > 10 ? 1 : 2) : 3);
  }

  setLoopQuestions() {
    if (!this.getGamers().length) {
      return;
    }

    this.questionService.getAll().subscribe((questions: Question[]) => {
      if (!questions.length) {
        return;
      }

      this.allQuestions = questions;
      // Completanto com personagens
      this.allQuestions.forEach((question: Question)=>{
        this.questionService.getQuestion(question.id).subscribe((questionDetail: Question)=>{
          question.characters = questionDetail.characters;
        });
      });

      const questionShuffle = this.shuffleArray(questions);

      const qtQuestions = this.getQtQuestions();
      for (let i = 0; i < qtQuestions; i++) {
        if (i >= questionShuffle.length - 1) {
          break;
        }

        this.loopQuestions.push(questionShuffle[i]);
      }
    });
  }

  hasEnoughQuestions() {
    return this.getQtQuestions() == this.loopQuestions.length;
  }

  getLoopPerson() {
    return this.personChoosen;
  }

  getLoopQuestions() {
    return this.loopQuestions;
  }

  // Pega os personagens para que quem está fora do loop adivinhe
  getOutOfLoopPeople() {
    if (!this.people.length || !this.personChoosen.name.length) {
      return [];
    }

    let shuffled: Person[] = [];
    this.people.forEach((person: Person) => {
      if (shuffled.length < 4 && person.id != this.personChoosen.id) {
        shuffled.push(person);
      }
    });
    shuffled.push(this.personChoosen);

    return this.shuffleArray(shuffled);
  }

  getTip(): string {
    let tip: Question = new Question();

    if (!this.allQuestions) {
      return '';
    }

    this.shuffleArray(this.allQuestions).forEach((question: Question) => {
      if (tip.question == '' && (question?.characters?.some((person: Person) => person.id == this.personChoosen.id) || false)) {
        tip = question;
      }
    })

    return tip.question.replace('?', '.');
  }
}
