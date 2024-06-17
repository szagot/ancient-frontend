export class Gamer {
    name: string = '';
    points: number;

    constructor(gamerName = '', points = 0) {
        this.setName(gamerName);
        this.points = points;
    }

    setName(name: string) {
        this.name = name.replace(/\s+/, '');
    }

    // Pontos para queme stá fora da rodada: 25 * a quantidade dos demais jogadores.
    addPoints(isChoosenOne = false, qtGamers = 4) {
        const pointBase = 25;
        this.points += isChoosenOne ? ((qtGamers - 1) * pointBase) : pointBase;
    }

    isValidName() {
        return this.name.length > 1;
    }
}
