const got = require("got");
const sharp = require("sharp");
const AWS = require("aws-sdk");
const { uuid } = require("uuidv4");
const Thumbnail = require("../model/Thumbnail");

require("dotenv").config();

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_INFO,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_kEY_INFO,
  region: process.env.AWS_REGION_INFO,
  apiVersion: process.env.AWS_API_VERSION_INFO,
  correctClockSkew: true,
};

const S3 = new AWS.S3(awsConfig);

// to create thumbnail

exports.createThumbnail = async (req, res) => {
  const { thumbnail } = req.body;

  try {
    if (!thumbnail) {
      return res.status(422).json({ error: "Please add thumbanail" });
    }

    const thumbanailInfo = Thumbnail({
      thumbnail,
    });

    const uploadThumbnail = await Thumbnail.create(thumbanailInfo);
    res.status(201).json(uploadThumbnail);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

// to get all the thumbnails

exports.getAllThumbnails = async (req, res) => {
  try {
    const allThumbnail = await Thumbnail.find().sort({ date: "DESC" });

    res.status(200).json(allThumbnail);
  } catch (error) {
    res.status(400).json({ error: "Something Went Wrong" });
  }
};


// to delete thumbnail

exports.deleteThumbnail = async(req,res)=>{

    const thumbnailId = { _id: req.params.id };

    try {
      const singleThumbnail = await Thumbnail.findOne(thumbnailId);
      if (!singleThumbnail)
        return res.status(404).json({ error: "Thumbnail could not found" });
  
      const deleteThumbnail = await Thumbnail.findByIdAndDelete(thumbnailId);
  
      res.status(200).json({ message: "Thumbnail deleted", deleteThumbnail });
    } catch (error) {
      res.status(400).json({ error: "Something went wrong" });
    }

}


// to reduce image size

exports.reduceImageSize = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(422).json({ error: "Please add image url" });
    }

    const body = await got(url).buffer();

    const data = await sharp(body)
      .resize({ width: 200, height: 200 })
      .jpeg({ quality: 100 })
      .toBuffer();

    const params = {
      Bucket: "news-note",
      Key: `${uuid()}`,
      Body: data,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: `image/jpeg`,
    };

    S3.upload(params, (err, dataresult) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }
      // res.send(dataresult);
      res.json(dataresult);

      console.log(dataresult);
    });
  } catch (error) {
    res.status(400).json({ error: "Something Went Wrong" });
  }
};
