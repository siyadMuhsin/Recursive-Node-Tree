import { Request, Response } from "express";

export interface INodeController{
    addNode(req:Request,res:Response):Promise<void>;
    getTree(req:Request,res:Response):Promise<void>;
    deleteNode(req:Request,res:Response):Promise<void>;
    
}