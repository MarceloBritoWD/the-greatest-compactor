const fs = require('fs');
const archiver = require('archiver');
const extract = require('extract-zip');
const utils = require('./utils');

utils.inputVerifications();

if (utils.isCompactProcess() ) {
    let folderToCompact = process.argv[3];
    let zipFileNameToCreate = process.argv[4];
    
    let output = fs.createWriteStream(zipFileNameToCreate);
    let compactor = archiver(zipFileNameToCreate.split('.')[1]);
    
    output.on('close', () => {
        console.log(compactor.pointer() + ' bytes totais!')
    })
    
    compactor.pipe(output);
    compactor.glob(folderToCompact + '/*');
    compactor.finalize();
}

if (utils.isUncompactProcess()) {

}