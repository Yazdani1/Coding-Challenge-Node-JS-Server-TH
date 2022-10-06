const router = require("express").Router();
const { uploadImage,createPost,deletePost,getAllPosts } = require("../controller/uploadImage");

// to upload image to aws s3
router.post("/upload-image", uploadImage);

// to upload original image


/**
 * @swagger
 * definitions:
 *  UploadImage:
 *   type: object
 *   properties:
 *    original_image:
 *     type: string
 *     description: Upload original image link
 *     example: https://news-note.s3.amazonaws.com/1aa87257-5171-4903-802a-cfc6e4ff2274
 *    date:
 *     type: string
 *     description: Created Date
 *     example: '2022-02-30'
 *
 */



 /**
 * @swagger
 * /save-original-uploaded-image:
 *  post:
 *   summary: Upload original image
 *   description: Upload original image to the server

 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/UploadImage'
 *   responses:
 *    201:
 *     description: success
 *    500:
 *     description: error
 */

router.post('/save-original-uploaded-image',createPost);

// to delete uploaded original image

router.delete("/delete-uploaded-image/:id",deletePost);

// to get all uploaded original image

/**
 * @swagger
 * /get-all-uploaded-image:
 *  get:
 *    description: To get all the thumbnails
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: A bad response
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UploadedImage:
 *       type: object
 *       required:
 *         - original_image
 *      
 *       properties:
 *         original_image:
 *           type: string
 *           description: Original uploaded image url
 *         date:
 *           type: string
 *           description: Created Date
 *       example:
 *         id: 633ea9d18e20facc7dbd1b2f
 *         thumbnail: https://news-note.s3.amazonaws.com/1aa87257-5171-4903-802a-cfc6e4ff2274
 *         date: 2022-10-05T22:06:47.898Z
 */


router.get("/get-all-uploaded-image",getAllPosts);

module.exports = router;
