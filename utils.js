module.exports = {
    isCompactProcess () {
        return process.argv[2] === 'compacta';
    },
    
    isUncompactProcess () {
        return process.argv[2] === 'descompacta'
    },

    inputVerifications() {
        if (process.argv.length <= 4) {
            console.error('Use Example: node index.js (compacta | descompacta) (./folderToCompact | ./zipFileToUncompact) (./nameOfFile.zip | ./nameOfFolderDestiny)');
            process.exit(-1);
        }

        if(this.isCompactProcess()) {
            const typeFileToGenerate = process.argv[4].split('.')[1];

            if (typeFileToGenerate !== ('zip' || 'tar')) {
                console.error('Only .zip and .tar files are accepted to be generated by this program.');
                process.exit(-1);
            }
        }        
    }
}