/**
 * Path: database.js
 * This file defines the database schema and provides functions to interact with the database.
 * The database is implemented using SQLite via the Expo SQLite API.
 * 
 * The schema consists of two tables: 'jumps' and 'objects'. The 'jumps' table stores information
 * about each BASE jump, while the 'objects' table stores information about objects jumped from.
 * 
 * Functions are provided to insert, update, delete, and query records in both tables.
 * Tests are included to ensure proper functionality of the database operations.
 * 
 * Usage example:
 * - Import the database object into a component: import database from './database';
 * - Use database functions to interact with the database: database.insertJump(jumpData);
 */

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('jumps.db');

// Create the database tables if they don't already exist
db.transaction(tx => {
    tx.executeSql(
        'create table if not exists jumps (id integer primary key not null, date text, location text, altitude integer, object_id integer);'
    );
    tx.executeSql(
        'create table if not exists objects (id integer primary key not null, name text);'
    );
});

export const createDatabaseTables = () => {
    db.transaction(tx => {
        tx.executeSql(
            'create table if not exists jumps (id integer primary key not null, date text, location text, altitude integer, object_id integer);'
        );
        tx.executeSql(
            'create table if not exists objects (id integer primary key not null, name text);'
        );
    });
}

// Insert a new jump into the database
export const insertJump = (date, location, altitude, object_id, callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'insert into jumps (date, location, altitude, object_id) values (?, ?, ?, ?);',
            [date, location, altitude, object_id],
            (_, result) => {
                console.log('===================');
                console.log('Successfully inserted jump with id: ' + result.insertId);
                callback(result.insertId);
            },
            (_, error) => {
                console.log('Failed to insert new jump: ' + error);
                callback(error);
            }
        );
    });
}

// Update an existing jump in the database
export const updateJump = (id, date, location, altitude, object_id, callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'update jumps set date = ?, location = ?, altitude = ?, object_id = ? where id = ?;',
            [date, location, altitude, object_id, id],
            (_, result) => callback(result.rowsAffected),
            (_, error) => callback(error)
        );
    });
}

// Get the maximum value of "id" across all rows in the jumps table and return the value
export const getMaxJumpId = (callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'select max(id) from jumps;',
            [],
            (_, result) => callback(result.rows._array[0]['max(id)']),
            (_, error) => callback(error)
        );
    });
}

// Delete a jump from the database
export const deleteJump = (id, callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'delete from jumps where id = ?;',
            [id],
            (_, result) => callback(result.rowsAffected),
            (_, error) => callback(error)
        );
    });
}

// Query all jumps from the database
export const queryJumps = (callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'select * from jumps;',
            [],
            (_, result) => callback(result.rows._array),
            (_, error) => callback(error)
        );
    });
}

// Insert a new object into the database
export const insertObject = (name, callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'insert into objects (name) values (?);',
            [name],
            (_, result) => callback(result.insertId),
            (_, error) => callback(error)
        );
    });
}

// Update an existing object in the database
export const updateObject = (id, name, callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'update objects set name = ? where id = ?;',
            [name, id],
            (_, result) => callback(result.rowsAffected),
            (_, error) => callback(error)
        );
    });
}

// Delete an object from the database
export const deleteObject = (id, callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'delete from objects where id = ?;',
            [id],
            (_, result) => callback(result.rowsAffected),
            (_, error) => callback(error)
        );
    });
}

// Query all objects from the database
export const queryObjects = (callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'select * from objects;',
            [],
            (_, result) => callback(result.rows._array),
            (_, error) => callback(error)
        );
    });
}

// Delete the jumps and the objects database files
export const deleteDatabase = (callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'drop table jumps;',
            [],
            (_, result) => callback(result.rowsAffected),
            (_, error) => callback(error)
        );
        tx.executeSql(
            'drop table objects;',
            [],
            (_, result) => callback(result.rowsAffected),
            (_, error) => callback(error)
        );
    });
}
    


// Test the database functions
export const testDatabase = () => {
    
    createDatabaseTables();

    // Insert a new jump
    insertJump('2020-01-01', 'Test Location', 10000, 1, (result) => {
        console.log('insertJump result: ' + result);
    });
    
    // Insert a new object
    insertObject('Test Object', (result) => {
        console.log('insertObject result: ' + result);
    });
    
    // Query all jumps
    queryJumps((result) => {
        //console.log('queryJumps result: ' + JSON.stringify(result));
        //console log the result of the query (an array) with newlines between each array element
        console.log('queryJumps result: ' + JSON.stringify(result).replace(/},/g, '},\n'));
    });
    
    // Query all objects
    queryObjects((result) => {
        //console.log('queryObjects result: ' + JSON.stringify(result));
        //console log the result of the query (an array) with newlines between each array element
        console.log('queryObjects result: ' + JSON.stringify(result).replace(/},/g, '},\n'));
    });
    
    // Update a jump
    updateJump(1, '2020-01-01', 'Test Location', 10000, 2, (result) => {
        console.log('updateJump result: ' + result);
    });
    
    // Update an object
    updateObject(1, 'Test Object', (result) => {
        console.log('updateObject result: ' + result);
    });
    
    // Delete a jump
    deleteJump(1, (result) => {
        console.log('deleteJump result: ' + result);
    });
    
    // Delete an object
    deleteObject(1, (result) => {
        console.log('deleteObject result: ' + result);
    });

    // // Delete the database
    // deleteDatabase((result) => {
    //     console.log('deleteDatabase result: ' + result);
    // });

}

// Run the database tests
//testDatabase();