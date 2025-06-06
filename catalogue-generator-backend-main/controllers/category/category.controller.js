const DB = require("../../models");
const response = require("../../helper/response.helper");
const messages = require("../../json/message.json");
const { getSingleItem } = require("../../services/dbOperations.service");
const {
  USER_TYPE: { ADMIN, VENDOR },
} = require("../../json/enums.json");
const { get } = require("http");

module.exports = {
  /* Get Product Category API */
  getCategories: async (req, res) => {
    try {
      let { parentId, ...query } = req.query;

      if (req.user.role !== ADMIN) {
        const vendor = await getSingleItem(DB.vendor, {
          _id: req.params.vendorId,
        });
        if (!vendor)
          return response.NOT_FOUND({
            res,
            message: messages.VENDOR_NOT_FOUND,
          });

        query.vendorId = vendor._id;
      }

      const categoryForsubCategories = await DB.category.find(query);

      if (req.params.categoryId) query._id = req.params.categoryId;

      const categoryData = await DB.category.find(query);

      // Transform the data to the desired format
      const formattedCategories = categoryData
        .filter((category) => category.parentId === null)
        .map((category) => ({
          id: category._id,
          name: category.name,
          imageUrl: category.categoryImages?.[0] || null,
          subcategories: categoryForsubCategories
            .filter(
              (subcat) => String(subcat.parentId?._id) === String(category._id)
            )
            .map((subcat) => ({
              id: subcat._id,
              name: subcat.name,
              imageUrl: subcat.categoryImages?.[0] || null,
            })),
        }));

      return response.OK({
        res,
        message: messages.CATEGORIES_FETCHED_SUCCESSFULLY,
        count: formattedCategories.length,
        payload: { categories: formattedCategories },
      });
    } catch (error) {
      return response.INTERNAL_SERVER_ERROR({ res, message: error.message });
    }
  },

  getCategoriesName: async (req, res) => {
    try {
      if (!(await DB.vendor.findOne({ _id: req.params.vendorId })))
        return response.NOT_FOUND({ res, message: messages.VENDOR_NOT_FOUND });
      const categories = await DB.category
        .find({ vendorId: req.params.vendorId })
        .select("name");
      return response.OK({
        res,
        message: messages.CATEGORIES_FETCHED_SUCCESSFULLY,
        payload: categories,
      });
    } catch (error) {
      return response.INTERNAL_SERVER_ERROR({ res, message: error.message });
    }
  },

  /* Create Product Category API */
  createCategory: async (req, res) => {
    try {
      if (req.files && req.files.length > 0) {
        req.body.categoryImages = req.files.map(
          (file) => `/uploads/${file.filename}`
        );
      } else {
        req.body.categoryImages = [];
      }
      const vendor = await getSingleItem(DB.vendor, { userId: req.user._id });
      if (!vendor)
        return response.NOT_FOUND({ res, message: messages.VENDOR_NOT_FOUND });
      req.body.vendorId = vendor._id;

      req.body.parentId ? req.body.parentId : null;

      req.body.friendlyURL = req.body.name
        .toString()
        .trim()
        .toLowerCase()
        .split(" ")
        .join("-");
      if (
        await getSingleItem(DB.category, {
          vendorId: vendor._id,
          friendlyURL: req.body.friendlyURL,
        })
      )
        return response.EXISTED({
          res,
          message: messages.CATEGORY_NAME_EXISTS,
        });

      DB.category.create(req.body);
      return response.CREATED({
        res,
        message: messages.CATEGORY_CREATED_SUCCESSFULLY,
        payload: req.body,
      });
    } catch (error) {
      return response.INTERNAL_SERVER_ERROR({ res, message: error.message });
    }
  },

  /* Update Product Category API */
  updateCategory: async (req, res) => {
    try {
      const vendor = await getSingleItem(DB.vendor, { userId: req.user._id });
      if (!vendor)
        return response.NOT_FOUND({ res, message: messages.VENDOR_NOT_FOUND });
      req.body.vendorId = vendor._id;

      req.body.parentId ? req.body.parentId : null;

      req.body.friendlyURL = req.body.name
        .toString()
        .trim()
        .toLowerCase()
        .split(" ")
        .join("-");
      if (
        await getSingleItem(DB.category, {
          _id: { $ne: req.params._id },
          vendorId: vendor._id,
          friendlyURL: req.body.friendlyURL,
        })
      )
        return response.EXISTED({
          res,
          message: messages.CATEGORY_NAME_EXISTS,
        });

      await DB.category.findByIdAndUpdate({ _id: req.params._id }, req.body, {
        new: true,
      });
      return response.OK({
        res,
        message: messages.CATEGORY_UPDATED_SUCCESSFULLY,
        payload: req.body,
      });
    } catch (error) {
      return response.INTERNAL_SERVER_ERROR({ res, message: error.message });
    }
  },

  /* Delete Product Category API */
  deleteCategory: async (req, res) => {
    try {
      if (!(await getSingleItem(DB.category, { _id: req.params._id })))
        return response.NOT_FOUND({
          res,
          message: messages.CATEGORY_NOT_FOUND,
        });

      await DB.category.findByIdAndDelete(req.params._id);
      await DB.category.deleteMany({ parentId: req.params._id });
      await DB.product.deleteMany({ categoryId: req.params._id });
      return response.OK({
        res,
        message: messages.CATEGORY_DELETED_SUCCESSFULLY,
      });
    } catch (error) {
      return response.INTERNAL_SERVER_ERROR({ res, message: error.message });
    }
  },
};
