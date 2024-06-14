import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  fase: number = 0;
  gamers: string[] = [''];
  actualGamer: number = 0;
  allGamersChoosen: boolean = false;

  constructor() {
    this.clearGamers();
  }

  setFase(fase: number) {
    this.fase = fase;
  }

  nextFase() {
    this.fase = (this.fase < 3) ? (this.fase + 1) : 0
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
    // TODO: Voltar para ['']
    this.gamers = ['Daniel', 'Alini', 'Filipe', 'Alejandro', ''];
    // Voltar para 0
    this.fase = 2;
    this.actualGamer = 0;
    this.allGamersChoosen = false;
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

    return this.gamers.filter((gamer) => gamer.trim() !== '');
  }

  getActualGamer() {
    return this.gamers[this.actualGamer];
  }

  nextGamer() {
    if (!this.allGamersChoosen) {
      if ((this.actualGamer + 1) >= this.getGamers().length) {
        this.allGamersChoosen = true;
      }

      this.actualGamer += (this.actualGamer >= this.getGamers().length) ? 0 : 1;
    }
  }

  isAllGamersChoosen() {
    return this.allGamersChoosen;
  }

  numberOfGamersIsValid() {
    return this.getGamers().length > 3;
  }
}
