const router = require("express").Router();
const { uploadImage,createPost,deletePost,getAllPosts } = require("../controller/uploadImage");

// to upload image to aws s3
router.post("/upload-image", uploadImage);

// create thumbnail post

router.post('/create-post',createPost);

// to delete post

router.delete("/delete-post/:id",deletePost);

// to get all posts


/**
 * @swagger
 * components:
 *   schemas:
 *     OriginalImage:
 *       type: object
 *       required:
 *         - original_image
 *         - date
 *       properties:
 *         original_image:
 *           type: string
 *           description: Upload Ourginal Image
 *         date:
 *           type: string
 *           description: Created date
 *
 *       example:
 *         id: 633e000792986a1ade23a92b
 *         original_image: https://news-note.s3.amazonaws.com/37efecd3-2794-4358-afce-b65e3a2734ca
 *         date: 2022-10-05T22:06:47.898Z
 */

router.get("/get-allPosts",getAllPosts);


module.exports = router;
