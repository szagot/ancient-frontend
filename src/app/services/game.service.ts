import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  // TODO: voltar pra 0
  fase: number = 1;
  gamers: string[] = [''];
  actualGamer: number = 0;
  allGamersChoosen: boolean = false;

  constructor() { }

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

  getNextGamer() {
    if (!this.allGamersChoosen) {
      if ((this.actualGamer + 1) == this.getGamers().length) {
        this.allGamersChoosen = true;
      }

      return this.gamers[this.actualGamer++];
    }

    return '';
  }

  isAllGamersChoosen() {
    return this.allGamersChoosen;
  }

  numberOfGamersIsValid() {
    return this.getGamers().length > 3;
  }
}
