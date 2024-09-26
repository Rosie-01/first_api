const bcrypt = require('bcrypt');

function hashPassword(raw_password) {
  try {
    const password = bcrypt.hashSync(raw_password, 10);
    return password;
  } catch (error) {
    console.log('Error occured hashing password ' + error.message);
    return null;
  }
}

function verifyPassword(raw_password, hashed_password) {
  try {
    return bcrypt.compareSync(raw_password, hashed_password);
  } catch (error) {
    console.log('Error with using bcrypt');
    return false;
  }
}

module.exports = {
    hashPassword,
    verifyPassword
}
// email,password
// test
// const plain_password = 'james204';
// //console.log(hashPassword(plain_password));
// // $2b$10$oUupjd0UCEOlwyt6nxumHuNo4EEE26sfLkamluA4OM.e6w6tONmxe
// console.log(
//   verifyPassword(
//     plain_password,
//     '$2b$10$oUupjd0UCEOlwyt6nxumHuNo4EEE26sfLkamluA4OM.e6w6tONmxe'
//   )
// );

// console.log(
//   verifyPassword(
//     'james204',
//     '$2b$10$oUupjd0UCEOlwyt6nxumHuNo4EEE26sfLkamluA4OM.e6w6tONmxe'
//   )
// );

// console.log(
//   verifyPassword(
//     '$2b$10$lnjkN6sYQRGwKAy3ZvDOMOG7hDy0EIzxxIYD2qCTRSFujmwEjzdGy',
//     '$2b$10$oUupjd0UCEOlwyt6nxumHuNo4EEE26sfLkamluA4OM.e6w6tONmxe'
//   )
// );


// create more function to login a user 
// it should take in email and password 
// use the User to find the user by the email,if the user does not exist take a statues : false , message: .........
// if the user exist verify the password using verification we created 
// if it is valid return statues : true, if not return : false
// handle ur error and export it out 
// 


//  2nd 
/* 
create a new model wallet 
the wallet should contain;
an address: string , 
balance : number 
user: which shold  be a reference to a user model (how to reference a model),
coin/asset enum which will be ether of this value [eth,btc.srp,ada]
*/