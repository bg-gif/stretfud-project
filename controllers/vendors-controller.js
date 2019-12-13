const {
  fetchVendors,
  fetchVendorByUsername,
  sendVendor,
  patchVendor,
  fetchMenuItems,
  updateMenuItem,
  checkMenuItemId,
  deleteMenuItemMod,
  sendMenuItem
} = require("../models/vendors-model");

const { filterVendors } = require("../utils/utils");

exports.getVendors = (req, res, next) => {
  let location = req.query.location;
  fetchVendors()
    .then(vendors => {
      if (!location) {
        res.status(200).send({ vendors });
      } else {
        const filteredVendors = filterVendors(vendors, location);
        res.status(200).send({ vendors: filteredVendors });
      }
    })
    .catch(next);
};

exports.getVendorByUsername = (req, res, next) => {
  let username = req.params.username;
  fetchVendorByUsername(username)
    .then(vendor => {
      if (vendor.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `Vendor Does Not Exist`
        });
      }
      res.status(200).send({ vendor: vendor[0] });
    })
    .catch(next);
};

exports.postVendor = (req, res, next) => {
  let vendor = req.body;
  sendVendor(vendor)
    .then(response => {
      res.status(201).send({ vendor: response });
    })
    .catch(next);
};

exports.patchVendor = (req, res, next) => {
  let update = req.body;
  let username = req.params.username;
  patchVendor(update, username)
    .then(response => {
      res.status(200).send({ vendor: response });
    })
    .catch(next);
};

exports.getVendorMenu = (req, res, next) => {
  let username = req.params.username;
  fetchMenuItems(username)
    .then(menu_items => {
      res.status(200).send({ menu_items });
    })
    .catch(next);
};

exports.patchVendorMenu = (req, res, next) => {
  let menuItem = req.params.menu_item_id;
  let options = req.body;
  updateMenuItem(menuItem, options)
    .then(([menu_item]) => {
      return menu_item
        ? res.status(200).send({ menu_item })
        : Promise.reject({ status: 404, msg: "Not Found" });
    })
    .catch(next);
};

exports.deleteMenuItem = (req, res, next) => {
  const item_id = req.params.menu_item_id;
  Promise.all([checkMenuItemId(item_id), deleteMenuItemMod(item_id)])
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};

exports.addMenuItem = (req, res, next) => {
  const menuItem = req.body;
  const { username } = req.params;
  sendMenuItem(menuItem, username)
    .then(([menu_item]) => {
      res.status(201).send({ menu_item });
    })
    .catch(next);
};
