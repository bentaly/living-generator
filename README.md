# generator-livingapp 

> Living generator for [Yeoman](http://yeoman.io)

You'll need Yeoman for this. Then it's easy to create your Living app

## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
npm install -g yo
```

### How to get generator-livingapp?

Make sure you have Sass. To install Sass on Mac:

```bash
sudo gem install sass
```

For Windows go here to install Ruby: http://www.rubyinstaller.org/
before you start using Sass you will need to install Ruby. The installer will also install a Ruby command line powershell application that will let you use the Ruby libraries.

To install generator-livingapp, you need to clone this repo, navigate in the terminal or command line to this project and then type the below code:

```bash
sudo npm link
```

This creates a node module globally which you can use anywhere.
Create an empty project (in this example 'my-living-app') under living-frontend/apps


```bash
mkdir my-living-app
```

Then go into the folder

```bash
cd my-living-app
```

And build it!

```bash
yo livingapp
```

Add the line below to '/living-frontend/gulpfile.js'

```bash
require('./apps/your-app-name/gulpfile.js');
```

Now your app is scaffloded, navigate to the root folder '/living-frontend' run the below to compile the files and run the webserver. 'your-app-name-abbreviated' is the name you chose in the setup

```bash
gulp your-app-name-abbreviated:build
```


### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).
