const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const bodyParser = require('body-parser');
const { apiRoutes } = require('./routes/api');
const { clientRoutes } = require('./routes/clientRoutes');

const app = express();

app.use(expressLayouts);
app.set('layout', '_layout');
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', apiRoutes);
app.use('/', clientRoutes);

app.use((req, res) => {
    res.status(404).render('404', { layout: false });
});

exports.app = app;