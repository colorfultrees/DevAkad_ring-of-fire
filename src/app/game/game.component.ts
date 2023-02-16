import { Component, OnInit } from '@angular/core';
import { Game } from 'src/classes/game_class';


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

  constructor() {}

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
      console.log('Game: ', this.game);
      
      setTimeout(() => {
        this.game.playedCard = this.currentCard;
        this.isCardPicked = false;
      }, this.PICK_CARD_ANIMATION_TIME);
    }
  }
}
