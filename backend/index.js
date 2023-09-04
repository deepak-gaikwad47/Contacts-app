import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import configuration from './src/configurations/config.js';
import contactRoute from './src/routes/contactRoute.js';
import connectDataBase from './src/libs/database.js';

const app = express();


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}));
app.use('/api', contactRoute)

app.get('/', (req, res) => {
    res.send('Express App');
});


function runServer(){
    const { port } = configuration;
    app.listen(port, () => {
    console.log(`App is running on port ${port}`)
    })
}

runServer();
connectDataBase();