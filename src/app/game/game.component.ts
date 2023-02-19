import { Component, OnInit } from '@angular/core';
import { Game } from 'src/classes/game_class';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { calcRandomNumber } from 'src/functions/aux_functions';
import { DialogGameoverComponent } from '../dialog-gameover/dialog-gameover.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{
  PICK_CARD_ANIMATION_TIME = 1200;
  cardStack = [0, 1, 2, 3];
  isCardPicked = false;
  currentCard: string = '';
  gameOver: boolean = false;
  game: Game;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  pickCard() {
    if (!this.hasPlayers()) return;

    if (!this.isCardPicked) {
      this.setCurrentCard();
      this.isGameOver();
      
      setTimeout(() => {
        this.setPlayedCard();
        if (!this.gameOver) {
          setTimeout(() => {
            this.setCurrentPlayer();
          }, 500);
        }
      }, this.PICK_CARD_ANIMATION_TIME);
    }
  }

  hasPlayers() {
    if (this.game.players.length < 2) {
      this.openDialog();
      return false;
    }
    return true;
  }

  setCurrentCard() {
    this.currentCard = this.game.cardStack.pop();
    this.isCardPicked = true;
  }

  setPlayedCard() {
    this.game.playedCard = this.currentCard;
    this.isCardPicked = false;
  }

  setCurrentPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
  }

  isGameOver() {
    if (this.game.cardStack.length == 0) {
      this.gameOver = true;
      setTimeout(() => {
        this.openDialogGameOver();
      }, this.PICK_CARD_ANIMATION_TIME + 500)
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        this.game.players.push({'name': name, 'img': calcRandomNumber(1, 5)});
      }
    });
  }

  openDialogGameOver(): void {
    const dialogRef = this.dialog.open(DialogGameoverComponent);

    dialogRef.afterClosed().subscribe(() => {
      let playersAsString = JSON.stringify(this.game.players);
      this.gameOver = false;
      this.newGame();
      this.game.players = JSON.parse(playersAsString);
    });
  }
}
