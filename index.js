import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override"; 
const app = express();
const port = 3000;

let blogs = [];
let nextId = 1;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
    res.render("index.ejs", {blogs : blogs});
});


app.post("/submit", (req , res) => {
    const blog = {
        id: nextId++,
        title: req.body["title"],
        content: req.body["content"],
        author: req.body["author"]
    };
    blogs.push(blog);
    //res.render("index.ejs", {_blogs: blogs});
    res.redirect("/blogs")
});

app.get("/blogs", (req, res) => {
    res.render("index.ejs", {blogs : blogs});
});

app.get("/edit/:id", (req,res) => {
    const blog = blogs.find(b => b.id === parseInt(req.params.id));
    if(blog) {
        res.render("edit.ejs", {blog: blog});
    }else{
        res.status(404).send("Blog is not found.");
    }
});


app.put("/edit/:id", (req, res) => {
   const blogId = parseInt(req.params.id);
   const blog = blogs.find(b => b.id === blogId);
   
   if(blog){
    blog.title = req.body["title"];
    blog.content = req.body["content"];
    blog.author = req.body["author"];
   }
   res.redirect("/blogs");
});

app.post("/delete/:id", (req, res) => {   
    const blogId = parseInt(req.params.id);
    blogs = blogs.filter(b=>b.id !== blogId);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on  port: ${port}`);
});