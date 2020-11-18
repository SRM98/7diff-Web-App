//tslint:disable
export let MongoClient = require("mongodb").MongoClient;
export let DB_USER = "203";
export let DB_PASSWORD = "equipe203";
export let DB_DB = "equipe_203_games";
export let DB_HOST = "ds223685.mlab.com";
export let DB_PORT = "23685";
export let DB_URL = "mongodb://" + DB_USER + ":" + DB_PASSWORD + "@" + DB_HOST + ":" + DB_PORT + "/" + DB_DB;
export const GAMES_COLLECTION: string = "games";
export const USERNAME_COLLECTION: string = "usernames"