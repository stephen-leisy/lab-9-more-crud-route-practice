const pool = require('../utils/pool');

module.exports = class Monster {
    id;
    name;
    location;
    type;
    filmMonster;

    constructor(row) {
        this.id = row.id;
        this.name = row.monster_name;
        this.location = row.monster_location;
        this.type = row.monster_type;
        this.filmMonster = row.film_monster;
    }

    static async insert({ name, location, type, filmMonster }) {
        const {
            rows,
        } = await pool.query(
            'INSERT INTO monsters (monster_name, monster_location, monster_type, film_monster) VALUES ($1, $2, $3, $4) RETURNING *', [name, location, type, filmMonster]
        );
        return new Monster(rows[0]);
    }
}