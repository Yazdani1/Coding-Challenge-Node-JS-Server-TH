const router = require("express").Router();
const { reduceImageSize,createThumbnail,getAllThumbnails,deleteThumbnail } = require("../controller/thumbnail");

// to store thumbnail image

/**
 * @swagger
 * definitions:
 *  Thumbnail:
 *   type: object
 *   properties:
 *    thumbnail:
 *     type: string
 *     description: Create Thumbnail
 *     example: https://news-note.s3.amazonaws.com/1aa87257-5171-4903-802a-cfc6e4ff2274
 *    date:
 *     type: string
 *     description: Created Date
 *     example: '2022-02-30'
 *
 */



 /**
 * @swagger
 * /create-thumbnail:
 *  post:
 *   summary: Create Thumbnail
 *   description: Upload thumbnail image to the server
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Thumbnail'
 *   responses:
 *    201:
 *     description: success
 *    500:
 *     description: error
 */

 

router.post("/create-thumbnail",createThumbnail);

// to get all thumbnails


/**
 * @swagger
 * /get-allThumbnails:
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
 *     Thumbnail:
 *       type: object
 *       required:
 *         - thumbnail
 *      
 *       properties:
 *         thumbnail:
 *           type: string
 *           description: Thumbnail image url
 *         date:
 *           type: string
 *           description: Created Date
 *       example:
 *         id: 633ea9d18e20facc7dbd1b2f
 *         thumbnail: https://news-note.s3.amazonaws.com/1aa87257-5171-4903-802a-cfc6e4ff2274
 *         date: 2022-10-05T22:06:47.898Z
 */


router.get("/get-allThumbnails",getAllThumbnails);


// to delete thumbnail

router.delete("/delete-thumbnail/:id",deleteThumbnail);


// to create thumbnai size imgae and reduce  image size


router.post("/reduce-image-size",reduceImageSize);

module.exports = router;
