import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-fase3',
  standalone: true,
  imports: [],
  templateUrl: './fase3.component.html',
  styleUrl: './fase3.component.scss'
})
export class Fase3Component {
  constructor(public service: GameService){

  }
}
