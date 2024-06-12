import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-fase2',
  standalone: true,
  imports: [],
  templateUrl: './fase2.component.html',
  styleUrl: './fase2.component.scss'
})
export class Fase2Component {
  constructor(public service: GameService) {

  }
}
