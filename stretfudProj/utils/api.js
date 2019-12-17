const axios = require('axios');
const base_URL = 'https://stretfud.herokuapp.com/api';

exports.fetchVendor = username => {
  return axios.get(`${base_URL}/vendors/${username}`).then(({ data }) => {
    return data.vendor;
  });
};

exports.updateVendorInfo = ({ username, location, open_status, menu }) => {
  return axios
    .patch(`${base_URL}/vendors/${username}`, {
      open_status: open_status,
      location,
      menu
    })
    .then(({ data }) => {
      return data.vendor;
    });
};

exports.postLoginAuth = (loginObj, destination) => {
  return axios
    .post(`${base_URL}/login/${destination}s`, loginObj)
    .then(({ data }) => {
      return data;
    });
};

exports.fetchVendorsByLocation = (lat, long) => {
  return axios
    .get(`${base_URL}/vendors?=${lat},${long}`)
    .then(({ data: { vendors } }) => {
      return vendors;
    });
};

exports.fetchMenuItemsByVendor = username => {
  return axios
    .get(`${base_URL}/vendors/${username}/menu`)
    .then(({ data: { menu_items } }) => {
      return menu_items;
    });
};

exports.updateMenuItem = ({ username, menu_item_id, available }) => {
  return axios
    .patch(`${base_URL}/vendors/${username}/menu/${menu_item_id}`, {
      available
    })
    .then(({ data: { menu_item } }) => {
      return menu_item;
    });
};

exports.addUser = (destination, userObj) => {
  return axios
    .post(`${base_URL}/${destination}`, userObj)
    .then(({ data: { user } }) => {
      return user;
    });
};

exports.addMenuItem = (username, newItem) => {
  return axios
    .post(`${base_URL}/vendors/${username}/menu`, newItem)
    .then(({ data }) => {
      return data;
    });
};

exports.deleteMenuItem = (username, menu_item_id) => {
  return axios
    .delete(`${base_URL}/vendors/${username}/menu/${menu_item_id}`)
    .then(() => {
      return { msg: 'Item Deleted' };
    });
};
