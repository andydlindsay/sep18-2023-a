const bcrypt = require('bcryptjs');

// generate a salt
const salt = bcrypt.genSaltSync(10);

console.log('salt:', salt);

const password = '1234';

const hash = bcrypt.hashSync(password, salt);

console.log('hash:', hash);

const hashedPassword = '$2a$10$Sr4sc2xqVd9mx6Ba1cE4Bei9j80BOBZtgO7S2Tj.iAE8A1seqF/Ha';

const result = bcrypt.compareSync('1234', hashedPassword);

console.log('result:', result);
