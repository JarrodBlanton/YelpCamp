# YelpCamp
A full stack project for the final section of my first web development bootcamp.

## Add Mongoose
* Setup campground model
* Use campground model inside of routes

## Show Page 
* Review RESTful routes

## RESTful Routes
(RE)presentational (S)tate (T)ransfer
A mapping between HTTP routes and CRUD

### CRUD
* CREATE
* READ 
* UPDATE
* DESTROY 

### RESTful Routes for Campground
* INDEX   /campgrounds       GET   display list of all campgrounds
* NEW     /campgrounds/new   GET   displays form to make a new campground
* CREATE  /campgrounds       POST  add new campground to db
* SHOW    /campgrounds/:id   GET   shows info about one campground

## Nested routing for comments
To add a comment, they will be related to the specific campground the user wants to comment on.
Therefore, our routs for comments will look like this:
* NEW       /campgrounds/:id/comments/new    GET
* CREATE    /campgrounds/:id/comments        POST

