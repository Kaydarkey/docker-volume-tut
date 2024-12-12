// Required modules
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Connect to MongoDB
mongoose.connect('mongodb://db:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));

// Define a schema and model
const ImageSchema = new mongoose.Schema({
    name: String,
    imagePath: String
});
const Image = mongoose.model('Image', ImageSchema);

// Routes
app.get('/', (req, res) => {
    res.send("Welcome to the Image Upload Server!");
});

// Endpoint to upload an image
app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const newImage = new Image({
        name: req.body.name,
        imagePath: req.file.path
    });
    await newImage.save();
    res.send({ message: 'Image uploaded successfully!', image: newImage });
});

// Endpoint to get all images
app.get('/images', async (req, res) => {
    const images = await Image.find();
    res.send(images.map(image => ({
        name: image.name,
        imagePath: image.imagePath
    })));
});

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));