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
      'INSERT INTO monsters (monster_name, monster_location, monster_type, film_monster) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, location, type, filmMonster]
    );
    return new Monster(rows[0]);
  }

  static async getAllMonsters() {
    const { rows } = await pool.query('SELECT * FROM monsters');
    return rows.map((row) => new Monster(row));
  }

  static async getAMonster(id) {
    const { rows } = await pool.query('SELECT * FROM monsters WHERE id = $1', [
      id,
    ]);
    return new Monster(rows[0]);
  }

  static async changeAMonster(id, name) {
    const {
      rows,
    } = await pool.query(
      'UPDATE monsters SET monster_name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    );
    return new Monster(rows[0]);
  }

  static async deleteAMonster(id) {
    const {
      rows,
    } = await pool.query('DELETE FROM monsters WHERE id = $1 RETURNING *', [
      id,
    ]);
    return new Monster(rows[0]);
  }
};
