import { Router } from "express";
import container from "../di/container";
import { TYPES } from "../di/types";
import { INodeController } from "../interfaces/controllers/INodeController";

const router=Router()
const nodeController=container.get<INodeController>(TYPES.NodeController)


router.route('/')
.post(nodeController.addNode.bind(nodeController))
.get(nodeController.getTree.bind(nodeController))

router.delete('/:id',nodeController.deleteNode.bind(nodeController))

export default router

