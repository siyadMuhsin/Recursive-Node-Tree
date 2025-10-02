export interface INodeService{
    addNode(name:string,parentId?:string):Promise<{ok:boolean,msg?:string}>
    getTree():Promise<{ok:boolean,nodes?:any[]}>;
    deleteNode(id:string):Promise<{ok:boolean,msg?:string}>;

}