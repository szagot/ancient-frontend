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

    /**
     * Cada jogador recebe 25 pontos por acertar quem está fora da rodada.
     * O escolhido para estar fora da rodada recebe 50 pontos se a maioria não descobrir que ele está fora da rodada
     * 
     * @param choosenOne É o escolhido para estar fora da rodada?
     */
    addPoints(choosenOne = false) {
        this.points += choosenOne ? 50 : 25;
    }

    /**
     * Cada jogador recebe 100 pontos se a maioria descobrir quem está fora da rodada.
     * O escolhido para estar fora da rodada recebe recebe 125 pontos se advinhar o personagem.
     * 
     * @param choosenOne É o escolhido para estar fora da rodada?
     */
    addBonus(choosenOne = false) {
        this.points += choosenOne ? 125 : 100;
    }

    isValidName() {
        return this.name.length > 1;
    }
}
