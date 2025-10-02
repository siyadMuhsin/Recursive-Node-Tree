export interface TreeNodeType {
  _id: string;
  name: string;
  parentId?: string | null;
  children?: TreeNodeType[];
}