const express = require('express');
let Router = require('express-promise-router');
const handlebars = require('express-handlebars');
require('dotenv').config();
// db Connection w/ localhost
var db = require('knex')({
  client: 'pg',
  connection: {
    host: 'sql-exercises.20bits.com',
    user: 'student',
    password: 'sqlrocks123!',
    database: 'sql_exercises'
  }
});

let port = process.env.PORT || '3000';
const app = express();

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs',
  defaultLayout: 'index',
  partialsDir: __dirname + '/views/partials/',
  helpers: require('./expressHelpers'),
}));

app.use(express.static('public'))

let router = Router();
app.use(router);

router.get('/', async (request, response) => {
  response.render('main', { layout: 'index' });
});


router.get('/albums', async (request, response) => {
  let albums = await db.select('*').from('albums').orderBy('title', 'DESC');
  console.log(albums);
  response.render('albums', { layout: 'index', albums: albums, show: true });
});

router.get('/artists', async (request, response) => {
  let artists = await db.select('*').from('artists').orderBy('name', 'DESC');
  console.log(artists);
  response.render('artists', { layout: 'index', artists: artists, show: true });
});

router.get('/invoices/country-summary', async (request, response) => {
  let fieldToOrderBy = request.query.order_by || 'billing_country';
  let orderDirection = request.query.order_direction || 'ASC';

  let summaryData = await db
    .select('billing_country')
    .avg('total AS avg_total')
    .sum('total AS gross_total')
    .max('total AS max_total')
    .min('total AS min_total')
    .from('invoices')
    .groupBy('billing_country')
    .orderBy(fieldToOrderBy, orderDirection);

  response.render('invoices-country-summary', {
    pageTitle: `Invoice Summary By Country (${fieldToOrderBy} ${orderDirection})`,
    summaryData: summaryData,
    orderBy: fieldToOrderBy,
    orderDirection: orderDirection,
  });
});

app.listen(port, () => console.log(`App listening to port ${port}`));
