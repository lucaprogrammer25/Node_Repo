import * as fs from 'node:fs';
import { Buffer } from 'node:buffer';

const dataToWrite = "Contenuto del file";
const data = Buffer.from(dataToWrite, 'utf-8');

fs.writeFile('message.txt', data, function (error) {
  if (error) {
    console.error('Errore durante la scrittura del file:', error);
    return error;
  }
  console.log('Il file è stato salvato con successo!');
});
