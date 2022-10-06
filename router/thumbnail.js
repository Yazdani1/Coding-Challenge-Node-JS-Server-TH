const router = require("express").Router();
const { reduceImageSize,createThumbnail,getAllThumbnails,deleteThumbnail } = require("../controller/thumbnail");

// to store thumbnail image

router.post("/create-thumbnail",createThumbnail);

// to get all thumbnails

router.get("/get-allThumbnails",getAllThumbnails);


// to delete thumbnail

router.delete("/delete-thumbnail/:id",deleteThumbnail);


// to create thumbnai size imgae and reduce  image size

router.post("/reduce-image-size",reduceImageSize);

module.exports = router;
