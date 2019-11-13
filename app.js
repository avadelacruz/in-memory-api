const express = require("express");
const cors = require("cors");
const app = express();

const { ENVIRONMENT, PORT } = process.env;
const IS_DEVELOPMENT = ENVIRONMENT === "development";

// middleware
app.use(express.json());
app.use(
  cors({
    origin: "*"
  })
);

const db = {
  posts: [
    {
      id: 1,
      title: "Post 1",
      body: "something here..."
    },
    {
      id: 2,
      title: "Post 2",
      body: "something else here..."
    },
    {
      id: 3,
      title: "Post 3",
      body: "something else here..."
    }
  ],
  comments: [
    {
      id: 1,
      post: 3,
      body: "comment for post 3"
    },
    {
      id: 2,
      post: 1,
      body: "comment for post 2"
    }
  ]
};

app.get("/api/posts", (request, response) => {
  response.json(db.posts);
});

app.get("/api/comments", (request, response) => {
  response.json(db.comments);
});

app.post("/api/posts", (request, response) => {
  const post = request.body;
  post.id = db.posts.length + 1;
  db.posts.push(post);
  response.json(post);
});

app.post("/api/comments", (request, response) => {
  const comment = request.body;
  comment.id = db.comments.length + 1;
  db.comments.push(comment);
  response.json(comment);
});

app.get("/api/posts/:id", (request, response) => {
  const id = Number(request.params.id);
  const post = db.posts.find(post => {
    return post.id === id;
  });

  if (post) {
    response.json(post);
  } else {
    response.status(404).send();
  }
});

app.delete("/api/posts/:id", (request, response) => {
  const id = Number(request.params.id);
  const post = db.posts.find(post => {
    return post.id === id;
  });

  if (post) {
    db.posts = db.posts.filter(post => {
      return post.id !== id;
    });
    response.status(204).send();
  } else {
    response.status(404).send();
  }
});

app.put("/api/posts/:id", (request, response) => {
  const id = Number(request.params.id);
  const post = db.posts.find(post => {
    return post.id === id;
  });

  if (post) {
    Object.assign(post, request.body);
    response.json(post);
  } else {
    response.status(404).send();
  }
});

app.listen(PORT || 8000);
