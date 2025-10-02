import { FilterQuery } from "mongoose";
import { INode } from "../models/INode";

export interface INodeRepository{
    create(name:string,parentId?:string|null):Promise<INode>;
    findOne(data:FilterQuery<INode>):Promise<INode[]|null>
    findAll():Promise<INode[]>;
    delete(id:string):Promise<void>;
    findChildren(parentId:string):Promise<INode[]>;
}