import db from "../../data/dbConfig";

export async function findUserByLogin(email, password) {
  let res = await db("user").where({ email, password });
  console.log(res);
  if (res == false) {
    res = false;
  }
  return res;
}

export function findUserByEmail(email) {
  return db("user").where({ email });
}

export function findUser(id) {
  return db("user")
    .first()
    .where({ id });
}

export function findUsers() {
  return db("user");
}

export function createUser(user) {
  return db("user").insert(user);
}

export async function updateUser(id, updatedUser) {
  await db("user")
    .where({ id })
    .update(updatedUser);
  return db("user").where({ id });
}

export function deleteUser(id) {
  return db("user")
    .where({ id })
    .del();
}


export const allUsers = () => db('user');
