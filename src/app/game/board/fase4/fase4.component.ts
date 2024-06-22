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
  votes: Vote[];
  actualGamer: Gamer;
  gamers: Gamer[];
  outOfLoopRight: boolean;
  totalRihtVotes: number;
  totalWrongVotes: number;
  bonusConceded: boolean;
  outOfTheLoopGamer: Gamer;
  activeNext: number;

  constructor(private service: GameService) {
    this.votationFinished = false;
    this.votes = [];
    this.service.restartCountGamer();
    this.actualGamer = this.service.getActualGamer();
    this.gamers = this.service.getGamers();
    this.outOfLoopRight = false;
    this.bonusConceded = false;
    this.totalRihtVotes = 0;
    this.totalWrongVotes = 0;
    this.activeNext = -1;
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
      console.log(gamer);
      gamer.classList.add('choose');
    }
  }

  vote(gamer: Gamer, chosenIndex: number) {
    if (this.votationFinished) {
      return;
    }

    const choosen = this.gamers[chosenIndex];
    const outOfLoop = this.service.getLoopPerson();
    this.votes.push(new Vote(gamer, choosen));

    // Adiciona pontuação individual se o jogador escolheu corretamente quem está fora da rodada (exceto ele próprio)
    if (gamer.name != outOfLoop.name) {
      if (choosen.name == outOfLoop.name) {
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
   * @param outOfLoopPerson ID do personagem escolhido pelo jogador fora da jogada
   */
  countingVotes(outOfLoopPerson: number) {
    this.outOfLoopRight = outOfLoopPerson == this.service.getLoopPerson().id;
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
  }
}
