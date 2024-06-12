import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-fase1',
  standalone: true,
  imports: [],
  templateUrl: './fase1.component.html',
  styleUrl: './fase1.component.scss'
})
export class Fase1Component {
  constructor(public service: GameService){

  }
}
