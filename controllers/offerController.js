const Offer = require ('../models/offerModel')
const mongoose = require("mongoose");


// get all offers


const getOffers = async (req, res) => {
  //desc order
  const Offers = await Offer.find({}).sort({ createdAt: -1 });
  res.status(200).json(Offers);
};

// get single offer
const getOffer = async (req, res) => {
  const { id } = req.params;
  // lazmou ykoun valid type of id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such offer" });
  }
  const newOffer = await Offer.findById(id);

  if (!newOffer) {
    return res.status(404).json({ error: "No such offer" });
  }

  res.status(200).json(newOffer);
};

// create offer
const createOffer= async (req, res) => {
  const { title, description, status, duration , budget } = req.body;
console.log("slm");
  // add to db
  try {
    const newOffer = await Offer.create({
      title,
      description,
      status,
      duration,
      budget,
    });
     res.status(200).json({
       success: true,
       message: "Offer created successfully!",
       offer: newOffer,
     });
  } catch (error) {
    res.status(400).json({ error: error.message });
   
  }
};


// delete offer

const deleteOffer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such offer to delete" });
  }

  const newOffer = await Offer.findOneAndDelete({ _id: id });

  if (!newOffer) {
    return res.status(400).json({ error: "No such offer to delete" });
  }

   res.status(200).json({
     success: true,
     message: "Offer deleted successfully!",
     offer: newOffer,
   });
};


//update offer

const updateOffer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such offer to update" });
  }

  const newOffer = await Offer.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!newOffer) {
    return res.status(400).json({ error: "No such offer to update" });
  }

res.status(200).json({
  success: true,
  message: "Offer updated successfully!",
  offer: newOffer,
});
};



module.exports = {
  createOffer,
  getOffers,
  getOffer,
  deleteOffer,
  updateOffer,
};