import { Gamer } from "./gamer.model";

export class Vote {
    gamer: Gamer;
    choosen: Gamer;

    constructor(gamer: Gamer, choosen: Gamer) {
        this.gamer = gamer;
        this.choosen = choosen;
    }
}
