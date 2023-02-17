import * as aux from "src/functions/aux_functions";

export class Game {
    private CARD_TYPES = ['clubs', 'diamonds', 'hearts', 'spade'];
    public players: any[] = [
        {
            name: 'Hans',
            img: 1
        },
        {
            name: 'Franz',
            img: 3
        },
        {
            name: 'Sabine',
            img: 4
        },
        {
            name: 'Christian',
            img: 2
        }
    ];
    public cardStack: string[] = [];
    public playedCard: string = '';
    public currentPlayer: number = 0;

    constructor() {
        this.CARD_TYPES.forEach(type => {
            for (let i = 1; i <= 13; i++) {
                this.cardStack.push(`${type}_${i}`);
            }
        })

        aux.shuffleArray(this.cardStack);
    }
}