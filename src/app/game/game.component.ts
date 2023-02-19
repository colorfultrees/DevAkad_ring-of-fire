import { Component, OnInit } from '@angular/core';
import { Game } from 'src/classes/game_class';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { calcRandomNumber } from 'src/functions/aux_functions';


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
    if (!this.isCardPicked) {
      this.currentCard = this.game.cardStack.pop();
      this.isCardPicked = true;

      console.log(`aktuelle Karte: ${this.currentCard}`);
      
      setTimeout(() => {
        this.game.playedCard = this.currentCard;
        this.isCardPicked = false;

        console.log('Game: ', this.game);

        setTimeout(() => {
          this.game.currentPlayer++;
          this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        }, 500);
        
      }, this.PICK_CARD_ANIMATION_TIME);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      console.log('The dialog was closed', name);
      this.game.players.push({'name': name, 'img': calcRandomNumber(1, 5)});
    });
  }
}
