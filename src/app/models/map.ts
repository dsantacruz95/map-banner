export class Map {
    id: string;
    name: string;
    disabled: boolean;
    winner: boolean;

    constructor(id: string, name: string, disabled: boolean = false, winner: boolean = false) {
        this.id = id;
        this.name = name;
        this.disabled = disabled;
        this.winner = winner;
    }
}