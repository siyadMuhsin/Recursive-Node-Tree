import e, { Request, Response } from "express";
import { INodeController } from "../interfaces/controllers/INodeController";
import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import { INodeService } from "../interfaces/services/INodeService";
import { HttpStatus } from "../types/http.status";

@injectable()
export class NodeController implements INodeController {
  constructor(@inject(TYPES.NodeService) private _nodeService: INodeService) {}

  async addNode(req: Request, res: Response): Promise<void> {
    try {
      const { name, parantId } = req.body;
      const node = await this._nodeService.addNode(name, parantId);
      this.sendResponse(res, node, HttpStatus.CREATED);
    } catch (error) {
      const err = error as Error;
      this.sendResponse(
        res,
        { msg: err.message || "Error adding node" },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  async getTree(req: Request, res: Response): Promise<void> {
    try {
      const tree = await this._nodeService.getTree();
      this.sendResponse(res, tree, HttpStatus.OK);
    } catch (error) {
      const err = error as Error;
      this.sendResponse(
        res,
        { msg: err.message || "Error fetching tree" },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  async deleteNode(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      if (!id) {
        this.sendResponse(
          res,
          { ok: false, msg: "Id required" },
          HttpStatus.BAD_REQUEST
        );
        return;
      }
      await this._nodeService.deleteNode(id);
      this.sendResponse(res, { ok: true, msg: "Node Deleted" }, HttpStatus.OK);
    } catch (error) {}
  }

  private sendResponse(res: Response, data: any, status: HttpStatus): void {
    res.status(status).json(data);
  }
}
