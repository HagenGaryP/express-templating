# Templating with EJS

EJS:
Embedded JavaScript templating.

This is used to make dynamic templates with JavaScript.

You need to tell Express which templating engine we want to use, so you have to specify EJS with the **.set() method**

[app.set() method documentation](https://expressjs.com/en/api.html#app.set)

### app.set(name, value)

Assigns setting name to value.
You may store any value that you want, but certain names can be used to configure the behavior of the server.
These special names are listed in the app settings table, ([see documentation for table](https://expressjs.com/en/api.html#app.set)).

Calling app.set('foo', true) for a Boolean property is the same as calling app.enable('foo'). Similarly, calling app.set('foo', false) for a Boolean property is the same as calling app.disable('foo').

Retrieve the value of a setting with app.get().

app.set('title', 'My Site')
app.get('title') // "My Site"


**NOTE: By default, when we create a new express app and we're using some view Engine,**
**Express is going to assume that our views templates exist in a directory called "views".**

You then want to make a new file in the views directory, and this file has the extension of .ejs

## Using the Express render method that is built-in for the response.  res.render()

res.render(view [, locals] [, callback])
Renders a view and sends the rendered HTML string to the client. Optional parameters:

* **locals**, an object whose properties define local variables for the view.
* **callback**, a callback function. If provided, the method returns both the possible error and rendered string, but does not perform an automated response. When an error occurs, the method invokes next(err) internally.
The view argument is a string that is the file path of the view file to render. This can be an absolute path, or a path relative to the views setting. If the path does not contain a file extension, then the view engine setting determines the file extension. If the path does contain a file extension, then Express will load the module for the specified template engine (via require()) and render it using the loaded module’s __express function.


For more information, see Using template engines with Express.

NOTE: The view argument performs file system operations like reading a file from disk and evaluating Node.js modules, and as so for security reasons should not contain input from the end-user.

The local variable cache enables view caching. Set it to true, to cache the view during development; view caching is enabled in production by default.

```
// send the rendered view to the client
res.render('index')

// if a callback is specified, the rendered HTML string has to be sent explicitly
res.render('index', function (err, html) {
  res.send(html)
})

// pass a local variable to the view
res.render('user', { name: 'Tobi' }, function (err, html) {
  // ...
})
```
