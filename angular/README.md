# 🎮 Sasso, Carta, Forbice - Angular

Un semplice gioco Sasso, Carta, Forbice realizzato con **Angular 17**.

## 📦 Installazione

```bash
# Installare le dipendenze
npm install

# Avviare il server di sviluppo
ng serve

# Aprire il browser
# http://localhost:4200
```

## 📁 Struttura del Progetto

```
angular/
├── src/
│   ├── app/
│   │   ├── app.component.ts       # Componente principale
│   │   ├── app.component.html     # Template
│   │   ├── app.component.css      # Stili
│   │   └── game.service.ts        # Servizio del gioco
│   ├── index.html                 # HTML principale
│   ├── main.ts                    # Entry point
│   └── styles.css                 # Stili globali
├── angular.json                   # Configurazione Angular
├── package.json                   # Dipendenze
└── tsconfig.json                  # Configurazione TypeScript
```

## 🎯 Come Giocare

1. Clicca su uno dei tre bottoni: **Sasso**, **Carta** o **Forbice**
2. Il computer sceglie a caso
3. Vedi il risultato e il nuovo punteggio
4. Clicca **Ricomincia** per resettare

## 📚 Leggere la Spiegazione

Vai al file `SPIEGAZIONE_ANGULAR.md` nella cartella radice per la documentazione completa.

## 🛠️ Tecnologie Usate

- **Angular 17** - Framework frontend
- **TypeScript** - Linguaggio di programmazione
- **Bootstrap 5** - Libreria CSS
- **RxJS** - Reactive programming

## ✨ Caratteristiche

- ✅ Componente Angular standalone
- ✅ Servizio con iniezione di dipendenze
- ✅ Responsive design
- ✅ Two-way binding reattivo
- ✅ Stili semplici e puliti
