import axios from "axios";

import { IUser } from "models/user/user";

import endPoints from "../api";

export const profileService = async () => {
  try {
    const apiResponse = await axios.get(endPoints.USER.PROFILE, {
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (apiResponse.data) {
      return apiResponse.data;
    }
    throw new Error(apiResponse.data.errorMessage);
  } catch (e) {
    throw e;
  }
};

export const profileEditService = async (values: IUser) => {
  try {
    const apiResponse = await axios.put(
      endPoints.USER.PROFILE,
      { ...values },
      {
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (apiResponse.data) {
      return apiResponse.data;
    }
    throw new Error(apiResponse.data.errorMessage);
  } catch (e) {
    throw e;
  }
};

export const profileEditPhotoService = async (values: any) => {
  console.log("values", values);
  try {
    const apiResponse = await axios.put(
      endPoints.USER.PROFILE_PHOTO,
      { ...values },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          accept: "*/*",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (apiResponse.data) {
      return apiResponse.data;
    }
    throw new Error(apiResponse.data.errorMessage);
  } catch (e) {
    throw e;
  }
};
