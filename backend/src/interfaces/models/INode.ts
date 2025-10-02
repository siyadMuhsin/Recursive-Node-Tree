import mongoose, { Document, ObjectId } from "mongoose";

export interface INode extends Document{
    _id:mongoose.Schema.Types.ObjectId;
    name:string;
    parentId:string|null
}