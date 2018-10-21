// Module dependencies
const express = require('express');
const logger = require('morgan');
const path = require('path');
const session    = require('express-session');
const bodyParser = require('body-parser');
const createError = require('http-errors');
// const fileupload = require('express-fileupload'); // Bruges ved /billed_upload (uden resize)


const app = express();

// =====================================================================
// Indstillinger, som f.eks. bodyParser, views, session, osv.

//support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'webintegrator',
  rolling: true, // Holder liv i funktionen, så længe der er aktivitet på siden
	resave: false,
	saveUninitialized: true,
	cookie: { 
    secure: false, // false = http, true = https
    maxAge: 20 * 60 * 1000 } // Hvis ikke man er aktiv vil man blive logget af efter 20 minutter
}));

// =====================================================================
// Routes

require('./routes/site/index')(app); // forside
require('./routes/site/search')(app); // header

require('./routes/site/cykler')(app); // cykler-side
require('./routes/site/cykelType')(app); // cykler/type/:id-side
require('./routes/site/cyklen')(app); // cykel-side

require('./routes/site/udstyr')(app); // udstyrs-side
require('./routes/site/udstyrsKategori')(app); // udstyr/kategori/:id-side
require('./routes/site/udstyret')(app); // udstyr-side

require('./routes/site/kontakt')(app); // kontakt-side og footer
require('./routes/site/nyheder')(app); // nyheder-side
require('./routes/site/nyhederFlere')(app); // nyheder-side

require('./routes/admin/login')(app);
require('./routes/admin/index')(app);

require('./routes/admin/cykel_aktiver')(app);
require('./routes/admin/cykel_opret')(app);
require('./routes/admin/cykel_oversigt')(app);
require('./routes/admin/cykel_ret')(app);

require('./routes/admin/udstyr_aktiver')(app);
require('./routes/admin/udstyr_opret')(app);
require('./routes/admin/udstyr_oversigt')(app);
require('./routes/admin/udstyr_ret')(app);

require('./routes/admin/side_oversigt')(app);
require('./routes/admin/side_ret')(app);

require('./routes/admin/kontakt_ret')(app);
// =====================================================================
// Use 404 siden

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = 3002;
console.log(`Serveren kører på http://localhost:${port}`);
app.listen(port);