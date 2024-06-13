import { Injectable } from '@angular/core';
import { Gamer } from '../models/gamer.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  fase: number = 0;
  setFase(fase: number) {
    this.fase = fase;
  }
  nextFase() {
    this.fase = (this.fase < 3) ? (this.fase + 1) : 0
  }
  getFase() {
    return this.fase;
  }

  gamers: Gamer[] = [];
  addGamer(gamer: Gamer) {
    if (!this.getGamer(gamer.id)) {
      this.gamers.push(gamer);
    }
  }
  getGamer(id: number) {
    return this.gamers.filter((gamer: Gamer) => { gamer.id == id });
  }
  getGamers() {
    return this.gamers;
  }

  constructor() { }
}
