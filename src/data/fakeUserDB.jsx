// src/data/fakeUserDB.js

let users = [];

export function addUser(user) {
  users.push(user);
}

export function getUsers() {
  return users;
}

export function findUser(username) {
  return users.find((u) => u.username === username);
}

export function checkLogin(username, password) {
  return users.find((u) => u.username === username && u.password === password);
}
