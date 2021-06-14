import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import Router from './routes/router'
import * as express from 'express'
import {pagination} from 'typeorm-pagination'

const app = express()

app.use(express.json())

app.use('/', Router)
app.use(pagination)


createConnection().then(async() => {

    app.listen(8000, () => console.log('Server is running at http://localhost:8000'))

}).catch(error => console.log(error));
