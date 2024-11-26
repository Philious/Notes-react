const express = require("express");
const uuid = require("uuid");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Create user { user, password }
app.post("/users", (req, res) => {
  const data = req.body;

  if (users.find((u) => u.email === data.email)) {
    return res.status(500).json({ error: "Email already exsits." });
  } else if (!req.body.email || !req.body.password) {
    return res
      .status(500)
      .json({ error: "Email or password was not supplied." });
  }

  const date = new Date();

  const newUser = {
    uuid: uuid.v4(),
    createdAt: new Date().toISOString(),
    email: data.email,
    password: data.password,
  };

  users.push(newUser);

  res.json({ message: "User created", data: newUser });
});

// Login
app.get("/users/login/:email/:password", (req, res) => {
  const email = String(req.params.email);
  const password = String(req.params.password);

  const userIndex = users.findIndex(
    (u) => u.email === email && u.password === password
  );

  if (userIndex < 0) {
    return res
      .status(500)
      .json({ error: "No user with that email or password" });
  }

  const token = uuid.v4();
  users[userIndex].token = token;

  res.json({ message: "Retrived token", data: token });
});

// Logout
app.delete("/users/logout/:token", (req, res) => {
  const token = req.params.token;
  const userIndex = users.findIndex((u) => u.token === token);

  if (!token || userIndex < 0) {
    return res.status(500).json({ error: "No user with that token" });
  }

  users[index].token = null;

  res.json({ message: `${users[index].email} logged out` });
});

/// Checktoken
app.get("/users/check/:token", (req, res) => {
  const token = req.params.token;
  const user = users.find((u) => u.token === token);

  res.json({
    message: `User ${!!user ? "logged in" : "logged out"}`,
    data: !!user,
  });
});

// Get all notes
app.get("/notes/:token", (req, res) => {
  const token = String(req.params.token);
  const userIndex = users.findIndex((u) => u.token === token);

  if (userIndex < 0) {
    return res.status(500).json({ error: "No user with that token" });
  }

  const userId = users[userIndex].uuid;

  res.json({
    message: `${users[userIndex].email}s notes`,
    data: notes[userId],
  });
});

// Create a new note # { title: string, content: string, catalog: string, tags: string[] }
app.post("/notes/:token", (req, res) => {
  const token = String(req.params.token);
  const userIndex = users.findIndex((u) => u.token === token);

  if (userIndex < 0) {
    return res.status(500).json({ error: "No user with that token" });
  }

  const userId = users[userIndex].uuid;
  const note = req.body;

  const date = new Date();

  const newNote = {
    id: uuid.v4(),
    createdAt: date,
    updatedAt: date,
    ...note,
  };

  notes[userId].push(newNote);

  res.json({ message: "Note created", data: notes[userId] });
});

// Modify an existing note # id: string, Partial<{ title: string, content: string, catalog: string, tags: string[] }>
app.put("/notes/:token/", (req, res) => {
  const token = Number(req.params.token);
  const userIndex = users.findIndex((u) => u.token === token);

  if (userIndex < 0) {
    return res.status(500).json({ error: "No user with that token" });
  }

  const userId = users[userIndex].uuid;
  const noteIndex = notes[userId].findIndex((i) => i.id === note.id);

  if (noteIndex < 0) {
    return res.status(404).json({ error: "Note doesn't exist" });
  }

  const prevNote = notes[userId][noteindex];
  const currentNote = {
    ...prevNote,
    ...note,
    updatedAt: new Date().toISOString(),
  };

  notes[userId][noteIndex] = currentNote;

  res.json({ message: "Note created", data: notes[userId] });
});

// Delete an existing note # id string
app.delete("/notes/:token/:noteId", (req, res) => {
  const token = Number(req.params.token);
  const noteId = String(req.params.id);

  const userIndex = users.findIndex((u) => u.token === token);

  if (userIndex < 0) {
    return res.status(500).json({ error: "No user with that token" });
  }

  const userId = users[userIndex].uuid;
  const noteIndex = users[userId].findIndex((n) => n.id === noteId);

  if (noteIndex < 0) {
    return res.status(404).json({ error: "Note doesn't exist" });
  }

  if (noteIndex >= 0) {
    notes[userId].splice(index, 1);
    res.json({ message: "Note deleted", data: notes[userId] });
  } else {
    res.status(404).json({ message: "Note doesn't exist", data: null });
  }
});

// Seeded startdata
// notes # { id: string, title: string, content: string, catalog: string, tags: string[], createdAt: string, updatedAt: string }
const notes = {
  "89503dc5-9517-48a2-833f-6bc7c0d32f1b": [
    {
      id: uuid.v4(),
      title: "Montera ner pariserhjulet",
      content:
        "Avsluta sista åkturen kl 22. Säkerställ att alla bultar är ordentligt förvarade, och märk sektionerna enligt instruktionerna.",
      catalog: "Logistik",
      tags: ["pariserhjul", "demontering", "säkerhet"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuid.v4(),
      title: "Matvarulista för nästa stopp",
      content:
        "Behöver korv, bröd, senap, ketchup, socker till sockervaddsmaskinen och extra smör för popcornmaskinen.",
      catalog: "Förnödenheter",
      tags: ["mat", "förnödenheter", "sockervadd"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuid.v4(),
      title: "Planera tivolins layout i Västerås",
      content:
        "Följ den nya planen för större säkerhetsavstånd. Placera radiobilarna nära ingången och skjutbanan längst bort.",
      catalog: "Planering",
      tags: ["layout", "säkerhet", "platsplanering"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuid.v4(),
      title: "Reparation av berg-och-dalbanan",
      content:
        "Slitage på spåren märkt på sista sektionen. Kontrollera alla säkerhetsfästen, ta fram reservdelar om nödvändigt.",
      catalog: "Underhåll",
      tags: ["berg-och-dalbana", "reparation", "säkerhet"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuid.v4(),
      title: "Kvällsshowen – förberedelser",
      content:
        "Dubbelkolla att musiken är klar och högtalarna fungerar. Kontrollera elden till eldslukaren och informera publik om säkerhetsavstånd.",
      catalog: "Show",
      tags: ["show", "förberedelser", "eldslukare"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
};

// Users { uuid: string, email: string, password: string, createdAt: string, notes: Note[] }
const users = [
  {
    uuid: "89503dc5-9517-48a2-833f-6bc7c0d32f1b",
    email: "conny@carneval.com",
    password: "1234†",
    createdAt: new Date().toISOString(),
    token: null,
  },
];
