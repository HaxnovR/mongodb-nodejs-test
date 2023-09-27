const express = require('express');
const req = require('express/lib/request');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// const connection = mongoose.createConnection('mongodb://127.0.0.1:27017').on('open', () => {
//     console.log('database Connected');
// }).on('error', () => {
//     console.log('database Error');
// });

mongoose.connect("mongodb://127.0.0.1:27017",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const UserSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        maxlength: 30,
        required: true,
      },
      salt: {
        type: String,
      },
      role: {
        type: Number,
        default: 0,
      },
      image: {
        type: String,
      },
    },
    { timestamps: true }
  );

const User = mongoose.model("temp", UserSchema);

const addUser = () => {
    const student = new User({
        name : 'Mayank',
        salt : (Math.random() + 1).toString(36),
        role : 1,
        image : 'test.png'
    });
    student.save().then(
            () => console.log("user added"), 
            (err) => console.log(err)
    );
}

    
app.get('/', (req, res) => {
    res.send("Test Server");
});

app.get('/addUser', (req, res) => {
    addUser();
    res.send("User Added");
    (err) => console.log(err);
})

app.get('/getAll', async (req, res) => {
    const allUsers = await User.find()
    res.status(200).send({
        data: allUsers,
        status: 'Success',
    });
});


app.listen(port, () => {
    console.log(`Listening on ${port}`);
});