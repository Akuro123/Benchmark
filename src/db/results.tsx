import { openDatabaseSync } from "expo-sqlite";

const db = openDatabaseSync('mydb.db');

export const createResultsTable = () => {
    db.execAsync(
        `CREATE TABLE IF NOT EXISTS results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        game TEXT NOT NULL,
        score INTEGER NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );`
    ).then(()=> {
        console.log('Tabela results zostala utworzona ')
    }).catch(error =>{
        console.error("Blad tworzenia tabeli results",error)
    });
};
export const addResult = (userId:number,game:string,score:number) =>{
    db.runAsync(
        `INSERT INTO results (user_id , game ,score) VALUES (?, ?, ?)`,
        [userId,game,score]
    ).then(() =>{
        console.log('Wynik zostal zapisany');

    }).catch(error =>{
        console.error("blad zapisu wyniku",error)
    })
}

export const getUserResults = async (userId: number) =>{
    try{
        const results = await db.getAllAsync(
            `SELECT * FROM results WHERE user_id = ? ORDER BY timestamp DESC`,
            [userId]
        );
        return results
    }catch(error){
        console.error("Blad pobierania wynikow ",error)
        return [];
    }
};