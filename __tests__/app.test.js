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
    type: 'spokky ghost',
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
        type: 'spokky ghost',
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
});
