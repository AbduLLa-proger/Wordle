import fs from 'fs';
const fileName = 'example.txt';
const content = 'This is a sample text file';
fs.writeFile(fileName, content, (err) => {
    if (err) {
        console.error('Error writing file:', err);
    }
    else {
        console.log(`${fileName} was created successfully.`);
    }
});
//# sourceMappingURL=writeFile.js.map