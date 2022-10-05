const mongoose = require("mongoose");

var originalImageSchema = mongoose.Schema({

  original_image: {},

  date: {
    type: Date,
    default: Date.now,
  },
  
});

module.exports = mongoose.model("OriginalImage", originalImageSchema);
