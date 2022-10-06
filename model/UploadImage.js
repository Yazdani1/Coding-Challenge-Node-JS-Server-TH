const mongoose = require("mongoose");

var originalImageSchema = mongoose.Schema({

  original_image: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  
});

module.exports = mongoose.model("OriginalImage", originalImageSchema);
