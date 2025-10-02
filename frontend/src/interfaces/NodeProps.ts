
import type { INode } from "./INode";

export interface TreeNode extends INode{
    children?:TreeNode[]
}
export interface NodeProps{
    node:TreeNode,
    onAdd:(parantId:string,name:string)=>void;
    onDelete:(id:string)=>void
}