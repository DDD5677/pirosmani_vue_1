const express = require("express");
const router = express.Router();
const Banner = require("../models/banner");
const multer = require("multer");
const { default: mongoose } = require("mongoose");
const FILE_TYPE_MAP = {
   "image/png": "png",
   "image/jpeg": "jpeg",
   "image/jpg": "jpg",
   "image/webp": "webp",
   "image/svg+xml": "svg",
};

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      const isValid = FILE_TYPE_MAP[file.mimetype];
      let uploadError = new Error("invalid image type");
      if (isValid) {
         uploadError = null;
      }
      cb(uploadError, "public/banner");
   },
   filename: function (req, file, cb) {
      const fileName = file.originalname.split(" ").join("-");
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${fileName}-${Date.now()}.${extension}`);
   },
});

const uploadOptions = multer({ storage: storage });

router.get(`/`, async (req, res, next) => {
   try {
      const banner = await Banner.find({});

      if (!banner) {
         res.status(500).json({
            success: false,
         });
      }
      res.status(200).send(banner);
   } catch (error) {
      next(error);
   }
});

router.post("/", uploadOptions.single("image"), async (req, res, next) => {
   try {
      console.log(req.body);
      let postBlock = {
         title: req.body.title,
         subtitle: req.body.subtitle,
         link: req.body.link,
         button: req.body.button,
      };
      const file = req.file;
      const basePath = `${req.protocol}://${req.get("host")}/public/banner/`;

      if (file) {
         const fileName = file.filename;
         postBlock["image"] = `${basePath}${fileName}`;
      }
      let banner = new Banner(postBlock);

      banner = await banner.save();

      if (!banner) {
         return res.status(404).send("the banner cannot be created!");
      }

      res.status(200).send(banner);
   } catch (error) {
      next(error);
   }
});

router.put("/:id", uploadOptions.single("image"), async (req, res, next) => {
   try {
      if (!mongoose.isValidObjectId(req.params.id)) {
         return res.status(400).send("Invalid ID");
      }
      let updateBlock = {};
      const file = req.files;
      const basePath = `${req.protocol}://${req.get("host")}/public/banner/`;

      if (req.body.title) {
         updateBlock["title"] = req.body.title;
      }
      if (req.body.subtitle) {
         updateBlock["subtitle"] = req.body.subtitle;
      }
      if (req.body.link) {
         updateBlock["link"] = req.body.link;
      }
      if (req.body.button) {
         updateBlock["button"] = req.body.button;
      }
      if (file.image) {
         const fileName = file.image[0].filename;
         updateBlock["image"] = `${basePath}${fileName}`;
      }
      const banner = await Banner.findByIdAndUpdate(
         req.params.id,
         updateBlock,
         { new: true }
      );
      if (!banner) {
         return res.status(404).send("the banner cannot be updated!");
      }

      res.status(200).send(banner);
   } catch (error) {
      next(error);
   }
});

module.exports = router;
