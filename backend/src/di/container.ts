import { Container } from "inversify";
import { NodeRepository } from "../repositories/node.repository";
import { TYPES } from "./types";
import { NodeService } from "../services/node.service";
import { NodeController } from "../controllers/node.controller";

const container=new Container()


container.bind<NodeRepository>(TYPES.NodeRepository).to(NodeRepository)
container.bind<NodeService>(TYPES.NodeService).to(NodeService),
container.bind<NodeController>(TYPES.NodeController).to(NodeController)







export default container