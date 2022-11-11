const mongoose = require("mongoose");

const AddPets = mongoose.Schema(
  {
    Pets: Array,
  },
  { minimize: false, collection: "AddPets" }
);

module.exports = mongoose.model("AddPets", AddPets);