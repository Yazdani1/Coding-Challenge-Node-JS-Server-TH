const mongoose = require("mongoose");

var thumbnailSchema = mongoose.Schema({

  thumbnail: {},

  date: {
    type: Date,
    default: Date.now,
  },
  
});

module.exports = mongoose.model("Thumbnails", thumbnailSchema);
