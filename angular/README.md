# 🎮 Sasso, Carta, Forbice - Angular

Un semplice gioco **Sasso, Carta, Forbice** realizzato con **Angular 17** con **3 componenti separati**.

## 📦 Installazione

```bash
# Installare le dipendenze
npm install

# Avviare il server di sviluppo
npm start

# Aprire il browser
# http://localhost:4200
```

## 📁 Struttura del Progetto

```
src/
├── app/
│   ├── app.component.ts           # Componente principale
│   ├── app.component.html         # Template principale
│   ├── app.component.css          # Stili principali
│   ├── game.service.ts            # Servizio del gioco
│   ├── game-history.component.ts  # Componente storico turni
│   ├── game-history.component.html
│   ├── game-history.component.css
│   ├── game-stats.component.ts    # Componente statistiche
│   ├── game-stats.component.html
│   └── game-stats.component.css
├── index.html                     # HTML principale
├── main.ts                        # Entry point
└── styles.css                     # Stili globali
```

## 🎯 I 3 Componenti

### 1. **AppComponent** (Principale)
- Gestisce la logica del gioco
- Bottoni Sasso, Carta, Forbice
- Punteggi e risultati

### 2. **GameStatsComponent** (Statistiche)
- Mostra turni totali
- Percentuale di vittorie
- Chi sta vincendo

### 3. **GameHistoryComponent** (Storico)
- Ultimi 5 turni giocati
- Risultato di ogni turno
- Colori diversi per win/lose/draw

## 🎮 Come Giocare

1. Clicca su uno dei tre bottoni: **Sasso**, **Carta** o **Forbice**
2. Il computer sceglie a caso
3. Vedi il risultato, punteggio, statistiche e storico
4. Clicca **Ricomincia** per resettare tutto

## 📚 Leggere la Spiegazione

Vai al file `SPIEGAZIONE_CODICE.md` per la documentazione completa.

## 🛠️ Tecnologie Usate

- **Angular 17** - Framework frontend
- **TypeScript** - Linguaggio di programmazione
- **Bootstrap 5** - Libreria CSS
- **RxJS** - Reactive programming

## ✨ Caratteristiche

- ✅ **3 Componenti Angular** separati
- ✅ **@Input Property Binding** tra componenti
- ✅ **TypeScript Interfaces** per type safety
- ✅ **Servizio Injectable** per logica condivisa
- ✅ **Responsive Design**
- ✅ **Statistiche Live**
- ✅ **Storico dei Turni**
- **Bootstrap 5** - Libreria CSS
- **RxJS** - Reactive programming

## ✨ Caratteristiche

- ✅ Componente Angular standalone
- ✅ Servizio con iniezione di dipendenze
- ✅ Responsive design
- ✅ Two-way binding reattivo
- ✅ Stili semplici e puliti
