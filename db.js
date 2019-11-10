//Depart ID's

//2b399e04-132d-4e01-a64e-1471f6781486
//8396647e-ab17-44b1-99a8-3e7b12d485e1
//0dbf036f-1403-49bc-944e-2199364fe53a
//9d4eb09c-0868-4cdc-ad72-068925ed0c69

//USER ID's
//327af86c-9982-4eb0-be93-435f153af891
//478d1a60-6d19-46b2-ad7e-9c4cf9690c38
//f0dd7058-d25d-47cf-8f1a-981059b2b584

const pg = require("pg");

const { Client } = pg;
const client = new Client("postgres://localhost:5432/acme_users_department");
client.connect();

const SQL = `
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS department;
CREATE TABLE department (
    id UUID PRIMARY KEY, 
    name VARCHAR(255));
CREATE TABLE users(
    id UUID PRIMARY KEY,
    name VARCHAR(255),
    department_id UUID,
    FOREIGN KEY (department_id) REFERENCES department(id));
INSERT INTO department (id,name) values ('2b399e04-132d-4e01-a64e-1471f6781486','HR');
INSERT INTO department (id,name) values ('8396647e-ab17-44b1-99a8-3e7b12d485e1','Sales');
INSERT INTO department (id,name) values ('0dbf036f-1403-49bc-944e-2199364fe53a','Marketing');
INSERT INTO department (id,name) values ('9d4eb09c-0868-4cdc-ad72-068925ed0c69','IT');

INSERT INTO users (id,name,department_id) values ('327af86c-9982-4eb0-be93-435f153af891','foo','2b399e04-132d-4e01-a64e-1471f6781486');
INSERT INTO users (id,name,department_id) values ('478d1a60-6d19-46b2-ad7e-9c4cf9690c38','bar','2b399e04-132d-4e01-a64e-1471f6781486');
INSERT INTO users (id,name,department_id) values ('f0dd7058-d25d-47cf-8f1a-981059b2b584','baz','0dbf036f-1403-49bc-944e-2199364fe53a');
`;

const clientFunc = async () => {
  try {
    await client.query(SQL);
  } catch (e) {
    console.error("error", e);
  }
};

const findAllUsers = async () => {
  const response = await client.query("SELECT * FROM users");
  return response.rows;
};

const findAllDepartments = async () => {
  const response = await client.query("SELECT * FROM department");
  return response.rows;
};

module.exports = {
  clientFunc,
  findAllUsers,
  findAllDepartments
};
