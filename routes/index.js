var express = require('express');
var router = express.Router();
const app = express();
const port = 3000;

let crops = [];
app.use(express.json());

// Add a new Crop
app.post('/crops', (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).send('Missing name or description');
  }

  const newCrop = { id: crops.length + 1, name, description };
  crops.push(newCrop);
  res.status(201).send(crops);
});

// Get All Crops
app.get('/crops', (req, res) => {
  res.json(crops);
});

// Get a Single Crop details
app.get('/crops/:id', (req, res) => {
  const crop = crops.find(c => c.id === parseInt(req.params.id));
  if (!crop) {
    return res.status(404).send('Crop not found');
  }
  res.json(crop);
});

// Update a Crop detail
app.put('/crops/:id', (req, res) => {
  const crop = crops.find(c => c.id === parseInt(req.params.id));
  if (!crop) {
    return res.status(404).send('Crop not found');
  }

  const { name, description } = req.body;
  crop.name = name || crop.name;
  crop.descriptom = descriptom || crop.descriptom;

  res.send(crop);
});

// Delete a Crop
app.delete('/crops/:id', (req, res) => {
  const cropIndex = crops.findIndex(c => c.id === parseInt(req.params.id));
  if (cropIndex === -1) {
    return res.status(404).send('Crop not found');
  }

  crops.splice(cropIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = router;
