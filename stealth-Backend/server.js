const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const regex = require("regex")
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors())

let db = null;


let dbpath = path.join(__dirname, "db", "stealth.db");

const DbServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });

    app.listen(3001, () => {
      console.log("Server connected");
    });
  } catch (e) {
    console.log(`Error occurred: ${e.message}`);
    process.exit(1);
  }
};

DbServer();

app.post("/login/", async (request, response) => {
    let { email, password } = request.body;
  
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
  
    let userCheck = `SELECT * FROM users WHERE email = '${email}'`;
  
    try {
      let result = await db.get(userCheck);
  
      if (result) {
        const { password: storedPassword } = result;
  
        if (regex.test(password)) {
          if (password === storedPassword){
            payload = {email : email , userId : result.user_id}
            let jwtToken = jwt.sign(payload , 'PASSWORD')
            response.status(200)
            response.send({jwtToken : jwtToken})
         
          }
          else{
            response.send({error : 'Password does not matched'})
          }
        } else {
          response.send({ valid: false, message: 'Password does not meet the criteria' });
        }
      } else {
        response.status(404).send({ message: 'User not found' });
      }
    } catch (error) {
      response.status(500).send({ message: 'Internal server error' });
    }
});

app.post("/biz-login/", async (request, response) => {
  const { name, password } = request.body;

  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;

  try {
 
    const userCheck = `SELECT * FROM technicians WHERE name = '${name}'`;
    let result = await db.get(userCheck);

    if (result) {
      const { password: storedPassword, user_id } = result;

      if (regex.test(password)) {
        if (password === storedPassword) {

          const payload = { name: name, userId: user_id };
          const jwtToken = jwt.sign(payload, 'PASSWORD');

          response.status(200).send({ jwtToken });
        } else {
          response.status(401).send({ error: 'Password does not match' });
        }
      } else {
        response.status(400).send({ valid: false, message: 'Password does not meet the criteria' });
      }
    } else {
      response.status(404).send({ message: 'Business Person not found' });
    }
  } catch (error) {
    response.status(500).send({ message: 'Internal server error' });
  }
});




app.get("/locations/" , async (request , response) => {
  let getQuery = `SELECT name,location , available_town as availableTown from technicians`

  let result = await db.all(getQuery)
  response.send(result)

})
  
app.get("/featured-technicians/" , async (request , response) => {
  let getQuery = `SELECT name,photo,specialization,rating,description,repairing_items as repairingItems ,available_town as availableTown,location from technicians`

  let result = await db.all(getQuery)
  response.send(result)

})

app.get("/appliances/" , async (request , response) => {
  let getQuery = `SELECT id,type_name as typeName from appliance_types`

  let result = await db.all(getQuery)
  response.send(result)

})

module.exports = app;


