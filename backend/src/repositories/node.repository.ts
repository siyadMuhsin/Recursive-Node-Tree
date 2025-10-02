import { FilterQuery } from "mongoose";
import { INode } from "../interfaces/models/INode";
import { INodeRepository } from "../interfaces/repositories/INodeRepository";
import { NodeModel } from "../models/node.model";

export class NodeRepository implements INodeRepository{
    async create(name: string, parentId?: string | null): Promise<INode> {
        const newNode=new NodeModel({name,parentId})
        return await newNode.save()
    }
    async findAll(): Promise<INode[]> {
        return await NodeModel.find()
        
    }
    async findChildren(parentId: string): Promise<INode[]> {
        return await NodeModel.find({parentId})
    }
    async delete(id: string): Promise<void> {
         await NodeModel.findByIdAndDelete(id)
    }
    async findOne(data: FilterQuery<INode>): Promise<INode[] | null> {
        return await NodeModel.findOne(data)
    }
}