import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Fase0Component } from './fase0/fase0.component';
import { Fase1Component } from './fase1/fase1.component';
import { Fase2Component } from './fase2/fase2.component';
import { Fase3Component } from './fase3/fase3.component';
import { GameService } from '../../services/game.service';
import { Fase4Component } from './fase4/fase4.component';
import { HelpComponent } from '../help/help.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    Fase0Component,
    Fase1Component,
    Fase2Component,
    Fase3Component,
    Fase4Component,
    HelpComponent,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  helpActive: boolean = false;

  constructor(public service: GameService){

  }

  toggleHelp(){
    this.helpActive = !this.helpActive;
  }

}
