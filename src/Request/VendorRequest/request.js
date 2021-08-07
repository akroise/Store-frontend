import axios from "axios";

const url = "http://3.7.69.227:5000";
// const url = "http://localhost:5000";

export const getVendorId = (phnNo) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/getVendorId/${phnNo}`, { withCredentials: true })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response?.data || "Access Denied"));
  });
};

export const getStoreLink = (sessionId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/getStoreLink/${sessionId}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response?.data || "Access Denied"));
  });
};

export const addVendor = (phnNo, businessName, businessType) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/addVendor`, {
        phnNo,
        businessName,
        businessType,
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response?.data || "Access Denied"));
  });
};

export const getVendorInfo = (sessionId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/getVendorInfo/${sessionId}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response?.data || "Access Denied"));
  });
};

export const getVendorProducts = (sessionId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/getVendorProducts/${sessionId}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response?.data || "Access Denied"));
  });
};

export const getOrders = (status) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/getOrders/${status}`, { withCredentials: true })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response?.data || "Access Denied"));
  });
};
