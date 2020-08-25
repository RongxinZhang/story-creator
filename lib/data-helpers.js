// takes in number of char desired, generates a random string alpha-numerically
const generateRandomId = function(numOfChars) {
  const allChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomString = "";
  for (let i = 0; i < numOfChars; i++) {
    randomString += allChars[Math.floor(Math.random() * allChars.length)];
  }
  return randomString;
};

const getUserByEmail = function(email, db) {
  const queryString = `
  SELECT * FROM users
  WHERE users.email = ${email}
  ;`;

  db.query(queryString)
    .then(data => {
      return data.rows[0];
    })
    .catch(err => {
      console.log(err);
    })
}

module.exports = { 
  generateRandomId,
  getUserByEmail
};