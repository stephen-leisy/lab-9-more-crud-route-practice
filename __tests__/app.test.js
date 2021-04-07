const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('lab-9-more-crud-route-practice routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  const testGhost = {
    name: 'slimer',
    type: 'slime ghost',
    scary: false,
    location: 'NYC',
    ghostAge: 44,
  };

  const anotherGhost = {
    name: 'spooooky',
    type: 'spooky ghost',
    scary: true,
    location: 'Your attic',
    ghostAge: 3,
  };

  it('adds a ghost to the ghosts table', async () => {
    const newGhost = await request(app).post('/api/v1/ghosts').send(testGhost);

    expect(newGhost.body).toEqual({
      id: expect.any(String),
      name: 'slimer',
      type: 'slime ghost',
      scary: false,
      location: 'NYC',
      ghostAge: 44,
    });
  });

  it('returns all ghosts', async () => {
    await request(app).post('/api/v1/ghosts').send(testGhost);
    await request(app).post('/api/v1/ghosts').send(anotherGhost);
    const allGhosts = await request(app).get('/api/v1/ghosts');

    expect(allGhosts.body).toEqual([
      {
        id: expect.any(String),
        name: 'slimer',
        type: 'slime ghost',
        scary: false,
        location: 'NYC',
        ghostAge: 44,
      },
      {
        id: expect.any(String),
        name: 'spooooky',
        type: 'spooky ghost',
        scary: true,
        location: 'Your attic',
        ghostAge: 3,
      },
    ]);
  });

  it('returns a single ghost by ID', async () => {
    const ghost = await request(app).post('/api/v1/ghosts').send(testGhost);

    const getGhost = await request(app).get(`/api/v1/ghosts/${ghost.body.id}`);

    expect(getGhost.body).toEqual(ghost.body);
  });

  it('modifies scary value on an existing ghost', async () => {
    const ghost = await request(app).post('/api/v1/ghosts').send(testGhost);

    const changedGhost = await request(app)
      .put(`/api/v1/ghosts/${ghost.body.id}`)
      .send({ scary: true });

    expect(changedGhost.body).toEqual({
      id: expect.any(String),
      name: 'slimer',
      type: 'slime ghost',
      scary: true,
      location: 'NYC',
      ghostAge: 44,
    });
  });

  it('deletes a ghost from the DB', async () => {
    const ghost = await request(app).post('/api/v1/ghosts').send(testGhost);
    await request(app).delete(`/api/v1/ghosts/${ghost.body.id}`);
    const deleteCheck = await request(app).get('/api/v1/ghosts');

    expect(deleteCheck.body).toEqual([]);
  });
});

describe('test routes for monsters', () => {
  beforeEach(() => {
    return setup(pool);
  });

  const testMonster1 = {
    name: 'creature',
    location: 'black lagoon',
    type: 'lagoon monster',
    filmMonster: true,
  };

  const testMonster2 = {
    name: 'Blob',
    location: 'anywhere',
    type: 'blob monster',
    filmMonster: true,
  };

  it('inserts a monster into the database', async () => {
    const newMonster = await request(app)
      .post('/api/v1/monsters')
      .send(testMonster1);

    expect(newMonster.body).toEqual({
      id: expect.any(String),
      name: 'creature',
      location: 'black lagoon',
      type: 'lagoon monster',
      filmMonster: true,
    });
  });

  it('returns all monsters', async () => {
    await request(app).post('/api/v1/monsters').send(testMonster1);
    await request(app).post('/api/v1/monsters').send(testMonster2);
    const allMonsters = await request(app).get('/api/v1/monsters');

    expect(allMonsters.body).toEqual([
      {
        id: '1',
        name: 'creature',
        location: 'black lagoon',
        type: 'lagoon monster',
        filmMonster: true,
      },
      {
        id: '2',
        name: 'Blob',
        location: 'anywhere',
        type: 'blob monster',
        filmMonster: true,
      },
    ]);
  });

  it('returns a single monster by ID', async () => {
    const monster = await request(app)
      .post('/api/v1/monsters')
      .send(testMonster1);

    const getMonster = await request(app).get(
      `/api/v1/monsters/${monster.body.id}`
    );

    expect(getMonster.body).toEqual(monster.body);
  });

  it('modifies name on an existing monster', async () => {
    const monster = await request(app)
      .post('/api/v1/monsters')
      .send(testMonster1);

    const changedMonster = await request(app)
      .put(`/api/v1/monsters/${monster.body.id}`)
      .send({ name: 'Harold' });

    expect(changedMonster.body).toEqual({
      id: expect.any(String),
      name: 'Harold',
      location: 'black lagoon',
      type: 'lagoon monster',
      filmMonster: true,
    });
  });

  it('deletes a monster from the DB', async () => {
    const monster = await request(app).post('/api/v1/monsters').send(testMonster1);
    await request(app).delete(`/api/v1/monsters/${monster.body.id}`);
    const deleteCheck = await request(app).get('/api/v1/monsters');

    expect(deleteCheck.body).toEqual([]);
  });
});
