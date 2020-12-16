# Express Templating with EJS

The whole point of using a Templating language or Templating Engine like EJS, is to be able to add logic and interpolate data.
Basically, to help fill out a scaffolding or blueprint.

EJS:
Embedded JavaScript templating. This is essentially "souped up" HTML.

[view EJS documentation](https://ejs.co/#docs)

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


### Using the Path module to tie path segments together

Problem: Can't work from different directories, since the "views" directory is set up to be "process.cwd()" (current working directory).

So, to fix this we would have to append views to where the file is located, index.js. Making views in that directory.

- path.join() takes multiple path segments and joins them together, and normalizes it into a single path.


</br>

## EJS Tags

| **TAG** |            **DESCRIPTION**                                             |
| ------- | ---------------------------------------------------------------------- |
| <%      |  'Scriptlet' tag, for control-flow, no output                          |
| <%_     |   ‘Whitespace Slurping’ Scriptlet tag, strips all whitespace before it |
| <%=     | Outputs the value into the template (HTML escaped)                     |
| <%-     |   Outputs the unescaped value into the template                        |
| <%#     |   Comment tag, no execution, no output                                 |
| <%%     |   Outputs a literal '<%'                                               |
| %>      |  Plain ending tag                                                      |
| -%>     |   Trim-mode ('newline slurp') tag, trims following newline             |
| _%>     |   ‘Whitespace Slurping’ ending tag, removes all whitespace after it    |

</br>

These tags are used like HTML.

Example: Outputting the value into the template (HTML escaped) - Treated as JavaScript.
```
<%=`Everything placed in here is treated as javascript`%>
```

</br>

Usually, the HTML escaped tag is for when we actually want to use data from a database or something, and it will be provided to the template.


## PASSING DATA TO TEMPLATES

Generally, we want to remove as much logic as possible from our templates, and make them as simplistic as possible.
They should just display things.

Consider the following example:

random.ejs
```
<h1>Your random number is: <%= Math.floor(Math.random() * 10) + 1 %> </h1>
```

index.js
```
app.get('/rand', (req, res) => {
  res.render('random');
})
```

The above example is NOT as simplistic as possible, since it still uses some logic.
So, instead, we can generate the number in another file (index.js), then pass it to the template.

</br>

The outcome of abstracting the logic into the index.js file is as follows:

random.ejs
```
<h1>Your random number is: <%= rand %> </h1>
```

index.js
```
app.get('/rand', (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  res.render('random', { rand: num });
})
```

The render method takes a 2nd argument which is an object of key-value pairs.
So, now the value of 'num' will be available in the template under the key named "rand".

</br>

### Conditionals in EJS

- The 'Scriptlet' tag, " <% // JS code here %> ", is for control-flow and it gives no output (does not render anything).

**Each line of JS that we write has to be wrapped in this tag, including both the opening and closing tags.**

Example:
```
<h1>Your random number is: <%= rand %> </h1>
  <% if (rand % 2 === 0) { %>
    <h2>That is an even number!</h2>
  <% } else { %>
    <h2>That is an odd number!</h2>
  <% } %>
```

This code could also be abstracted away into the index.js file where the res.render has access to it,
then rendered in the EJS file.

Another way to do this could be with the same tag using a ternary operator.

</br>

### Loops in EJS

You can write loops by using a combination of both the HTML escaping tag and the Scriptlet tag.

For example:
```
<h1>All of the Cats!</h1>
  <ul>
    <% for (let cat of cats) { %>
      <li> <%=cat %> </li>
    <% } %>
  </ul>
```

