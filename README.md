# Intro To
<br>
<img src="https://i.imgur.com/cD5R8OG.png">

### Learning Objectives

| Students Will Be Able To:           |
| ----------------------------------- |
| Describe the Use Case for Mongoose  |
| Define a Basic Schema for a Model   |
| Connect to a MongoDB Using Mongoose |
| Create Documents Using a Model      |
| Read Documents Using a Model        |
| Define Default Values in a Schema   |
| Define Validations in a Schema      |

## Road Map

1. Demo of the `mongoose-movies` Reference Application
2. Setup
3. Intro to Mongoose
4. Using a `.env` File to Protect "Secrets"
5. Including Mongoose in a Project
6. Defining Schemas in Mongoose
7. Built-in Types for Properties
8. Compiling Schemas into Models
9. Write a script to seed our database 
10. Review the 5-Step Process to Add a Feature to a Web App
11. Implement the `new` Functionality
12. Implement the `create` Functionality
13. Use a Model to Read Data
14. Implement `index` Functionality
15. Further Study
	- Defining Default Values for a Property
	- Defining Validations for a Property

## 1. Demo of the `mongoose-movies` Reference Application

As we continue to learn new development concepts and techniques during this unit we'll be incorporating them in a reference app named [Mongoose Movies](https://mongoose-movies-sei.herokuapp.com/movies).

## 2. Setup

We'll be learning about Mongoose over several lessons so a code-along repo has been set up to get started and to sync with if need be.

To get set up:

1. Move into the **labs** folder within your **GA** folder:
    ```
    cd ~/GA/labs
    ```
2. Clone the repo containing the starter code:
    ```
    git clone https://git.generalassemb.ly/sei-blended-learning/mongoose-movies.git
    ```
3. Move into the newly created project **mongoose-movies** folder:
    ```
    cd mongoose-movies
    ```
4. Install the Node modules:
    ```
    npm i
    ```
5. Open the project in VS Code:
    ```
    code .
    ```
6. Open an integrated terminal in VS Code (`control + backtick`) and spin up the server:
    ```
    nodemon
    ```

Browsing to `localhost:3000` we find that the starter code is a skeleton Express server created using express-generator and updated as follows:
- As a best practice, `app.js` has been renamed to `server.js`
- Partial templates (`header.ejs` & `footer.ejs`) have been set up

<img src="https://i.imgur.com/A2FjwUi.png">

## 3. Intro to Mongoose

### What is Mongoose?

Yes, this guy, but not in the context of MongoDB...

<img src="https://i.imgur.com/Y74xxoD.jpg" width="900">

[Mongoose](https://mongoosejs.com/) is software library called an **Object Document Mapper (ODM)** because it maps object-oriented JavaScript to MongoDB _documents_. ODMs are typically associated with NoSQL databases, while relational databases such as postgres and mySQL will typically utilize tools called ORMs(Object relational mappers). Keep in mind when we're using MongoDB we're using an ODM and when we're using postgres we'll be using an ORM.

### Why use Mongoose?

Mongoose is the goto when performing CRUD data operations on a MongoDB database.

Using Mongoose is easier and more productive than working directly with MongoDB.

As stated on Mongoose's homepage:

> "Mongoose provides a straight-forward, **schema-based** solution to model your application data..."_

Wait a minute, what's with this "schema" business, isn't MongoDB schema-less?  

Well, yes _MongoDB_ is, however, it turns out that the vast majority of applications benefit when their data conforms to a defined structure (schema).

In addition to ensuring that data conforms to schemas that we define Mongoose also provides lots of other useful functionality such as:

- Default property values
- Data validation
- Automatic related model population via the `populate` method
- _Virtual properties_ - create properties like "fullName" that are not persisted in the database
- Custom _Instance methods_ which operate on a document
- Custom _Static methods_ which operate on the entire collection 
- `pre` and `post` event lifecycle hooks (Mongoose "middleware")

### The Big Picture 

Here is a big picture overview of the purpose of Mongoose's **Schema** and **Model** components:

<img src="https://i.imgur.com/JHatEmH.png">

#### Big Picture Example 

Assume we need to store cat documents with the following schema:

```js
// Module: models/cat.js

const catSchema = new mongoose.Schema({
  name: String,
  breed: String
});
```

`catSchema` can then be compiled into a Model and that Model exported like this:

```js
// By convention, the name of the Model is singular and UpperCamelCased
module.exports = mongoose.model('Cat', catSchema);
```

Then, in our controller actions, we can require the `Cat` model and use it to perform CRUD on the `cats` collection in the MongoDB:

```js
// Again, convention is to name the Model's
// variable as singular and UpperCamelCased

const Cat = require('./models/cat');

try {
  const catDoc = await Cat.create({ name: 'Morris', breed: 'Orange Tabby' });
  console.log(catDoc);
} catch (err) {
  console.error(err);
}
```

### ❓ Review Questions

<details>
<summary>
(1) Describe the use case for Mongoose, i.e., <strong>what</strong> is it and <strong>why</strong> choose to use it?
</summary>
<hr>

**Mongoose is a JavaScript library known as an Object Document Mapper (ODM) and we'll want to use it any time a project is CRUDing a MongoDB database.**

<hr>
</details>

<details>
<summary>
(2) A Mongoose _________ is compiled into a Mongoose Model.

</summary>
<hr>

**Schema**

<hr>
</details>

<details>
<summary>
(3) We use a Mongoose _________ to perform CRUD operations on a particular MongoDB collection.
</summary>
<hr>

**Model**

<hr>
</details>

## 4. Using a `.env` File to Protect "Secrets"

A `.env` file is used to provide _environment_ variables (also called config vars).

Environment variables include the database's connection string and other secrets such as access tokens, etc.

Because they usually hold sensitive info, `.env` files should never be pushed to GitHub and thus need to be Git ignored.

We can do so by creating a `.gitignore` file at the root directory of our project:

```
touch .gitignore
```

And adding the `.env` file:

```
//I am the gitignore file

.env 
```

Environment variables can be used to configure an application's settings without changing the app's source code.

### Setting Up the `.env`

First, create a `.env` file in the project root:

```
touch .env
```

Install the `dotenv` Node module:

```
npm i dotenv
```

In **server.js**, require `dotenv` and call its `config()` method to "process" the `KEY=VALUE` pairs in the `.env`:

```js
// server.js

var logger = require('morgan');

// It's very important to require dotenv before any other module
// that depends upon the properties added to process.env 
require('dotenv').config();
```

Note that we're not assigning the returned value to a variable -  just simply coding `require('dotenv').config()` results in the `.env` file being "processed".

### Adding the Atlas MongoDB Connection String to the `.env`

Find and copy your [Atlas](https://www.mongodb.com/cloud/atlas) MongoDB connection string that you previously created and tucked away for safe keeping.

In the `.env` file, add a key of `DATABASE_URL` followed by an equals sign (`=`) then paste in your connection string with no spaces resulting in something like this:

```
DATABASE_URL=mongodb+srv://someuser:somepassword@cluster0-oxpsb.azure.mongodb.net/?retryWrites=true&w=majority
```

Note that every `KEY=VALUE` pair defined in `.env` will be available as a property on Node's `process.env` object, e.g., `process.env.DATABASE_URL`.


Next we need to insert the name of the database we want to create and connect to, `mongoose-movies` will work just fine for this project. Insert it between the `/?` characters like this:

```
DATABASE_URL=mongodb+srv://someuser:somepassword@cluster0-oxpsb.azure.mongodb.net/mongoose-movies?retryWrites=true&w=majority
```

> 👀 This might be a good time to  update your saved connection string in its new form for future use.  Just be sure to change the database name, e.g., change `/mongoose-movies?` to to `/another-db-name?` in your next project.

FYI, `nodemon` doesn't watch for changes in the `.env` file, so you may have to restart the server manually if you're not going to make some additional code changes.

## 5. Including Mongoose in a Project

To use Mongoose in our apps, we need to install and configure it...

### Install Mongoose

Installing the Mongoose module is straight forward:

```
npm i mongoose
```

> Reminder: `npm i` is a shortcut for `npm install`
	
### Connect to MongoDB using Mongoose in a module

We're going to create a separate module named `database.js` and put it in a folder named `config`:

```
mkdir config
touch config/database.js
```

Then in `database.js`, let's connect to a database named `movies`:

```js
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);
```
	
As you know, the code in a Node module doesn't execute until the module is required, therefore, to connect to the database, we'll require `database.js` in `server.js`:

```js
var logger = require('morgan');

require('dotenv').config();
// connect to the database with AFTER the config vars are processed
require('./config/database');
```

Again, there's no need to assign to a variable because we're not exporting anything useful.

### Verify the Connection 

Errors in the Express terminal - look closely, it's probably a failure to authenticate with Alas error - please double-check your connection string and its credentials.

No errors in the Express terminal?  Great!  However, wouldn't it be nice to know that our connection to our database was successful?  Sure it would...

### Adding event listeners to the Mongoose connection

The Mongoose connection object inherits from Node's `EventEmitter` which allows us to listen to defined events.

Let's listen to the `connected` event by modifying the `database.js` module as follows:

```js
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);
	
// shortcut to mongoose.connection object
const db = mongoose.connection;
	
db.on('connected', function() {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});
```

After saving, `nodemon` will restart the server and you should see the  _Connected to MongoDb..._ message in the Express terminal.

<details>
<summary>
👀 Do you need to sync your code?
</summary>
<hr>

**`git reset --hard origin/sync-1-connect-database`**

<hr>
</details>

## 6. Defining Schemas in Mongoose

Next, we're going to:

1. Create a module for the Schema/Model
2. Define a basic Schema for a `Movie` model

### Create a module for the Schema/Model

So, where are we going to put our app's schemas and models?

The MVC design pattern is all about code organization and it makes sense to organize modules that define schemas/models within a `models` folder:

```
mkdir models
touch models/movie.js
```

There will always be a module per Mongoose Model where:

1. We define the schema,
2. Compile the schema into a model, and
3. Export that model.

### Define a basic Schema for a `Movie` model

In the schema/model module, we will start with this code:

```js
const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;
```

Creating the shortcut to the `mongoose.Schema` class is optional but convenient when defining most schemas.

Now let's define the basic schema for the `Movie` Model:

```js
const Schema = mongoose.Schema;
	
const movieSchema = new Schema({
  title: String,
  releaseYear: Number,
  mpaaRating: String,
  cast: [String]
});
```

Note the `cast` property's type is an Array of Strings.

> Mongoose vocabulary: A **property** may also be referred to as a "**path**".

#### 👉 **YOU DO** - Define Another Schema Property <small>(1 min)</small>

1. Add an additional property named `nowShowing` with a type of `Boolean` (make sure that it's uppercased so that it refers to JavaScript's built-in `Boolean` object wrapper).

### Add the `timestamps` Option

Mongoose can automatically create `createdAt` and `updatedAt` fields to every document if we provide a second argument to the `Schema` constructor and set a `timestamps` property in it as follows:

```js
const movieSchema = new mongoose.Schema({
  ...
}, {
  timestamps: true
});
```

This really comes in handy to see when a resource was created, or modified, and also in cases where you want to sort resources based on when they were created, so it's recommended to pretty much add the `timestamps: true` option to all schemas that you define.

Awesome! We've defined a Mongoose schema!

As we progress toward learning more about Mongoose, we will be adding additional functionality to the `movieSchema`.

## 7. Built-in Types for Properties

Here are the eight built-in `schemaTypes` available:

- `String`: same as a javascript string
- `Number`: Holds 64-bit floating point by default.
- `Date`: Special object maintained by mongoose for handling Dates, does not behave like javascript Date object, see these docs for more on using [mongoose Dates](https://mongoosejs.com/docs/tutorials/dates.html) 
- `Boolean`: True/false data type, behaves the same as javascript boolean.
- `ObjectId`: This is a special class used by mongoDB for storing the object ID of a document. You can think of this as a key in a relational database. This object appears to be a string at times but it is in fact an object. Read up a bit on [mongoose ObjectId](https://mongoosejs.com/docs/schematypes.html#objectids)
- `Array`: Mongoose supports arrays of [schemaTypes](https://mongoosejs.com/docs/api/schema.html#schema_Schema-Types) and [subdocuments](https://mongoosejs.com/docs/subdocs.html), also known as nested documents, in mongoDB. Keep in mind this isn't a 1-1 with a typical javascript array.
- 


## 8. Compiling Schemas into Models

> Reminder: Models, not schemas are used to perform CRUD on a MongoDB collection.

Compiling a schema into a model is as easy as calling the `mongoose.model` method:

```js
const Schema = mongoose.Schema;
	
const movieSchema = new Schema({
  title: String,
  releaseYear: Number,
  mpaaRating: String,
  cast: [String],
  nowShowing: Boolean
}, {
  timestamps: true
});
	
// Compile the schema into a model and export it
module.exports = mongoose.model('Movie', movieSchema);
```

Again, there is a one-to-one mapping between Mongoose models and MongoDB collections.

By default, the collection in the database will be named as the pluralized version of the model in all lower-case.

Congrats on defining your first Mongoose schema and exporting its model!

<details>
<summary>
👀 Do you need to sync your code?
</summary>
<hr>

**`git reset --hard origin/sync-2-create-model`**

<hr>
</details>

## 9. Use a Model to Create Data in a Node REPL

Now that we have a model, we're ready to perform some CRUD.

First up is **creating** data!

We can use a Mongoose Model in two ways to create documents in the collection:

1. `const movie = new Movie(<object>)`, then`movie.save()`<br>-OR-

2. `Movie.create(<object>)`

The first way lets us have more control over how we change the object before saving it. This means we can do extra things like adjusting the data format or processing data in a way that suits our application's needs. It's helpful when we need more customization or validation before storing the data in the database.

The second approach is more simple in its syntax and provides built-in validation, so that we don't have to call the `.save()` method on the object in order to persist it in the database.  

#### Creating documents in a seed file 

Before writing the code in the app to create movies, let's do so in a seed file just to make sure our databae is configured correclty and our Movie model is working.  

Create a `seed.js` file at the root of the project directory and add the following:

```
require('dotenv').config();  // Necessary if connection string is in a .env file
require('./config/database');  // Execute the code to connect to the db 

const Movie = require('./models/movie');

// Define an async function to create the movie in the database 
const createMovie = async () => {
  try {

    const doc = await Movie.create({
      title: 'Star Wars - A New Hope',
      releaseYear: 1977,
      mpaaRating: "PG",
      cast: ["Mark Hamill", "Carrie Fisher", "Harrison Ford"],
      nowShowing: true
    });

    console.log("Done creating movie", doc);
  } catch (err) {
    console.error(err);
  }
};

// Call the async function
createMovie();
```

Run the file from the command line with `node seed.js` and check for the output: 

```js
Connected to MongoDB mongoose-movies at ac-8w7xip0-shard-00-02.bvo1sdn.mongodb.net:27017
Done creating movie {
  title: 'Star Wars - A New Hope',
  releaseYear: 1977,
  cast: [],
  _id: new ObjectId('65bdf6f099356af3a7ea84a5'),
  createdAt: 2024-02-03T08:18:56.222Z,
  updatedAt: 2024-02-03T08:18:56.222Z,
  __v: 0
}
```

Note that we did not provide a value for `nowShowing` so it was not created as a property in the document.

However, properties of type `Array`, are always initialized to empty arrays like `cast` was. This makes it convenient to start pushing performers into  it!

That was fun! Lets see how we can use<br>`new` + `save`<br>to create movie documents - but this time from within our app...

## 10. Review the 5-Step Process to Add a Feature to a Web App

Once again, here is the process we repeat over and over when adding a feature, including CRUD functionality, in a web app:

1. Determine the "proper" route (HTTP Method & Endpoint).  Use RESTful conventions whenever possible.
2. Add the UI (link and/or form) that will trigger the HTTP request that matches the route.
3. Define the route in the appropriate router module that will match the HTTP request and map it to the `<controller>.<method>` that will perform the desired functionality.
4. Add and code the controller action/function to perform any necessary CRUD, etc. and be sure to export it.
5. In the controller, in the case of a `GET` request, respond with `res.render` (optionally passing data to the view). Or, when data has been mutated (`POST`, `PUT` & `DELETE`) use a `res.redirect`. If rendering, code the view template if necessary.

## 11. Implement the `new` Functionality

#### Creating Data is sometimes a two-request process...

Remember, creating data functionality might be a two-request process:

1. First request displays a form for the user to enter the data (the `new` functionality/controller action)
2. Second request to submit the form to the server where the data is created (the `create` functionality/controller action)

Yup, the `new` & `create` actions are partners!

<details>
<summary>
❓ What other two controller actions are partners used to edit data?
</summary>
<hr>

`edit` + `update`

<hr>
</details>

### Displaying a `<form>` to enter a new movie  

#### Step 1 - Determine the "proper" route (HTTP Method & Endpoint)

Using our trusty [Routing Chart](https://gist.github.com/jim-clark/17908763db7bd3c403e6), we find that to display a `new.ejs` view with a form for entering movies, the proper route will be:

```
GET /movies/new
```

#### Step 2 - Add the UI

👉 **YOU DO** - Add a Navigation Hyperlink <small>(1 min)</small>

1. Inside of the existing `<nav>` element in **views/index.ejs**, add a hyperlink (`<a>` tag) that when clicked will result in the browser sending the HTTP request for the route we just identified above.

2. The hyperlink should display **New Movie**.

#### Step 3 - Define the route on the server

Express generator stubbed up a `users.js` route module that we will convert and use for the movies resource.

Rename the file to `movies.js`.

Due to the renaming, we'll need to make a couple of changes in `server.js`...

<details>
<summary>
❓ What two lines of code need to be updated? 
</summary>
<hr>

`var usersRouter = require('./routes/users');`
<br>and<br>
`app.use('/users', usersRouter);`

<hr>
</details>

Inside of `routes/movies.js`, let's code the route that maps the HTTP request to the `new` action:

```js
const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const moviesCtrl = require('../controllers/movies');
	
// GET /movies/new
router.get('/new', moviesCtrl.new);
	
module.exports = router;
```

#### Step 4 - Add the controller action/method and be sure to export it

👉 **YOU DO** - Create the **movies** Controller <small>(3 mins)</small>

**Create the controller module, export the `new` action and stub up the `newMovie` function** - we've done this quite a few times already so do your best not to look below...

1. Create the `controllers/movies.js` module.

2. The `new` action is just the first of several that are going to be exported from this module:

	```js
	module.exports = {
	  new: newMovie
	};
	```
	Remember, we can't name a function `new` because it's a reserved word, but `newMovie` works!

3. Stub up the `newMovie` function:

	```js
	const newMovie = (req, res) => {
    		// render the new template 
	}
	```

#### Code the controller action/method

There's no CRUD to perform in this `new` action, we just need to render a **new.ejs**:

```js
const newMovie = (req, res) => {
	res.render('movies/new');
}
```

#### Step 5 -  Create the View

Now we need the `new.ejs` view.

As we've discussed, organizing views for a data resource into a dedicated folder makes sense.  In Terminal:

```
mkdir views/movies
touch views/movies/new.ejs
```

Copy and paste the following awesome but ugly form, then we'll review it...

```html
<h2>Enter a New Movie</h2>
<form action="/movies" method="POST">
  <label>Title:
    <input type="text" name="title">
  </label><br>
  <label>Release Year:
    <input type="number" name="releaseYear">
  </label><br>
  <label>MPAA Rating
    <select name="mpaaRating">
      <option value="G">G</option>
      <option value="PG">PG</option>
      <option value="PG-13">PG-13</option>
      <option value="R">R</option>
    </select>
  </label><br>
  <label>Cast (separate actors with commas):
    <input type="text" name="cast">
  </label><br>
  <label>Now Showing:
    <input type="checkbox" name="nowShowing" checked>
  </label><br>
  <button type="submit">Add Movie</button>
</form>
```

#### Test the `new` Functionality 

Clicking the **New Movie** link should now display

<img src="https://i.imgur.com/licUlYF.png">

<details>
<summary>
👀 Do you need to sync your code?
</summary>
<hr>

**`git reset --hard origin/sync-3-new-functionality`**

<hr>
</details>

## 12. Implement the `create` Functionality 

Here we go again...

#### Step 1 - Determine the "proper" route (HTTP Method & Endpoint)

Note that we've already set the `action` & `method` attributes to match the proper RESTful route to submit the form to.

**Identify the HTTP Method and Endpoint**

#### Step 2 - Add the UI

✅ Yep, we already have the `<form>` that is going to trigger the request.

#### Step 3 - Define the route on the server

Define the create route in **routes/movies.js**:

```js
// GET /movies/new
router.get('/new', moviesCtrl.new);
// POST /movies
router.post('/', moviesCtrl.create);
```

#### Step 4 - Add and code the controller action/method and be sure to export it

The next step is to stub up and export that `create` controller action in **controllers/movies.js**:

```js
module.exports = {
  new: newMovie,
  create
};

function create(req, res) {

}
```

We're going to be using our `Movie` model, so we need to require it at the top:

```js
const Movie = require('../models/movie');
```

Now let's write the code that will use the `Movie` Model to create the movie submitted by the form - we'll review it as we type it...

```js
const create = async(req, res) => {
    try {
        
	//In this code, the double negation (!!) is used to convert the value of req.body.nowShowing 
	//to a boolean. The reason for this is that HTML forms, when submitting a checked checkbox, 
        //send the value as the string "on." By using !!, it's converted to a boolean value:
        req.body.nowShowing = !!req.body.nowShowing;

	// Check if cast is provided and not an empty string
	if (req.body.cast) {
	  // Remove any whitespace at the start and end of cast
	  req.body.cast = req.body.cast.trim();
	  // Split cast into an array using a regular expression as a separator
	  req.body.cast = req.body.cast.split(/\s*,\s*/);
	}

	const movie = new Movie(req.body);

	// Additional processing before saving to the database
	if (movie.title) {
	  // Example: Convert the title to uppercase before saving
	  movie.title = movie.title.toUpperCase();
	}

        await movie.save();
        console.log(movie);
        // for now, redirect right back to new.ejs
        res.redirect('/movies/new');
      } catch (err) {
        console.error(err);
        res.redirect('/movies/new');
      }
}
```

The following line of code `if (req.body.cast) req.body.cast = req.body.cast.split(/\s*,\s*/);` uses something called a regular expression.  

Regular expressions (regex or regexp) are patterns used for matching character combinations in strings. They are a powerful tool for string manipulation and searching.  We won't touch on them in-depth, but let's look at what the above regex pattern `/\s*,\s*/` is doing. 

`\s*,\s*` is a regular expression that matches zero or more whitespace characters `\s*` followed by a comma `,`, and then zero or more whitespace characters again `\s*`. This pattern is designed to split a string around commas while accounting for potential whitespace before or after the commas.

For a great tool to help you understand regular expressions, check out the website [Regexr.com](https://regexr.com/).

#### Step 5 -  Redirect

We've already coded the `redirect` above and have no view to code.

#### Test the `create` Functionality 

You should now be able to submit movies - congrats!

Now that we've created a movie or two, let's see how we use Mongoose models to read documents from a MongoDB collection...

<details>
<summary>
👀 Do you need to sync your code?
</summary>
<hr>

**`git reset --hard origin/sync-4-create-functionality`**

<hr>
</details>

## 13. Use a Model to Read Data

The querying ability of Mongoose is **very** capable.  For example:

```js
Movie.find({mpaaRating: 'PG'})
  .where('releaseYear').lt(1970)
  .where('cast').in('Bob Hope')
  .sort('-title')
  .limit(3)
  .select('title releaseYear');
``` 

The above query builder syntax is unique to Mongoose and is not available in MongoDB.

Powerful?  Yes, but we're going to start with the basics!

### Useful Model methods to query for data 

Here are the common Model methods for querying data:

| Method     | Purpose                                                       | Syntax                                                           |
| ---------- | ------------------------------------------------------------- | ---------------------------------------------------------------- |
| `find`     | Returns an array of all documents matching the _query object_ | `Movie.find({mpaaRating: 'PG'})`    |
| `findById` | Find a document based on it's `_id`                           | `Movie.findById(req.params.id)`      |
| `findOne`  | Find the first document that matches the _query object_       | `Movie.findOne({releaseYear: 2000})` |

> Note: An empty query object, `{}`, selects ALL documents.

## 14. Implement `index` Functionality

💪 **Practice Exercise** - Implement the movies `index` functionality that displays the list of movies <small>(20 mins)</small>

1. Identify the RESTful route

2. Add the UI to trigger the request by adding a "All Movies" link next to the "New Movie" link we added to `views/index.ejs` previously.

3. Define the RESTful route

4. Stub up and export the movie controller's `index` action.

5. Code the `index` action to:
	- Use the `Movie` model to query for all movies.  As mentioned above, use an empty query object to retrieve all documents. 
	- Render a `movies/index.ejs` view, providing to it the movies just retrieved.

6. Create a **views/movies/index.ejs** view to display in an HTML table.  Here's most of the markup - please complete according to the comments:

    ```html
    <%- include('../partials/header') %>

    <h2>Movie List</h2>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Release Year</th>
          <th>Rating</th>
          <th>Cast</th>
          <th>Now Showing</th>
        </tr>
      </thead>
      <tbody>
        <!-- Write the line of EJS to iterate over movies using forEach -->
          <tr>
            <td><%= m.title %></td>
            <td><%= m.releaseYear %></td>
            <td><%= m.mpaaRating %></td>
            <td><%= m.cast.join(', ') %></td>
            <!-- finish the ternary expression to display
                          'Yes' or 'Nope' --> 
            <td><%= m.nowShowing ?  %></td>
          </tr>
        <!-- Close the forEach using EJS here -->
      </tbody>
    </table>

    <%- include('../partials/footer') %>
    ```

Now a quick refactor...

### Refactor the `create` Action's Redirect

Now that we have an `index` view, let's update the `redirect` in the `create` action:

```js
await movie.save();
console.log(movie);
res.redirect('/movies');
```

**Congrats on implementing `new` and `create` functionality!**

<details>
<summary>
👀 Do you need to sync your code?
</summary>
<hr>

**`git reset --hard origin/sync-5-index-functionality`**

<hr>
</details>


## 15. Further Study

### Defining Default Values for a Property

If a certain property is not provided when creating data, it's possible to specify in the schema a default value to use.

To add a default value, we need to switch from this simple property definition syntax:

```js
const movieSchema = new Schema({
  title: String,
  releaseYear: Number,
  ...
```

To this object syntax:

```js
const movieSchema = new Schema({
  title: String,
  releaseYear: {type: Number},
  ...
```

Now we can add a `default` key to specify a default value:

```js
const movieSchema = new mongoose.Schema({
  title: String,
  releaseYear: {type: Number, default: 2000},
  mpaaRating: String,
  cast: [String],
  nowShowing: {type: Boolean, default: false}
});
```

Silly example defaulting the release year to 2000 - yes. But that's how we can add a simple default value.

> Note that defaults for array types will not work - they require the use of Mongoose middleware to set default values.

Test it out in the app and we'll find that it didn't work for the `releaseYear` because `req.body.releaseYear` exists (albeit its value is an empty string) and this prevents the default from being assigned.

We can fix this in the `create` action by deleting any property in `req.body` that is an empty string:

```js
   if (req.body.cast) {
	// remove empty properties
        for (let key in req.body) {
            if (req.body[key] === '') {
                delete req.body[key];
            } 
        }
	  // Remove any whitespace at the start and end of cast
	  req.body.cast = req.body.cast.trim();
	  // Split cast into an array using a regular expression as a separator
	  req.body.cast = req.body.cast.split(/\s*,\s*/);
	}
```

Now if we don't type in a value in the form for the `releaseYear` property, the default of `2000` will be set.

#### Using a function to provide a default value

You've seen how to add a simple default value, but we can also provide a function as well.

The property's default would then be set to the value returned by the function!

For example, we can take our silly default for `releaseYear` and make it default to the current year like this:

```js
const movieSchema = new mongoose.Schema({
  title: String,
  releaseYear: {
    type: Number,
    default: function() {
      return new Date().getFullYear();
    }
  },
  mpaaRating: String,
  cast: [String],
  nowShowing: {type: Boolean, default: true}
}, {
  timestamps: true
});
```

### Defining Validations for a Property

Validations are used to prevent bogus data, i.e., data that does not conform to the schema, from being saved in the database.

There are several built-in validators we can use.

Movies should not be allowed to be created without a `title`.  Let's make it required:

```js
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  ...
```

Now, if we try saving a movie without a `title` a validation error will occur and the data will not be saved.

Looking at the `create` action, this error will result in the `new.ejs` view being rendered instead of redirecting to the movies list:

```js
res.redirect('/movies');
```

For properties that are of type _Number_, we can specify a `min` and `max` value:

```js
const movieSchema = new mongoose.Schema({
  ...
  releaseYear: {
    type: Number,
    default: function() {
      return new Date().getFullYear();
    },
    min: 1927
  },
  ...
```

Cool - no more silent movies!
	
For properties that are of type _String_, we have:

- **`enum`**: String must be in the provided list
- **`match`**: String must match the provided regular expression
- **`maxlength`** and **`minlength`**: Take a guess :)

Here is how we use the `enum` validator on the `mpaaRating` property:

```js
const movieSchema = new mongoose.Schema({
  ...
  mpaaRating: {
    type: String,
    enum: ['G', 'PG', 'PG-13', 'R']
  },
  ...
```

> Note:  Some of you may think the above validation is unnecessary because the user is restricted by the choices in the form's `<select>`, however, it's quite easy to bypass such client-side validation - so, it's always a good idea to validate on the server.

<details>
<summary>
👀 Do you need to sync your code?
</summary>
<hr>

**`git reset --hard origin/sync-6-finish-intro`**

<hr>
</details>

## References

- [Official MongooseJS Documentation](http://mongoosejs.com/)
