-- Connect to database
-- ssh chant1@rns203-6.cs.stolaf.edu
-- psql mca_f21 -h anansi.stolaf.edu
-- SET search_path = mca_f21_sched, chant1,public;
-- GRANT ALL ON TABLE event TO mca_f21_sched;

-- Child table ()
CREATE TABLE child (
  cid SERIAL PRIMARY KEY,
  fname character(20) NOT NULL,
  lname character(20) NOT NULL
);

-- Dummy Data
INSERT INTO child(fname, lname)
VALUES ('John', 'Smith');
INSERT INTO child(fname, lname)
VALUES ('Jane', 'Smith');

-- User table (only necessary data, connect to child table)
CREATE TABLE users (
  uid SERIAL PRIMARY KEY,
  fname character(20) NOT NULL,
  lname character(20) NOT NULL,
  type text NOT NULL CHECK (type = 'mentor' OR type = 'parent'),
  cid SERIAL REFERENCES child(cid)
);

-- Dummy Data
INSERT INTO users(fname, lname, type, cid)
VALUES ('Jaden', 'Chant', 'mentor', (SELECT cid FROM child WHERE fname = 'John' AND lname = 'Smith'));
INSERT INTO users(fname, lname, type, cid)
VALUES ('Aaron', 'Tamte', 'mentor', (SELECT cid FROM child WHERE fname = 'Jane' AND lname = 'Smith'));
INSERT INTO users(fname, lname, type, cid)
VALUES ('Ruben', 'Musayelyan', 'parent', (SELECT cid FROM child WHERE fname = 'John' AND lname = 'Smith'));
INSERT INTO users(fname, lname, type, cid)
VALUES ('Santi', 'Cruz', 'parent', (SELECT cid FROM child WHERE fname = 'Jane' AND lname = 'Smith'));


-- Event table (connect parent and mentor)
CREATE TABLE event (
  eid SERIAL PRIMARY KEY,
  muid SERIAL REFERENCES users(uid),
  puid SERIAL REFERENCES users(uid),
  activity text NOT NULL,
  descript text,
  location text NOT NULL,
  date varchar(10) NOT NULL 
  CHECK(date ~ '[0-9][0-9][0-9][0-9]\-[0-9]?[0-9]\-[0-9]?[0-9]'),
  stime varchar(4) NOT NULL
  CHECK(stime ~ '[0-2]?[0-9][0-5][0-9]'), 
  duration varchar(4) NOT NULL
  CHECK(duration ~ '[0-2]?[0-9][0-5][0-9]')
);

-- Dummy Data
-- Need to check muid.cid = puid.cid
-- Need to check muid.type is mentor
-- Need to check puid.type is parent
INSERT INTO event(muid, puid, activity, descript, location, date, stime, duration) VALUES ((SELECT uid FROM users WHERE fname = 'Jaden' AND lname = 'Chant' AND type = 'mentor'), (SELECT uid FROM users WHERE fname = 'Ruben' AND lname = 'Musayelyan' AND type = 'parent'), 'Walking', 'Walking around campus', 'St. Olaf College', '2021-12-22', '1100', '100');
INSERT INTO event(muid, puid, activity, descript, location, date, stime, duration) VALUES ((SELECT uid FROM users WHERE fname = 'Jaden' AND lname = 'Chant' AND type = 'mentor'), (SELECT uid FROM users WHERE fname = 'Ruben' AND lname = 'Musayelyan' AND type = 'parent'), 'Sledding', 'Sledding down Thorson', 'St. Olaf College', '2021-12-23', '1600', '200');
INSERT INTO event(muid, puid, activity, descript, location, date, stime, duration) VALUES ((SELECT uid FROM users WHERE fname = 'Aaron' AND lname = 'Tamte' AND type = 'mentor'), (SELECT uid FROM users WHERE fname = 'Santi' AND lname = 'Cruz' AND type = 'parent'), 'Sledding', 'Sledding down Thorson', 'St. Olaf College', '2021-12-23', '800', '100');

-- Add Event Query
INSERT INTO event (muid, puid, activity, descript, location, date, stime, duration) 
VALUES (1, (SELECT uid FROM users WHERE cid = (SELECT cid FROM users WHERE uid = 1) AND uid != 1), 'Sky Diving', 'Sky Diving out of an airplane', 'Carlton', '2021-4-5', '1200', '100');
