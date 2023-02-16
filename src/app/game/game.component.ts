import { Component, OnInit } from '@angular/core';
import { Game } from 'src/classes/game_class';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{
  cardStack = [0, 1, 2, 3];
  isCardPicked = false;
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
    this.isCardPicked = true;
  }
}
