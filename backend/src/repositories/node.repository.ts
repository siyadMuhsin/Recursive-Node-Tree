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
    async findChildren(parantId: string): Promise<INode[]> {
        return await NodeModel.find({parantId})
    }
    async delete(id: string): Promise<void> {
         await NodeModel.findByIdAndDelete(id)
    }
}