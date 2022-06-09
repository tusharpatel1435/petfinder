const router = require("express").Router();
const Pets = require("../models/Pets");
const uploader = require("../config/cloudinary.config");

// You put the next routes here

// gets the pet list with all the pets
router.get('/', (req, res, next) => {
  Pets.find()
  .then(pet => res.status(200).json(pet))
  .catch(err => next(err))
})

router.post('/', (req, res) => {
  const {owner, location, lostOrFound, textDescription, date, nameOfPet, descriptionOfPet, typeOfPet, colourOfPet, pictureLink } = req.body;
console.log(req.body, "THIS IS WHAT WE GET FROM ADDING PET")
  Pets.create({
    owner,
    location,
    lostOrFound,
    textDescription,
    date,
    nameOfPet,
    descriptionOfPet,
    typeOfPet,
    colourOfPet,
    pictureLink
  });
})

// gets a specific pet from the pet list
router.get('/:id', (req, res) => {
  Pets.findById(req.params.id)
  .then(pet => res.status(200).json(pet))
  .catch(err => res.status(200).json(err))
})

//updates a specific pet
router.put('/:id', (req, res) => {
  const data = req.body
  console.log(data)
  Pets.findByIdAndUpdate( req.params.id, { ...data }, { new: true } )
  .then(pet => res.status(200).json(pet))
  .catch(err => res.json(err))
})

router.delete('/:id', (req, res) => {
  console.log("THIS IS THE PET WE WANNA DELETE", req.params.id)
  Pets.findByIdAndDelete(req.params.id)
  
    .then(pet => res.status(200).json(pet))
    .catch(err => res.json(err))
})

router.post('/upload', uploader.single('pictureLink'), (req, res, next) => {
 
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  
 
  res.json({ secure_url: req.file.path });
  console.log(req.file.path)
});
module.exports = router;