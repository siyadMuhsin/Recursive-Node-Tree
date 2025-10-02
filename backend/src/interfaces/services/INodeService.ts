import { INode } from "../models/INode";

export interface INodeService{
    addNode(name:string,parentId?:string):Promise<{ok:boolean,msg?:string,newNode?:INode}>
    getTree():Promise<{ok:boolean,nodes?:any[]}>;
    deleteNode(id:string):Promise<{ok:boolean,msg?:string}>;

}