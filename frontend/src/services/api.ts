import type { AxiosError } from "axios";
import { API } from "../../config/axios.config";
import type { INode } from "../interfaces/INode";

const fetchTree = async (): Promise<any> => {
  try {
    const response = await API.get("/");
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ msg: string }>;
    throw new Error(err?.response?.data?.msg || err.message || "Failed to fetch tree");
  }
};

const addNode = async (data: Partial<INode>): Promise<any> => {
  try {
    const response = await API.post("/", data);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ msg: string }>;
    throw new Error(err?.response?.data?.msg || err.message || "Failed to add node");
  }
};

const deleteNode = async (id: string): Promise<any> => {
  try {
    const response = await API.delete(`/${id}`);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ msg: string }>;
    throw new Error(err?.response?.data?.msg || err.message || "Failed to delete node");
  }
};

export { fetchTree, addNode, deleteNode };
