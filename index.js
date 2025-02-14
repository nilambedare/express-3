//import express module
const express = require('express');
const app = express();

app.use(express.json());//middlware to parse json data

//sample user data
let users =[
    { id: 1, name:"alice", email:"abc@gmail.com"},
    { id: 2, name:"rose", email:"abcde@gmail.com"}
];

//get all users
app.get('/users',(req,res)=>{
    res.json(users); //fixed from res.join(users) to res.json(users)
});

//post -Add a new user
app.post('/users',(req,res)=>{
    const newUser = { id: users.length + 1,...req.body};
    users.push(newUser);
    res.status(201).json(newUser); // Added response after adding a new user
});

// PUT - Update a user
app.put('/users/:id',(req,res) =>{
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) return res.status(404).json({ message: "user not found"});
    
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    res.json(user);
});

//DELETE - Remove a user
app.delete('/users/id',(req,res) =>{
    //
    //
    users = users.filter(user => user.id !== parseInt(req.params.id));
    res.json({ message: 'user Deleted'});
});


app.listen(8000,() => console.log('server is running on port 8000'))