export interface INodeService{
    addNode(name:string,parantId?:string):Promise<{ok:boolean,msg?:string}>
    getTree():Promise<{ok:boolean,nodes?:any[]}>;
    deleteNode(id:string):Promise<{ok:boolean,msg?:string}>;

}