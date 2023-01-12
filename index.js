const express = require('express');
const cors = require('cors');
const path = require('path');

const monk = require('monk');

const port = 3000;

// Connection URL
const url =  process.env.MONGO_URI || 'localhost:27017/submissions';

const db = monk(url);

let submissions = db.get('submissions');

db.then(() => {
  console.log('Connected correctly to server')
})

const app = express();


app.use('/', express.static(path.join(__dirname, 'issues')));

// app.use('/issues', express.static(path.join(__dirname, 'issues')));



app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {

})

app.post("/submissions", (req, res) => {
    const submission = {
        name: req.body.name.toString(),
        content: req.body.content.toString(),
        title: req.body.title.toString(),
        created: new Date()
    }
    console.log(submission);
    submissions
        .insert(submission)
        .then(created => {
            res.json(created);
        })
})

app.get("/submissions", (req, res) => {
    submissions
        .find()
        .then(submissions => {
            res.json(submissions);
        })
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})