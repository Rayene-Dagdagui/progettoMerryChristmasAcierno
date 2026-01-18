import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.css']
})
export class GameStatsComponent {
  @Input() playerScore: number = 0;
  @Input() computerScore: number = 0;

  // Calcola il totale di turni
  get totalRounds(): number {
    return this.playerScore + this.computerScore;
  }

  // Calcola la percentuale di vittoria
  get winPercentage(): number {
    if (this.totalRounds === 0) return 0;
    return Math.round((this.playerScore / this.totalRounds) * 100);
  }

  // Determina chi sta vincendo
  get leader(): string {
    if (this.playerScore > this.computerScore) return 'tu';
    if (this.computerScore > this.playerScore) return 'computer';
    return 'pareggio';
  }
}
