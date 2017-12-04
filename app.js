// Initialize packages
var express        = require('express'),
app            = express(),
bodyParser     = require('body-parser'),
mongoose       = require('mongoose'),
flash          = require('connect-flash');    
passport       = require('passport'),
LocalStrategy  = require('passport-local'),
Campground     = require('./models/campground'),
Comment        = require('./models/comment'),
User           = require('./models/user'),
seedDB         = require('./seeds'),
methodOverride = require('method-override');

// Requiring routes
var commentRoutes    = require('./routes/comments'), 
campgroundRoutes = require('./routes/campgrounds'), 
indexRoutes      = require('./routes/index');

// Connect app to mongo and create db 'yelp_camp'
mongoose.connect('mongodb://localhost/yelp_camp', {useMongoClient: true}); 

// Seed the database 
// seedDB();

// Tell app to use method override for REST 
app.use(methodOverride('_method'));

// use flash
app.use(flash());

// Moment js 
app.locals.moment = require('moment');

// Passport configuration
app.use(require('express-session')({
secret: 'Kirino did nothing wrong',
resave: false,
saveUninitialized: false
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// Methods for reading the session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Set view engine to ejs 
app.set('view engine', 'ejs');

// Use body parser to get data from forms
app.use(bodyParser.urlencoded({extended: true}));

// Connect public directory for custom stylesheets
app.use(express.static(__dirname + '/public'));

// Middleware that adds the user information to all templates
app.use(getUser);

// Adds user to res.local
// res.local - An object that contains response local variables scoped to the request, and therefore available only to the view(s) rendered during that 
// request/response cycle (if any). Otherwise, this property is identical to app.locals
function getUser(req, res, next) {
res.locals.currUser = req.user;
res.locals.error = req.flash('error'); // add flash so that header can access it
res.locals.success = req.flash('success');
next();
}

app.use(indexRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use('/campgrounds', campgroundRoutes);

// Start listening at port 3000
app.listen(3000, function(req, res) {
console.log('Initializing YelpCamp app...');
});