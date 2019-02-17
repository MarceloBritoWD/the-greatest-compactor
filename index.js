const fs = require('fs');
const archiver = require('archiver');
const extract = require('extract-zip');

if (process.argv.length <= 4) {
    console.error('Use Example: node index.js (compacta|descompacta) ./folderToCompact ./nameOfFile.zip');
    process.exit(-1);
}

const type = process.argv[4].split('.')[1];

if (type !== 'zip' || type !== 'tar') {
    console.error('Only zip and tar files are acepted.');
    process.exit(-1);
}

if (isCompactProcess() ) {
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


if (isUncompacProcess()) {
    
}

function isCompactProcess () {
    return process.argv[2] === 'compacta';
}

function isUncompacProcess () {
    return process.argv[2] === 'descompacta'
}