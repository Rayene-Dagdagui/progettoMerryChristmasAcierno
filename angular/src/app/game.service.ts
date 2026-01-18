import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private scelte = ['sasso', 'carta', 'forbice'];
  public emoji = {
    'sasso': '🪨',
    'carta': '📄',
    'forbice': '✂️'
  };

  constructor() {}

  // Funzione per generare la scelta casuale del computer
  getComputerChoice(): string {
    const index = Math.floor(Math.random() * this.scelte.length);
    return this.scelte[index];
  }

  // Funzione che determina il vincitore
  determineWinner(playerChoice: string, computerChoice: string): 'win' | 'lose' | 'draw' {
    if (playerChoice === computerChoice) {
      return 'draw';
    }

    if (
      (playerChoice === 'sasso' && computerChoice === 'forbice') ||
      (playerChoice === 'carta' && computerChoice === 'sasso') ||
      (playerChoice === 'forbice' && computerChoice === 'carta')
    ) {
      return 'win';
    } else {
      return 'lose';
    }
  }
}
