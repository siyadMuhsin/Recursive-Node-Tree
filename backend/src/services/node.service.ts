import { injectable,inject } from "inversify";
import { INodeService } from "../interfaces/services/INodeService";
import { TYPES } from "../di/types";
import { INodeRepository } from "../interfaces/repositories/INodeRepository";


@injectable()
export class NodeService implements INodeService{
    constructor(
        @inject(TYPES.NodeRepository) private _nodeRepository:INodeRepository

    ){}

    async addNode(name: string, parantId?: string): Promise<{ ok: boolean; msg?: string; }> {

        const newNode= await this._nodeRepository.create(name,parantId)
        return {ok:true,msg:"Newnode created Successfully"}
        
    }

    async getTree(): Promise<{ ok: boolean; nodes?: any[]; }> {
        const nodes=await this._nodeRepository.findAll();
        const buildTree=(parantId:string | null =null):any[]=>{
            return nodes.filter(node=>String(node.parantId)==String(parantId))
            .map(node=>({
                ...node.toObject(),
                children:buildTree(node._id.toString())
            }))

        }

        const buildingTrees=buildTree()
        return {
            ok:true,nodes:buildingTrees
        }

        
    }

    async deleteNode(id: string): Promise<{ ok: boolean; msg?: string; }> {
        const recursiveDelete=async(nodeId:string)=>{
            const children=await this._nodeRepository.findChildren(nodeId);
            for(let child of children){
                await recursiveDelete(child._id.toString())
            }
            await this._nodeRepository.delete(nodeId)

        }

        await recursiveDelete(id)
        return {
            ok:true
        }
        
    }
}