let fs =require('fs');

fs.createReadStream('./server/db/dbConfig.js').pipe(fs.createWriteStream('./dist/db/dbConfig.json'));
