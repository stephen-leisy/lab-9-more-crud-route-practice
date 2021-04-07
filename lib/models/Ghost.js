const pool = require('../utils/pool');

module.exports = class Ghost {
    id;
    name;
    type;
    scary;
    location;
    ghostAge;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.type = row.type;
        this.scary = row.scary;
        this.location = row.location;
        this.ghostAge = row.ghost_age;
    }

    static async makeNewGhost({ name, type, scary, location, ghostAge }) {
        const {
            rows,
        } = await pool.query(
            'INSERT INTO ghosts (name, type, scary, location, ghost_age) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, type, scary, location, ghostAge]
        );
        return new Ghost(rows[0]);
    }

    static async getAllGhosts() {
        const {
            rows,
        } = await pool.query(
            'SELECT * FROM ghosts'
        );
        return rows.map((row) => new Ghost(row));
    }
}