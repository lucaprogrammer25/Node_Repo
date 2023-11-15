const crypto = require('crypto');

const randomBytes = crypto.randomBytes(16);
const randomID = randomBytes.toString('hex');


console.log('ID casuale:', randomID);