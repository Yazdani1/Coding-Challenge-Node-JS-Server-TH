const mongoose = require("mongoose");

var thumbnailSchema = mongoose.Schema({

  thumbnail: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  
});

module.exports = mongoose.model("Thumbnails", thumbnailSchema);
