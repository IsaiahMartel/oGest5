import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IndexDBService {
  private db: IDBPDatabase<MyDB>

  constructor() {  this.connectToDb(); }


  async connectToDb() {
    this.db = await openDB<MyDB>('my-db', 3, {
      upgrade(db) {
        db.createObjectStore('notifications', {
          keyPath: "id", autoIncrement: true
      })
      }
    })
  }

  addNotification(notification) {
    return this.db.put('notifications', notification)
  }

 async  keys() {
  return (await this.db).getAll("notifications");
};
}



interface MyDB extends DBSchema {
  'notifications': {
    key: string;
    value: string;
  };
}