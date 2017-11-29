# YelpCamp
A full stack project for the final section of my first web development bootcamp.

## Stack used
a MEEN stack :) 
* MongoDB/Mongoose
* Express
* EJS (templating)
* NodeJS

## Project utilizes knowledge of...
* HTML/CSS
* Bootcamp
* Express
* Templating (ejs)
* RESTful Routing
* MongoDB/Mongoose
* Modeling using mongoose schemas
* Passport-Local authentication
* Authorization


## RESTful Routes
* (RE)presentational (S)tate (T)ransfer
    * A mapping between HTTP routes and CRUD

### CRUD
* CREATE
* READ
* UPDATE 
* DESTROY 

### RESTful Routes for Campground
| State  | Route                 | HTTP   | Summary                                |
|--------|-----------------------|--------|----------------------------------------|
| INDEX  | /campgrounds          | GET    | Display list of all campgrounds        |
| NEW    | /campgrounds/new      | GET    | Displays form to make a new campground |
| CREATE | /campgrounds          | POST   | Add new campground to db               |
| SHOW   | /campgrounds/:id      | GET    | Shows info about one campground        |
| EDIT   | /campgrounds/:id/edit | GET    | Shows edit form for campground         |
| UPDATE | /campgrounds/:id      | PUT    | Shows newly edited campground          |
| DESTROY| /campgrounds/:id      | DELETE | Deletes campground                     |

## Nested routing for comments
To add a comment, they will be related to the specific campground the user wants to comment on.
Therefore, our routs for comments will look like this:
* NEW       /campgrounds/:id/comments/new    GET
* CREATE    /campgrounds/:id/comments        POST

## Authorization
* User can only edit/delete his/her campground
* Hide/Show those edit/delete buttons

