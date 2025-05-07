import { openDatabaseSync } from 'expo-sqlite';


const db = openDatabaseSync('mydb.db');


export const createUsersTable = () => {
  db.execAsync(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );`
  ).then(() => {
    console.log('Tabela "users" została utworzona.');
  }).catch(error => {
    console.error('Błąd tworzenia tabeli:', error);
  });
};


export const addUser = (name: string, email: string, password: string) => {
  db.runAsync(
    'INSERT INTO users (name, email,password) VALUES (?, ?, ?)',
    [name, email, password]
  ).then(() => {
    console.log('Użytkownik dodany');
  }).catch(error => {
    console.error('Błąd dodawania użytkownika:', error);
  });
};


export const getUsers = async (): Promise<any[]> => {
  try {
    const result = await db.getAllAsync('SELECT * FROM users');
    return result;
  } catch (error) {
    console.error('Błąd pobierania użytkowników:', error);
    return [];
  }
};

export const loginUser = async(email : string, password : string):Promise<any | null> =>{
  try {
    const result = await db.getAllAsync(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email,password]
    );
    return result.length > 0 ? result[0] : null;
    } catch(error){
      console.error("Blad logowania",error)
      return null;
    }
};
