import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  // TODO: voltar pra 0
  fase: number = 1;
  setFase(fase: number) {
    this.fase = fase;
  }
  nextFase() {
    this.fase = (this.fase < 3) ? (this.fase + 1) : 0
  }
  getFase() {
    return this.fase;
  }

  gamers: string[] = [''];

  addGamer(gamer: string) {
    gamer = gamer.trim();
    if (!this.getGamerByName(gamer)) {
      this.gamers.push(gamer);
    }
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

  getGamers() {
    return this.gamers;
  }

  numberOfGamersIsValid() {
    return this.gamers.filter((gamer) => gamer.trim() !== '').length > 3;
  }

  constructor() { }
}
