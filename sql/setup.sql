DROP TABLE IF EXISTS ghosts;

CREATE TABLE ghosts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    scary BOOLEAN NOT NULL,
    location TEXT NOT NULL,
    ghost_age INTEGER CHECK (ghost_age > 0) NOT NULL
);

DROP TABLE IF EXISTS monsters;

CREATE TABLE monsters (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    monster_name TEXT NOT NULL,
    monster_location TEXT NOT NULL,
    monster_type TEXT NOT NULL,
    film_monster BOOLEAN NOT NULL
);