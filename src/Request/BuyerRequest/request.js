import axios from "axios";
import {
  setCategories,
  setProducts,
} from "../../BuyerPanel/Redux/Actions/productActions";
import { setVendor } from "../../BuyerPanel/Redux/Actions/vendorActions";

const url = "http://3.7.69.227:5000";
// const url = "http://localhost:5000";
export const getProducts = async (vendor_id, dispatch) => {
  await axios
    .post(`${url}/user/getVendorProducts`, {
      vendor_id: vendor_id,
    })
    .then((response) => dispatch(setProducts(response.data)))
    .catch((err) => console.log(err));
};

export const getCategories = async (vendor_id, dispatch) => {
  await axios
    .post(`${url}/user/getCategories`, { vendor_id: vendor_id })
    .then((response) => dispatch(setCategories(response.data)))
    .catch((err) => console.log(err));
};

export const getVendorDetails = async (store_link, dispatch) => {
  return await axios
    .post(`${url}/user/getVendorDetails`, {
      store_link: store_link,
    })
    .then((response) => {
      dispatch(setVendor(response.data[0]));
      getProducts(response.data[0].vendor_id, dispatch);
      getCategories(response.data[0].vendor_id, dispatch);
    })
    .catch((err) => {
      return err;
    });
};

export const addUser = async (user_data) => {
  await axios
    .post(`${url}/addNewUser`, user_data)
    .catch((err) => console.log(err));
};

export const getUserDetails = async (uuid) => {
  return await axios
    .post(`${url}/getUserDetails`, { uuid: uuid })
    .then((result) => {
      return result.data;
    });
};

export const updateUser = async (name, uuid) => {
  return await axios
    .post(`${url}/updateUser`, { uuid: uuid, name: name })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getUserAddress = async (uuid) => {
  return await axios
    .post(`${url}/getUserAddress`, { uuid: uuid })
    .then((result) => result.data)
    .catch((err) => err);
};

export const addAddress = async (formData) => {
  return await axios
    .post(`${url}/addAddress`, { formData })
    .then((res) => res.data)
    .catch((err) => err);
};
export const removeAddress = async (address_id) => {
  return await axios
    .post(`${url}/removeAddress`, { address_id })
    .then((res) => res.data)
    .catch((err) => err);
};

export const placeOrder = async (order) => {
  return await axios
    .post(`${url}/placeOrder`, { order })
    .then((res) => res.data)
    .catch((err) => err);
};

export const getOrders = async (uuid) => {
  return await axios
    .post(`${url}/getOrders`, { uuid })
    .then((res) => res.data)
    .catch((err) => err);
};

export const getOrderList = async (order_id) => {
  return await axios
    .post(`${url}/getOrderList`, { order_id })
    .then((res) => res.data)
    .catch((err) => err);
};

export const getStores = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/getStores`)
      .then((res) => resolve(res.data))
      .catch((err) =>
        reject(err.isAxiosError ? "Server Offline" : err.response.data)
      );
  });
};
