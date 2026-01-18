import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface GameRound {
  playerChoice: string;
  computerChoice: string;
  result: 'win' | 'lose' | 'draw';
}

@Component({
  selector: 'app-game-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-history.component.html',
  styleUrls: ['./game-history.component.css']
})
export class GameHistoryComponent {
  @Input() rounds: GameRound[] = [];

  // Mostra solo gli ultimi 5 turni
  get recentRounds(): GameRound[] {
    return this.rounds.slice(-5).reverse();
  }
}
