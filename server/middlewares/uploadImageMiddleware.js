const fs = require("fs");

module.exports = async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ msg: "File is missing for upload" });

    const file = req.files.file;

    if (file.size > 1024 * 1024) {
      removeTmpFile(file.tempFilePath);
      return res.status(400).json({ msg: "file is too large to upload" });
    }

    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removeTmpFile(file.tempFilePath);
      return res.status(400).json({ msg: "File format is incorrect." });
    }
    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const removeTmpFile = (path) => [
  fs.unlink(path, (err) => {
    if (err) throw err;
  }),
];
