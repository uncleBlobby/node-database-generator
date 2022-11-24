const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

let db = new sqlite3.Database('./db/inventory.db', (err) => {
    if (err){
        return console.error(err.message);
    }
    console.log(`Connected to the database file!`);
});

//db.run('drop table packaging;');
db.run('CREATE TABLE if not exists packaging(sku text, itemName text not null, category text, itemDescription text, comment text, qtyOnHand real, parQty real, uom text, costPerUnit real, currency text, totalCostInventory real, location text, supplier text, supplierSku text, supplier2 text, supplier2Sku text, quickbooksCat text, uuid text, dateCreated text, dateModified text)');

fs.readFile('./csv/linux-packaging.csv', 'utf-8', (err, data) => {
    if (err) {
        return console.error(err.message);
    }
    //console.log(data);
    //const newData = data.replace("\r\n", ",");
    
    //const dataArray = newData.split(",");

    //dataArray = dataArray.split("\r");
    console.log(data);

    const rows = data.split("\n");

    for (let i = 0; i < rows.length; i++){
        rows[i] = rows[i].split(",");
    }
    /*
    const removedNewline = data.replace(/\n/g, ",");
    const array = removedNewline.split(",");
    */
    console.log(rows);
    console.log(rows.length)
    for (let i = 0; i < rows.length; i++){
        console.log(rows[i].length)
        db.run(`insert into packaging(sku, itemName, category, itemDescription, comment, qtyOnHand, parQty, uom, costPerUnit, currency, totalCostInventory, location, supplier, supplierSku, supplier2, supplier2Sku, quickbooksCat, uuid, dateCreated, dateModified) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [rows[i][0], rows[i][1], rows[i][2], rows[i][3], rows[i][4], rows[i][5], rows[i][6], rows[i][7], rows[i][8], rows[i][9], rows[i][10], rows[i][11], rows[i][12], rows[i][13], rows[i][14], rows[i][15], rows[i][16], rows[i][17], rows[i][18], rows[i][19]], function(err) {
            if (err) {
                return console.error(err.message);
            }
            console.log(`rows have been inserted. check the data!`);
        })
    }
})

/*
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log(`Closed the database connection!`);
});
*/

