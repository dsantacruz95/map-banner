export class Map {
    name: string;
    disabled: boolean;
    winner: boolean;

    constructor(name: string, disabled: boolean = false, winner: boolean = false) {
        this.name = name;
        this.disabled = disabled;
        this.winner = winner;
    }
}