import FileSync from 'lowdb/adapters/FileSync';
import low from 'lowdb';

const adapter = new FileSync('./dataStore/db.json');

export const db = low(adapter);
