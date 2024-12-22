const Tag = require("../models/TagModel");

const createTag = (newTag) => {
  return new Promise(async (resolve, reject) => {
    const { name, description, userTag } = newTag;
    try {
      const checkTag = await Tag.findOne({ name: name });
      if (checkTag !== null) {
        resolve({
          status: "ERR",
          message: "The tag name is already taken",
        });
      }
      const createdTag = await Tag.create({ name, description, userTag });
      if (createdTag) {
        resolve({
          status: "OK",
          message: "Tag created successfully",
          data: createdTag,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateTag = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkTag = await Tag.findOne({ _id: id });
      if (checkTag === null) {
        resolve({
          status: "OK",
          message: "The Tag is not defined",
        });
      }

      const updatedTag = await Tag.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "OK",
        message: "Success",
        data: updatedTag,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteTag = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkTag = await Tag.findOne({ _id: id });
      if (checkTag === null) {
        resolve({
          status: "OK",
          message: "The Tag is not defined",
        });
      }
      await Tag.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllTag = async (userTag) => {
  try {
      // Nếu có userId, lọc các tag theo userId
      const filter = userTag ? { userTag: userTag } : {};

      const tags = await Tag.find(filter); 

      return tags;
  } catch (e) {
      throw new Error("Error fetching tags: " + e.message);
  }
};


const getDetailsTag = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const tag = await Tag.findOne({ _id: id });

      if (tag === null) {
        resolve({
          status: "OK",
          message: "The tag is not defined",
        });
        return;
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: tag,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { createTag, updateTag, deleteTag, getAllTag, getDetailsTag };
