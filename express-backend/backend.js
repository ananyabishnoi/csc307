// backend.js

import express from "express";
import cors from 'cors';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = { 
   users_list :
   [
      { 
         id : 'xyz789',
         name : 'Charlie',
         job: 'Janitor',
      },
      {
         id : 'abc123', 
         name: 'Mac',
         job: 'Bouncer',
      },
      {
         id : 'ppp222', 
         name: 'Mac',
         job: 'Professor',
      }, 
      {
         id: 'yat999', 
         name: 'Dee',
         job: 'Aspring actress',
      },
      {
         id: 'zap555', 
         name: 'Dennis',
         job: 'Bartender',
      }
   ]
}
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}


app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    const index = users['users_list'].findIndex(user => user['id'] === id);
    if (index !== -1){
	deleteUser(index);
	res.status(200).end();
}
    else{
	res.status(404).send('Resource not found.');
}});

function deleteUser(index) {
     users['users_list'].splice(index, 1);
}

app.get('/users', (req, res) => {
    const job = req.query.job;
    if (job !== undefined) {
        let result = findUserByJob(job);
        res.send({ users_list: result });
    } else {
        res.send(users);
    }
});

const findUserByJob = (job) => {
    return users['users_list'].filter((user) => user['job'] === job);
}
app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(200).end();
});

function addUser(user){
    users['users_list'].push(user);
}
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  


    