const AWS = require("aws-sdk");
const { uuid } = require("uuidv4");
const UploadImage = require("../model/UploadImage");
require("dotenv").config();

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_INFO,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_kEY_INFO,
  region: process.env.AWS_REGION_INFO,
  apiVersion: process.env.AWS_API_VERSION_INFO,
  correctClockSkew: true,
};

const S3 = new AWS.S3(awsConfig);

// to upload image to aws s3
exports.uploadImage = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) return res.status(400).send("Please Upload Thumbnail");

    // prepare the image

    const base64Data = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const typess = image.split(";")[0].split("/")[1];

    // image params

    const params = {
      Bucket: "news-note",
      Key: `${uuid()}.${typess}`,
      Body: base64Data,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: `image/${typess}`,
    };

    S3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }
      res.send(data);
    });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};


// to create posts

exports.createPost = async (req, res) => {
  const { original_image } = req.body;

  try {
    if (!original_image) {
      return res.status(422).json({ error: "Please add Image" });
    }

    const imageInfo = UploadImage({
      original_image,
    });

    const uploadimage = await UploadImage.create(imageInfo);
    res.status(201).json(uploadimage);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

// to get all posts

exports.getAllPosts = async (req, res) => {
  try {
    const postDetails = await UploadImage.find().sort({ date: "DESC" });
    res.status(200).json(postDetails);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

// to delete a post

exports.deletePost = async (req, res) => {
  const postId = { _id: req.params.id };

  try {
    const singlePost = await UploadImage.findOne(postId);
    if (!singlePost)
      return res.status(404).json({ error: "Post could not found" });

    const deletePost = await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: "Post deleted", deletePost });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};
