# 📚 Spiegazione del Codice Angular - Sasso, Carta, Forbice

## 🏗️ Struttura del Progetto Angular

```
src/
├── index.html                      # File HTML principale
├── main.ts                         # Entry point dell'app
├── styles.css                      # Stili globali
└── app/
    ├── app.component.ts            # Componente principale (logica)
    ├── app.component.html          # Template del componente
    ├── app.component.css           # Stili del componente
    ├── game.service.ts             # Servizio del gioco
    ├── game-stats.component.ts     # Componente statistiche 🆕
    ├── game-stats.component.html   
    ├── game-stats.component.css
    ├── game-history.component.ts   # Componente storico 🆕
    ├── game-history.component.html
    └── game-history.component.css
```

---

## 🎯 I 3 Componenti

### 1️⃣ AppComponent - Il Componente Principale

**Ruolo**: Gestisce la logica principale del gioco

**Proprietà**:
- `playerScore`, `computerScore` - Punteggi
- `playerMove`, `computerMove` - Mosse attuali
- `resultMessage` - Messaggio di risultato
- `gameHistory: GameRound[]` - Array con la storia dei turni

**Metodi**:
- `play(choice: string)` - Esegue un turno
- `reset()` - Ricomincia il gioco
- `updateResultMessage(result)` - Aggiorna il messaggio

**Import**:
```typescript
import { GameHistoryComponent, GameRound } from './game-history.component';
import { GameStatsComponent } from './game-stats.component';

imports: [CommonModule, GameHistoryComponent, GameStatsComponent]
```

---

### 2️⃣ GameStatsComponent - Le Statistiche

**Ruolo**: Mostra statistiche del gioco

**@Input Properties**:
```typescript
@Input() playerScore: number = 0;
@Input() computerScore: number = 0;
```
- Riceve i punteggi dal componente padre (AppComponent)
- **@Input**: Significa che questi valori vengono passati da fuori

**Proprietà Calcolate**:
```typescript
get totalRounds(): number {
  return this.playerScore + this.computerScore;
}

get winPercentage(): number {
  if (this.totalRounds === 0) return 0;
  return Math.round((this.playerScore / this.totalRounds) * 100);
}

get leader(): string {
  if (this.playerScore > this.computerScore) return 'tu';
  if (this.computerScore > this.playerScore) return 'computer';
  return 'pareggio';
}
```
- **getter**: Funzione che calcola valori dinamicamente
- Si aggiornano automaticamente quando i punteggi cambiano

**Template**:
```html
<span class="value">{{ totalRounds }}</span>
<span class="value">{{ winPercentage }}%</span>
<span class="value leader" [ngClass]="leader">
  {{ leader === 'tu' ? '🏆 Tu' : leader === 'computer' ? '🤖 Computer' : '🤝 Pareggio' }}
</span>
```
- `[ngClass]` - Aggiunge classe CSS dinamicamente in base al valore di `leader`

---

### 3️⃣ GameHistoryComponent - Lo Storico

**Ruolo**: Mostra gli ultimi 5 turni

**@Input Property**:
```typescript
@Input() rounds: GameRound[] = [];
```
- Riceve l'array di turni da AppComponent

**Interface TypeScript** 🆕:
```typescript
export interface GameRound {
  playerChoice: string;      // Emoji della mossa del giocatore
  computerChoice: string;    // Emoji della mossa del computer
  result: 'win' | 'lose' | 'draw';  // Risultato del turno
}
```
- **interface**: Un contratto che definisce la forma di un oggetto
- Garantisce che ogni turno abbia questi 3 campi

**Proprietà**:
```typescript
get recentRounds(): GameRound[] {
  return this.rounds.slice(-5).reverse();
}
```
- **slice(-5)**: Prende gli ultimi 5 elementi
- **reverse()**: Li inverte (mostri più recenti in cima)

**Template**:
```html
<div *ngFor="let round of recentRounds" class="round-item" [ngClass]="round.result">
  <span class="emoji">{{ round.playerChoice }}</span>
  <span class="vs">vs</span>
  <span class="emoji">{{ round.computerChoice }}</span>
  <span class="badge" [ngClass]="round.result">
    {{ round.result === 'win' ? '✅' : round.result === 'lose' ? '❌' : '🤝' }}
  </span>
</div>
```
- ***ngFor**: Ciclo che ripete l'elemento per ogni turno
- **[ngClass]**: Applica classi CSS diverse per win/lose/draw

---

## 📄 src/index.html - La pagina HTML

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```
- Rende il sito responsive e adatto ai dispositivi mobili

```html
<app-root></app-root>
```
- Componente radice di Angular. Qui Angular carica il componente AppComponent

---

## 🎯 src/main.ts - Entry Point

```typescript
bootstrapApplication(AppComponent)
```
- **bootstrapApplication**: Avvia l'applicazione Angular
- **AppComponent**: Carica il componente principale
- `.catch(err => console.error(err))`: Se c'è un errore, lo stampa in console

---

## 🛠️ src/app/game.service.ts - Il Servizio

Un **servizio** è una classe che contiene la logica riutilizzabile dell'applicazione.

### Decoratore Injectable
```typescript
@Injectable({
  providedIn: 'root'
})
export class GameService {
```
- **@Injectable**: Rende il servizio iniettabile (usabile nei componenti)
- **providedIn: 'root'**: Disponibile a livello globale dell'app

### Array e Oggetto
```typescript
private scelte = ['sasso', 'carta', 'forbice'];
public emoji = {
  'sasso': '🪨',
  'carta': '📄',
  'forbice': '✂️'
};
```
- **private**: Solo il servizio può accedervi
- **public**: Anche altri componenti possono accedervi

### Metodo getComputerChoice()
```typescript
getComputerChoice(): string {
  const index = Math.floor(Math.random() * this.scelte.length);
  return this.scelte[index];
}
```
- Genera un numero casuale tra 0 e 2
- Restituisce una scelta random dall'array
- **return type**: Restituisce una **string**

### Metodo determineWinner()
```typescript
determineWinner(playerChoice: string, computerChoice: string): 'win' | 'lose' | 'draw'
```
- **Parametri**: string | string
- **Tipi di ritorno**: può essere solo 'win', 'lose' o 'draw' (union type)
- **Logica**: uguali = pareggio, se vince il giocatore = win, altrimenti = lose

---

## 🎮 src/app/app.component.ts - Il Componente

Un **componente** è una classe TypeScript che gestisce la logica e i dati della pagina.

### Decoratore Component
```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
```
- **selector**: Tag HTML che rappresenta questo componente (`<app-root></app-root>`)
- **standalone: true**: Componente standalone (non ha bisogno di NgModule)
- **imports**: Moduli usati (CommonModule per ngIf, ngFor, ecc.)
- **templateUrl**: Percorso del file HTML
- **styleUrls**: Array di file CSS

### Proprietà del Componente
```typescript
playerScore: number = 0;
computerScore: number = 0;
playerMove: string = '-';
computerMove: string = '-';
resultMessage: string = 'Scegli una mossa!';
```
- Questi valori sono **reattivi**: quando cambiano, il template si aggiorna automaticamente
- **Two-way binding**: HTML legge questi valori

### Iniezione di Dipendenze
```typescript
constructor(private gameService: GameService) {}
```
- **constructor**: Metodo speciale che viene chiamato quando il componente nasce
- **private gameService**: Inietta il servizio nel componente
- Ora posso usare `this.gameService` in tutta la classe

### Metodo play()
```typescript
play(choice: string): void {
  const computerChoice = this.gameService.getComputerChoice();
  const result = this.gameService.determineWinner(choice, computerChoice);
  
  if (result === 'win') {
    this.playerScore++;
  } else if (result === 'lose') {
    this.computerScore++;
  }
  
  this.playerMove = this.gameService.emoji[choice as keyof typeof this.gameService.emoji];
  this.computerMove = this.gameService.emoji[computerChoice as keyof typeof this.gameService.emoji];
  
  this.updateResultMessage(result);
}
```
- **const**: Variabili locali che non si modificano
- **if/else if**: Controlla il risultato e aggiorna i punteggi
- **as keyof typeof**: Casting TypeScript per accedere all'oggetto emoji
- **this.playerScore++**: Incrementa di 1

### Metodo reset()
```typescript
reset(): void {
  this.playerScore = 0;
  this.computerScore = 0;
  this.playerMove = '-';
  this.computerMove = '-';
  this.resultMessage = 'Scegli una mossa!';
}
```
- **void**: La funzione non restituisce nulla
- Resetta tutte le variabili ai valori iniziali

---

## 📝 src/app/app.component.html - Il Template

Un **template** è il codice HTML che Angular usa per creare l'interfaccia.

### Interpolazione - {{ }}
```html
<p class="score">{{ playerScore }}</p>
```
- **{{ }}**: Mostra il valore della proprietà del componente
- Quando `playerScore` cambia, il testo si aggiorna automaticamente
- Si chiama **interpolazione**

### Event Binding - (click)
```html
<button (click)="play('sasso')">🪨 Sasso</button>
```
- **(click)**: Quando clicchi il bottone, esegui `play('sasso')`
- Puoi passare parametri alla funzione

### Esempio Completo
```html
<div class="choices mb-4">
  <button class="btn btn-choice btn-lg" (click)="play('sasso')">🪨 Sasso</button>
  <button class="btn btn-choice btn-lg" (click)="play('carta')">📄 Carta</button>
  <button class="btn btn-choice btn-lg" (click)="play('forbice')">✂️ Forbice</button>
</div>
```
- Tre bottoni che eseguono `play()` con parametri diversi
- Le classi Bootstrap forniscono lo stile

---

## 🎨 src/app/app.component.css - Stili Locali

I stili qui dentro si applicano SOLO a questo componente.

### Stili Base
```css
.card-title {
    color: #333;
    font-weight: bold;
}

.score {
    font-size: 2rem;
    font-weight: bold;
    color: #667eea;
    margin: 0;
}
```
- **color**: Colore del testo
- **font-weight: bold**: Testo più spesso (grassetto)
- **font-size**: Dimensione del testo

### Flexbox
```css
.choices {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
}
```
- **display: flex**: Usa il layout Flexbox
- **gap: 10px**: Spazio tra gli elementi
- **justify-content: center**: Centra gli elementi orizzontalmente
- **flex-wrap: wrap**: Se non entrano, vanno a capo

### Bottoni
```css
.btn-choice {
    background-color: #667eea;
    border: none;
    color: white;
    border-radius: 10px;
    transition: all 0.3s ease;
    flex: 1;
    min-width: 80px;
}

.btn-choice:hover {
    background-color: #764ba2;
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    color: white;
}

.btn-choice:active {
    transform: scale(0.98);
}
```
- **background-color**: Colore di sfondo
- **border-radius**: Angoli arrotondati
- **transition**: Transizione fluida
- **:hover**: Quando il mouse passa sopra
- **transform: scale()**: Ingrandisce o rimpicciolisce
- **:active**: Quando il bottone è premuto

### Media Queries per Responsività
```css
@media (max-width: 576px) {
    .btn-choice {
        font-size: 0.9rem;
    }

    .score {
        font-size: 1.5rem;
    }
}
```
- **@media (max-width: 576px)**: Su schermi piccoli (smartphone)
- Riduci font-size per adattarsi meglio

---

## 💾 package.json - Dipendenze

```json
"dependencies": {
  "@angular/core": "^17.0.0",
  "@angular/common": "^17.0.0",
  "@angular/platform-browser": "^17.0.0",
  "bootstrap": "^5.3.0",
  "rxjs": "^7.8.1",
  "zone.js": "^0.14.0"
}
```
- **@angular/core**: Core di Angular (componenti, servizi, decoratori)
- **@angular/common**: Direttive comuni (ngIf, ngFor, ecc.)
- **@angular/platform-browser**: Rendering su browser
- **bootstrap**: Libreria CSS per stili
- **rxjs**: Reactive programming (osservabili)
- **zone.js**: Zona.js per change detection

## 📋 Flusso del Gioco

1. **Utente clicca un bottone** → Chiama `(click)="play('sasso')"`
2. **Componente esegue play()** → Chiama `this.gameService.getComputerChoice()`
3. **Servizio sceglie a caso** → Usa Math.random()
4. **Componente determina il vincitore** → Chiama `this.gameService.determineWinner()`
5. **Aggiorna i punteggi** → Se vinto, `this.playerScore++`
6. **Template si aggiorna** → `{{ playerScore }}` mostra il nuovo valore
7. **Utente vede il risultato** → Il browser aggiorna la pagina automaticamente

---

## 🔄 Two-Way Binding (Reattività)

Quando modifichi una proprietà nel componente:
```typescript
this.playerScore = 10;
```

Il template si aggiorna automaticamente:
```html
<p>{{ playerScore }}</p>  <!-- Mostra "10" senza refresh! -->
```

Questo è il **potere di Angular**! ⚡

---

## ✅ Riepilogo Concetti Chiave

| Concetto | Descrizione |
|----------|-------------|
| **Servizio** | Logica riutilizzabile (GameService) |
| **Componente** | UI + logica (AppComponent) |
| **Template** | HTML con binding ({{ }}, (click)) |
| **Interpolazione** | {{ propertyName }} mostra valori |
| **Event Binding** | (click)="function()" esegue funzioni |
| **Iniezione Dipendenze** | constructor(private service: Service) |
| **Two-Way Binding** | Cambio dati → UI si aggiorna automaticamente |
| **Decoratori** | @Component, @Injectable, @Input, @Output |
| **Standalone** | Componente che non ha bisogno di NgModule |

---

## 🚀 Come Avviare

```bash
# Vai nella cartella Angular
cd angular

# Installa le dipendenze (solo la prima volta)
npm install

# Avvia il server di sviluppo
npm start

# Oppure
ng serve --open
```

Il browser si aprirà automaticamente su `http://localhost:4200` 🎮

---

## 💡 Concetti di TypeScript

### Types
```typescript
name: string = 'Marco';
age: number = 30;
isActive: boolean = true;
```

### Array
```typescript
const scelte: string[] = ['sasso', 'carta', 'forbice'];
```

### Oggetti
```typescript
const emoji: { [key: string]: string } = {
  'sasso': '🪨',
  'carta': '📄'
};
```

### Union Types
```typescript
function play(choice: 'sasso' | 'carta' | 'forbice'): void { }
```

### Return Types
```typescript
function getNumber(): number {
  return 42;
}

function sayHi(): void {
  console.log('Hi!');
}
```

---

## 📖 Risorse Utili

- [Angular Docs](https://angular.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Bootstrap Docs](https://getbootstrap.com/docs/)
- [RxJS Docs](https://rxjs.dev/)

Buon divertimento con Angular! 🎉
