import { injectable, inject } from "inversify";
import { INodeService } from "../interfaces/services/INodeService";
import { TYPES } from "../di/types";
import { INodeRepository } from "../interfaces/repositories/INodeRepository";
import { INode } from "../interfaces/models/INode";

@injectable()
export class NodeService implements INodeService {
  constructor(
    @inject(TYPES.NodeRepository) private _nodeRepository: INodeRepository
  ) {}

  async addNode(
    name: string,
    parentId?: string
  ): Promise<{ ok: boolean; msg?: string; newNode?: INode }> {
    const normalizedName = name.trim();

    if (!normalizedName) {
      throw new Error("Node name cannot be empty");
    }
    const existingNode = await this._nodeRepository.findOne({
      name: normalizedName,
      parentId: parentId || null,
    });
    console.log(existingNode);
    if (existingNode) {
      throw new Error("Node with this name already exists");
    }

    const newNode = await this._nodeRepository.create(normalizedName, parentId);

    console.log("Created node:", newNode);

    return { ok: true, msg: "New node created successfully", newNode };
  }

  async getTree(): Promise<{ ok: boolean; nodes?: any[] }> {
    const nodes = await this._nodeRepository.findAll();
    const buildTree = (parantId: string | null = null): any[] => {
      return nodes
        .filter((node) => String(node.parentId) == String(parantId))
        .map((node) => ({
          ...node.toObject(),
          children: buildTree(node._id.toString()),
        }));
    };

    const buildingTrees = buildTree();
    return {
      ok: true,
      nodes: buildingTrees,
    };
  }

  async deleteNode(id: string): Promise<{ ok: boolean; msg?: string }> {
    const recursiveDelete = async (nodeId: string) => {
      const children = await this._nodeRepository.findChildren(nodeId);
      for (let child of children) {
        await recursiveDelete(child._id.toString());
      }
      await this._nodeRepository.delete(nodeId);
    };

    await recursiveDelete(id);
    return {
      ok: true,
    };
  }
}
