import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-fase0',
  standalone: true,
  imports: [],
  templateUrl: './fase0.component.html',
  styleUrl: './fase0.component.scss'
})
export class Fase0Component {

  constructor(public service: GameService){

  }

}
