import { INode } from "../models/INode";

export interface INodeRepository{
    create(name:string,parantId?:string|null):Promise<INode>;
    findAll():Promise<INode[]>;
    delete(id:string):Promise<void>;
    findChildren(parantId:string):Promise<INode[]>;
}