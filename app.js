const createError = require( 'http-errors' );
const express = require( 'express' );
const session = require('express-session');
const exphbs = require( 'express-handlebars' )
const path = require( 'path' );
const cookieParser = require( 'cookie-parser' );
const logger = require( 'morgan' );
const mongoose = require( 'mongoose' );

mongoose.promise - global.Promise;
const app = express();

app.use(session({
  secret: 'angry taco',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}))

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.engine( 'handlebars', exphbs() );
app.set( 'view engine', 'handlebars' );

app.use( logger( 'dev' ) );
app.use( express.json() );
app.use( express.urlencoded( {
  extended: false
} ) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ) );


mongoose.connect( 'mongodb://localhost:27017/scraper', {
  useNewUrlParser: true
} );
mongoose.set( 'debug', true );
console.log('Mongoose connected.');

// Add Models
require('./models/Article');

// Add Routes
app.use( require(('./routes')) );

// catch 404 and forward to error handler
app.use( function ( req, res, next ) {
  next( createError( 404 ) );
} );

// error handler
app.use( function ( err, req, res, next ) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get( 'env' ) === 'development' ? err : {};

  // render the error page
  res.status( err.status || 500 );
  res.render( 'error' );
} );

module.exports = app;