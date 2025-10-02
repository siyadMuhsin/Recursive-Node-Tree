import mongoose, { Schema } from "mongoose";
import { INode } from "../interfaces/models/INode";

const NodeSchema = new Schema<INode>(
  {
    name: { type: String, required: true },
    parantId: { type: Schema.Types.ObjectId, ref: "Node", default: null },
  },
  {
    timestamps: true,
  }
);
export const NodeModel= mongoose.model<INode>('Node',NodeSchema)
