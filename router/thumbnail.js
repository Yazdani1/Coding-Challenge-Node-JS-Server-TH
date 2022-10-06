const router = require("express").Router();
const {
  reduceImageSize,
  createThumbnail,
  getAllThumbnails,
  deleteThumbnail,
} = require("../controller/thumbnail");

// to store thumbnail image

router.post("/create-thumbnail", createThumbnail);

// to get all thumbnails

/**
 * @swagger
 * /get-allThumbnails:
 *  get:
 *    description: Get all the thumbnail lists
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
 *         - date
 *       properties:
 *         thumbnail:
 *           type: string
 *           description: Thumbnail link
 *         date:
 *           type: string
 *           description: Created date
 *
 *       example:
 *         id: 633e000792986a1ade23a92b
 *         thumbnail: https://news-note.s3.amazonaws.com/37efecd3-2794-4358-afce-b65e3a2734ca
 *         date: 2022-10-05T22:06:47.898Z
 */

router.get("/get-allThumbnails", getAllThumbnails);

// to delete thumbnail

router.delete("/delete-thumbnail/:id", deleteThumbnail);

// to create thumbnai size imgae and reduce  image size

router.post("/reduce-image-size", reduceImageSize);

module.exports = router;
