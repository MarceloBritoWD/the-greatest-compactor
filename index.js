const fs = require('fs');
const archiver = require('archiver');
const extract = require('extract-zip');
const utils = require('./utils');

utils.inputVerifications();

if (utils.isCompactProcess() ) {
    const folderToCompact = process.argv[3];
    const zipFileNameToCreate = process.argv[4];
    
    let output = fs.createWriteStream(zipFileNameToCreate);
    let compactor = archiver(zipFileNameToCreate.split('.')[1]);
    
    output.on('close', () => {
        console.info(`Finalizado, ${compactor.pointer()} bytes compactados!`);
    })
    
    compactor.pipe(output);
    compactor.glob(folderToCompact + '/*');
    compactor.finalize();
    
} else {
    const zipFileNameToUncompact = process.argv[3];
    const destinyOfFile = process.argv[4];

    extract(zipFileNameToUncompact, {dir: __dirname + '/' + destinyOfFile}, function (err) {
        console.error(err);
    })
}