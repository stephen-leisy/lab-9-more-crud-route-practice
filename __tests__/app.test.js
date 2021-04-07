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
});
