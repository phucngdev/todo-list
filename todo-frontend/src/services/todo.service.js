import { createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../api/axios";
import { ExclamationCircleTwoTone } from "@ant-design/icons";
import { message } from "antd";

// hàm lấy dữ liệu
export const findAllData = createAsyncThunk("findAll", async () => {
  try {
    const response = await baseUrl.get("/");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

// hàm xóa 1 bản ghi theo id
export const removeData = createAsyncThunk("remove", async (id) => {
  try {
    let response = await baseUrl.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const removeAll = createAsyncThunk("removeAll", async (id) => {
  try {
    let response = await baseUrl.delete(`/`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

//hàm tìm kiếm thông tin một bản ghi theo id
export const findOneData = createAsyncThunk("findOne", async (id) => {
  try {
    let response = await baseUrl.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const createData = createAsyncThunk("post", async (data) => {
  try {
    let response = await baseUrl.post("/", data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      message.error({
        content: "Nội dung thêm mới đã tồn tại",
      });
    } else {
      console.log(error);
    }
  }
});

export const upDateData = createAsyncThunk("put", async (id) => {
  try {
    const response = await baseUrl.put(`/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
