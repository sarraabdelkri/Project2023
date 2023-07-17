const Atelier = require('../model/atelier');


const addAtelier = async (req, res, next) => {
    const { title,description } = req.body;
    let atelier;
    try {
        atelier = new Atelier({
            description,
            title
        });
        await atelier.save();
    } catch (err) {
        console.log(err);
    }
    if (!atelier) {
        return res.status(500).json({ message: "Unable to add" })
    }
  
  
    
    return res.status(201).json({ atelier });

};
const getAllAtelier = async (req, res, next) => {
    try {
      const ateliers = await Atelier.find();
      res.status(200).json({ ateliers });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
exports.addAtelier = addAtelier;
exports.getAllAtelier = getAllAtelier;