export class Gamer {
    name: string = '';
    points: number = 0;

    constructor(gamerName = '') {
        this.setName(gamerName);
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
