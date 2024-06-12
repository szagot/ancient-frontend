import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Fase0Component } from './fase0/fase0.component';
import { Fase1Component } from './fase1/fase1.component';
import { Fase2Component } from './fase2/fase2.component';
import { Fase3Component } from './fase3/fase3.component';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    Fase0Component,
    Fase1Component,
    Fase2Component,
    Fase3Component,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  constructor(public service: GameService){

  }

}
