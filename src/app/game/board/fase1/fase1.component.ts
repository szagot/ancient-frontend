import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fase1',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './fase1.component.html',
  styleUrl: './fase1.component.scss'
})
export class Fase1Component {
  constructor(private service: GameService) { }

  nextFase() {
    const btn = document.querySelector('.next');
    const board = document.querySelector('.board');

    // Efeitos
    btn?.classList.add('active');
    board?.classList.add('by');
    setTimeout(() => {
      this.service.nextFase();
      // Remoção de efeitos
      btn?.classList.remove('active');
      board?.classList.remove('by');
    }, 1000);
  }

  getGamers() {
    return this.service.getGamers();
  }

  removeGamer(index: number) {
    if (this.getGamers()[index]) {
      this.service.removeGamer(index);
    }
  }

  numberOfGamersIsValid() {
    return this.service.numberOfGamersIsValid();
  }

  onGamerChange(index: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const newValue = inputElement.value;
    inputElement.value = '';

    this.service.updateGamer(index, newValue);
    this.service.addGamer('');

    let lastInput = document.getElementById(`gamer-${index}`);
    if (lastInput) {
      lastInput.focus();
    }
  }
}
