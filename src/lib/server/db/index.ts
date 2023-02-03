import Database from 'better-sqlite3'

const db = new Database("./data/chinook.db", {verbose: console.log})