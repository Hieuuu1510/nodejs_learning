import express from 'express';
import morgan from 'morgan';
import path, { dirname } from 'path';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';
import route from './routes/index.js';
import { connect } from './config/db/index.js';
import dotenv from 'dotenv';
import methodOverride from 'method-override';

dotenv.config();

// Connect to DB
connect();

// Tạo lại __dirname trong ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3005;

// static file
app.use(express.static(path.join(__dirname, 'public')));

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('_method'));

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
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {
        const sortType = field === sort?.column ? sort?.type : 'default';

        const icons = {
          default: 'oi oi-elevator',
          asc: 'oi oi-sort-ascending',
          desc: 'oi oi-sort-descending',
        };
        const types = {
          default: 'desc',
          asc: 'desc',
          desc: 'asc',
        };

        const icon = icons[sortType];
        const type = types[sortType];

        return `<a href="?_sort&column=${field}&type=${type}">
                        <span class="${icon}"></span>
                    </a>`;
      },
    },
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));

route(app); // router init

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
