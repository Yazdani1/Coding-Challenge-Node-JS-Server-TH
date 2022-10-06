const router = require("express").Router();
const { uploadImage,createPost,deletePost,getAllPosts } = require("../controller/uploadImage");

// to upload image to aws s3
router.post("/upload-image", uploadImage);

// create thumbnail post

router.post('/create-post',createPost);

// to delete post

router.delete("/delete-post/:id",deletePost);

// to get all posts

router.get("/get-allPosts",getAllPosts);


module.exports = router;
