import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from './game.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Variabili per i punteggi
  playerScore: number = 0;
  computerScore: number = 0;

  // Variabili per le mosse
  playerMove: string = '-';
  computerMove: string = '-';

  // Variabile per il messaggio di risultato
  resultMessage: string = 'Scegli una mossa!';

  // Costruttore che inietta il servizio del gioco
  constructor(private gameService: GameService) {}

  // Funzione principale del gioco
  play(choice: string): void {
    // Il computer sceglie
    const computerChoice = this.gameService.getComputerChoice();

    // Determina il vincitore
    const result = this.gameService.determineWinner(choice, computerChoice);

    // Aggiorna i punteggi in base al risultato
    if (result === 'win') {
      this.playerScore++;
    } else if (result === 'lose') {
      this.computerScore++;
    }

    // Aggiorna le mosse visualizzate
    this.playerMove = this.gameService.emoji[choice as keyof typeof this.gameService.emoji];
    this.computerMove = this.gameService.emoji[computerChoice as keyof typeof this.gameService.emoji];

    // Aggiorna il messaggio di risultato
    this.updateResultMessage(result);
  }

  // Funzione per aggiornare il messaggio di risultato
  private updateResultMessage(result: string): void {
    if (result === 'win') {
      this.resultMessage = '🎉 Hai vinto questo turno!';
    } else if (result === 'lose') {
      this.resultMessage = '😔 Il computer ha vinto questo turno!';
    } else {
      this.resultMessage = '🤝 È un pareggio!';
    }
  }

  // Funzione per ricominciare il gioco
  reset(): void {
    this.playerScore = 0;
    this.computerScore = 0;
    this.playerMove = '-';
    this.computerMove = '-';
    this.resultMessage = 'Scegli una mossa!';
  }
}
