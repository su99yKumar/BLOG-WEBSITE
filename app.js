// KNOW ABOUT EXPRESS
const express = require('express');

//morgan middleware:
const morgan = require('morgan');

//require mongoose
const mongoose = require('mongoose');

//
const Blog = require('./models/blog');

// express app:
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://sunny:sunny12345@nodetuts.asuxk.mongodb.net/nodetuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//register view engine:
app.set('view engine', 'ejs');

// if you want to create new folder for ejs
//app.set('views', 'myviews');

// listen for request
// app.listen(3000);

// middleware and static files
app.use(express.static('public'));
//middleware for accepting form data
app.use(express.urlencoded({ extended: true }));


app.use(morgan('dev'));


//mongoose and mongo sandbox routes:
/*
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog',
        body: 'more about my new blog'

    });

*/
/*
//how to save blogs in database
blog.save()
 .then((result) => {
     res.send(result)
 })
 .catch((err) => {
     console.log(err);
 });
//how to find all blogs
app.get('/all-blogs', (req, res) => {
 Blog.find()
     .then((result) => {
         res.send(result);
     })
     .catch((err) => {
         console.log(err);
     })
})
// how to find single blog
app.get('/single-blog', (req, res) => {
 Blog.findById('616dbffa8dc925d65d059bbd')
     .then((result) => {
         res.send(result);
     })
     .catch((err) => {
         console.log(err);
     })
});
*/

// creating Middleware:
/*
app.use((req, res, next) => {
    console.log('new request made');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    //why next() is used?
    next();
});
 
// why browser is hanging here? because after running above code express does not know what to do next and it does not know how to move on to the next Middleware
 
app.use((req, res, next) => {
    console.log('in the next middleware');
    next();
});
/*
app.get('/', (req, res) => {
    // good thing about res.send is that now we dont need to specify  setHeader and statusCode, it will be automatically set by the express:
    res.send('<p> <b>home page</b> </p>');
});
app.get('/about', (req, res) => {
    res.send('<p> <b>about page</b> </p>');
});
*/

//routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});
//how to sent html page with express:
app.get('/', (req, res) => {
    //we need to pass second argument because this path'./views/index.html' is not meant to be relative pathso we need to pass an argument where it is relative from because by defaultit is going to look for absolute path so we specify the root and from there it is going to look for relative path:
    //res.sendFile('./views/index.html', { root: __dirname }); //another wayto do this is using path module
    //res.render('index');
    res.render('index', { title: 'Home' });
});

app.get('/about', (req, res) => {
    //res.sendFile('./views/about.html', { root: __dirname });
    // res.render('about');
    res.render('about', { title: 'about' });
});

//redirects:

/*
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});
*/
//blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: "All Blogs", blogs: result });
        })
        .catch((err) => {
            console.log(err);
        })
})

    //Post request
    /
    app.post('/blogs', (req, res) => {
        const blog = new Blog(req.body);
        blog.save()
            .then((result) => {
                res.redirect('/blogs')
            })
            .catch((err) => {
                console.log(err);
            })
    })




app.get('/blogs/create:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('details', { blog: result, title: 'Blog details' })
        })
        .catch((err) => {
            console.log(err);
        })

})


app.get('/blogs/create', (req, res) => {
    // res.render('create')
    res.render('create', { title: 'create a new blog' });
})

//404 page using express:
//its position it must be always wriiten at bottom, if put it at top it will get executed before
app.use((req, res) => {
    //res.status(404).sendFile('./views/404.html', { root: __dirname });
    //res.status(404).render('404');
    res.status(404).render('404', { title: 'error' });
});

// COMPARE THIS WITH server.js file and know why express.js is better and more clean optiom.