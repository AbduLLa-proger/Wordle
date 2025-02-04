import fs from 'fs';

const fileName: string = 'example.txt';
const content: string = 'This is a sample text file';

fs.writeFile(fileName, content, (err: any) => {
  if (err) {
    console.error('Error writing file:', err);
  } else {
    console.log(`${fileName} was created successfully.`);
  }
});