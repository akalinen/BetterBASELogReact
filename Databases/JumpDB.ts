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

export const createDatabaseTables = (): void => {
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
export const insertJump = (
    jumpToInsert: JumpData,
    callback: (result: number | Error) => void
): void => {
    db.transaction(tx => {
        tx.executeSql(
            'insert into jumps (jumpToInsert.date, jumpToInsert.objectLocation) values (?, ?, ?, ?);',
            [jumpToInsert.jumpDate, jumpToInsert.objectLocation ?? ""],
            (_, result) => {
                console.log('===================');
                console.log('Successfully inserted jump with id: ' + result.insertId);
                if (result.insertId !== undefined) {
                    callback(result.insertId);
                } else {
                    callback(new Error('Insert failed: result.insertId is undefined'));
                }
            },
            (_, error) => {
                console.log('Failed to insert new jump: ' + error);
                callback(new Error(error.message)); // Wrap the SQLError in a new Error object
                return false;
            }
        );
    });
};


// Update an existing jump in the database
export const updateJump = (
    id: number,
    date: string,
    location: string,
    altitude: number,
    object_id: number,
    callback: (result: number | Error) => void
): void => {
    db.transaction(tx => {
        tx.executeSql(
            'update jumps set date = ?, location = ?, altitude = ?, object_id = ? where id = ?;',
            [date, location, altitude, object_id, id],
            (_, result) => callback(result.rowsAffected),
            (_, error) => {
                console.log('Failed to update jump: ' + error);
                callback(new Error(error.message)); // Wrap the SQLError in a new Error object
                return false;
            }
        );
    });
}

// Get the maximum value of "id" across all rows in the jumps table and return the value
export const getMaxJumpId = (callback: (result: number | Error) => void): void => {
    db.transaction(tx => {
        tx.executeSql(
            'select max(id) from jumps;',
            [],
            (_, result) => callback(result.rows._array[0]['max(id)']),
            (_, error) => {
                console.log('Failed to get max jump ID: ' + error);
                callback(new Error(error.message)); // Wrap the SQLError in a new Error object
                return false;
            }
        );
    });
}

// Delete a jump from the database
export const deleteJump = (
    id: number,
    callback: (result: number | Error) => void
): void => {
    db.transaction(tx => {
        tx.executeSql(
            'delete from jumps where id = ?;',
            [id],
            (_, result) => callback(result.rowsAffected),
            (_, error) => {
                console.log('Failed to update jump: ' + error);
                callback(new Error(error.message)); // Wrap the SQLError in a new Error object
                return false;
            }
        );
    });
}

// Query all jumps from the database
export const queryJumps = (
    callback: (result: Array<object> | Error) => void
): void => {
    db.transaction(tx => {
        tx.executeSql(
            'select * from jumps;',
            [],
            (_, result) => callback(result.rows._array),
            (_, error) => {
                console.log('Failed to query jump: ' + error);
                callback(new Error(error.message)); // Wrap the SQLError in a new Error object
                return false;
            }
        );
    });
}

// Delete the jumps and the objects database files
export const deleteDatabase = (
    callback: (result: number | Error) => void
): void => {
    db.transaction(tx => {
        tx.executeSql(
            'drop table jumps;',
            [],
            (_, result) => callback(result.rowsAffected),
            (_, error) => {
                console.log('Failed to delete database: ' + error);
                callback(new Error(error.message)); // Wrap the SQLError in a new Error object
                return false;
            });
    });
}

// Test the database functions
export const testDatabase = (): void => {

    createDatabaseTables();

    //create a TestJump object which is of type JumpData
    const testJump: JumpData = {
        id: 1,
        jumpNumber: 1,
        jumpDate: '2020-01-01',
        objectLocation: 'Test Location',
    };

    // Insert a new jump
    insertJump(testJump, (result) => {
        console.log('insertJump result: ' + result);
    });

    // Query all jumps
    queryJumps((result) => {
        //console.log('queryJumps result: ' + JSON.stringify(result));
        //console log the result of the query (an array) with newlines between each array element
        console.log('queryJumps result: ' + JSON.stringify(result).replace(/},/g, '},\n'));
    });


    // Update a jump
    updateJump(1, '2020-01-01', 'Test Location', 10000, 2, (result) => {
        console.log('updateJump result: ' + result);
    });

    // Delete a jump
    deleteJump(1, (result) => {
        console.log('deleteJump result: ' + result);
    });

    // // Delete the database
    // deleteDatabase((result) => {
    //     console.log('deleteDatabase result: ' + result);
    // });

}

// Run the database tests
//testDatabase();