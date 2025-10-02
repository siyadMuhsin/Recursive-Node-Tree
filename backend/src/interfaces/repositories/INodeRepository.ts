import { INode } from "../models/INode";

export interface INodeRepository{
    create(name:string,parentId?:string|null):Promise<INode>;
    findAll():Promise<INode[]>;
    delete(id:string):Promise<void>;
    findChildren(parentId:string):Promise<INode[]>;
}