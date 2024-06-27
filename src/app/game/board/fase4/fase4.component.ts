import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../../services/game.service';
import { Person } from '../../../models/person.model';
import { Gamer } from '../../../models/gamer.model';
import { Vote } from '../../../models/vote.model';

@Component({
  selector: 'app-fase4',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './fase4.component.html',
  styleUrl: './fase4.component.scss'
})
export class Fase4Component {
  outOfTheLoopPeople: Person[];
  votationFinished: boolean;
  showPeople: boolean;
  showGetOutOfLoop: boolean;
  votes: Vote[];
  actualGamer: Gamer;
  gamers: Gamer[];
  outOfLoopRight: boolean;
  totalRihtVotes: number;
  totalWrongVotes: number;
  bonusConceded: boolean;
  outOfTheLoopGamer: Gamer;
  activeNext: number;
  tip: string;
  showTip: boolean;
  qtTips: number;

  constructor(private service: GameService) {
    this.votationFinished = false;
    this.votes = [];
    this.service.restartCountGamer();
    this.actualGamer = this.service.getActualGamer();
    this.gamers = this.service.getGamers();
    this.outOfLoopRight = false;
    this.bonusConceded = false;
    this.showPeople = false;
    this.showGetOutOfLoop = false;
    this.totalRihtVotes = 0;
    this.totalWrongVotes = 0;
    this.activeNext = -1;
    this.showTip = false;
    this.tip = '';
    this.qtTips = 0;
    this.outOfTheLoopPeople = this.service.getOutOfLoopPeople();
    this.outOfTheLoopGamer = this.service.getChooseOutOfLoop();
  }

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

  nextGamer() {
    this.vote(this.actualGamer, this.activeNext);
    this.service.nextGamer();
    this.actualGamer = this.service.getActualGamer();
    this.activeNext = -1;
    document.querySelectorAll('.btn-primary')?.forEach((e) => { e.classList.remove('choose'); })
  }

  preVote(chosenIndex: number) {
    this.activeNext = chosenIndex;
    document.querySelectorAll('.btn-primary')?.forEach((e) => { e.classList.remove('choose'); })
    const gamer = document.getElementById(`gamer-${chosenIndex}`);
    if (gamer) {
      gamer.classList.add('choose');
    }
  }

  vote(gamer: Gamer, chosenIndex: number) {
    if (this.votationFinished) {
      return;
    }

    const choosen = this.gamers[chosenIndex];
    this.votes.push(new Vote(gamer, choosen));

    // Adiciona pontuação individual se o jogador escolheu corretamente quem está fora da rodada (exceto ele próprio)
    if (gamer.name != this.outOfTheLoopGamer.name) {
      if (choosen.name == this.outOfTheLoopGamer.name) {
        gamer.addPoints();
        this.totalRihtVotes++;
      } else {
        this.totalWrongVotes++;
      }
    }

    this.votationFinished = this.votes.length == this.gamers.length;
  }

  /**
   * Quem está fora do loop escolhe o personagem, e os pontos são distribuídos
   * 
   * @param outOfLoopPersonId ID do personagem escolhido pelo jogador fora da jogada
   */
  countingVotes(outOfLoopPersonId: number) {
    if (this.bonusConceded) {
      return;
    }

    this.outOfLoopRight = outOfLoopPersonId == this.service.getLoopPerson().id;
    if (this.outOfLoopRight) {
      this.outOfTheLoopGamer.addBonus(true);
    }

    // Concedento bonus
    this.gamers.forEach((gamer: Gamer) => {
      if (gamer.name == this.outOfTheLoopGamer.name) {
        if (this.totalWrongVotes > this.totalRihtVotes) {
          gamer.addPoints(true);
        }
      } else {
        if (this.totalRihtVotes > this.totalWrongVotes) {
          gamer.addBonus();
        }
      }
    });

    this.bonusConceded = true;

    // Efeitos
    const buttonClicked = document.getElementById(`person-${outOfLoopPersonId}`);
    const allButtons = document.querySelectorAll('.person');
    if (allButtons && buttonClicked) {
      allButtons.forEach((button) => {
        button.classList.remove('right', 'wrong');
        button.setAttribute('disabled', 'true');
        if (button.getAttribute('id') == `person-${this.service.getLoopPerson().id}`) {
          button.classList.add('isthis');
        }
      });
      buttonClicked.classList.add((this.outOfLoopRight) ? 'right' : 'wrong');
    }
  }

  showGetOutOfLoopGamer() {
    this.showGetOutOfLoop = true;
    this.setTip();
    setTimeout(() => {
      const element = document.getElementById('outOfTheLoop');
      if (element) {
        element.classList.add('hidden');
        setTimeout(() => {
          this.showPeople = true;
          setTimeout(() => {
            element.classList.remove('hidden');
          }, 100);
        }, 1000);
      } else {
        this.showPeople = true;
      }
    }, 2000);
  }

  setTip() {
    this.tip = this.service.getTip();
    this.qtTips++;
  }

  toggleTip() {
    if (this.qtTips > 1) {
      this.showTip = false;
      return;
    }

    this.showTip = !this.showTip;
    if (this.showTip) {
      this.setTip();
    }
  }
}
