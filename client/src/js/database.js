import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Added logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // Create connection to DB
  const jateDb = await openDB("jate", 1);

  // create new transaction to DB
  const tx = jateDb.transaction("jate", "readwrite");

  // Open up the desired objectStore
  const store = tx.objectStore("jate");

  // use PUT to update database data
  const request = store.put({id: 1, value: content});

  // confirm request  
  const result = await request;
  // log added data
  console.log("Data saved to DB", result);
};

// Added logic for a method that gets all the content from the database
export const getDb = async () => {
  // create connection to DB
  const jateDb = await openDB("jate", 1);

  // create new transaction to DB
  const tx = jateDb.transaction("jate", "readonly");
  
  // Open up desired objectStore
  const store = tx.objectStore("jate");
  
  // use .GET to get entry from the database
  const request = store.get(1);
  // Confirm request
  const result = await request;
  // log data retrieved from DB
  console.log("data retrieved from DB",result.value);
  return result.value
}

initdb();
