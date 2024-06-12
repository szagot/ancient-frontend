import { Injectable } from '@angular/core';
import { Gamer } from '../models/gamer.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  // TODO: Iniciado controle de gamers
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
