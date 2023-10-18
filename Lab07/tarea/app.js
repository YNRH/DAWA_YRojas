// app.js
const express = require("express");
const mongoose = require("mongoose");
const Music = require("./models/music");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const methodOverride = require('method-override');

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect("mongodb://0.0.0.0:27017/bdMusic", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error(error);
  });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    cb(null, originalName);
  },
});

const upload = multer({ storage }).fields([
  { name: "audio", maxCount: 1 },
  { name: "image", maxCount: 1 },
]);

app.get("/", (req, res) => {
  Music.find({})
    .then((music) => {
      res.render("index", { music: music });
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/music/new", (req, res) => {
  res.render("new");
});

app.post("/music", (req, res) => {
  upload(req, res, (uploadError) => {
    if (uploadError) {
      console.error(uploadError);
      return res.render("new");
    }

    const { title, artist, genre, year } = req.body;
    const audioFile = req.files["audio"][0];
    const imageFile = req.files["image"][0];

    if (!audioFile || !imageFile) {
      return res.render("new");
    }

    const audioFilePath = `/uploads/${audioFile.originalname}`;
    const imageFilePath = `/uploads/${imageFile.originalname}`;

    const newMusic = new Music({
      title,
      artist,
      genre,
      year,
      audioFilePath,
      imageFilePath,
    });

    newMusic
      .save()
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        console.error(err);
        res.render("new");
      });
  });
});

// *****************************************

// Agrega una ruta para editar una canción
app.get("/music/:id", (req, res) => {
  const musicId = req.params.id;

  Music.findById(musicId)
    .then((music) => {
      if (!music) {
        return res.redirect("/");
      }
      res.render("edit", { music: music });
    })
    .catch((err) => {
      console.error(err);
      res.redirect("/");
    });
});

// Agrega una ruta para actualizar la canción
app.put("/music/:id", (req, res) => {
  const musicId = req.params.id;

  upload(req, res, (uploadError) => {
    if (uploadError) {
      console.error(uploadError);
      return res.redirect(`/music/${musicId}`);
    }

    const { title, artist, genre, year } = req.body;
    const audioFile = req.files["audio"][0];
    const imageFile = req.files["image"][0];

    if (!audioFile || !imageFile) {
      return res.redirect(`/music/${musicId}`);
    }

    const audioFilePath = `/uploads/${audioFile.originalname}`;
    const imageFilePath = `/uploads/${imageFile.originalname}`;

    Music.findByIdAndUpdate(
      musicId,
      {
        title,
        artist,
        genre,
        year,
        audioFilePath,
        imageFilePath,
      },
      { new: true } // Para obtener el documento actualizado
    )
      .then((updatedMusic) => {
        res.redirect("/");
      })
      .catch((err) => {
        console.error(err);
        res.redirect(`/music/${musicId}`);
      });
  });
});


app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
