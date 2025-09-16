import express from 'express';
import morgan from 'morgan';
import path, { dirname } from 'path';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';
import route from './routes/index.js';

// Tạo lại __dirname trong ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3005;

// static file
app.use(express.static(path.join(__dirname, 'public')));

// middleware
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

// HTTP logger
// app.use(morgan('combined'));

// template engine
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource/views'));

route(app); // router init

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
