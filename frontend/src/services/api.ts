// import type { AxiosError } from 'axios'
import {API} from '../../config/axios.config'
import type { INode } from '../interfaces/INode'



const fetchTree=async ()=>{
    try {
        const response=await API.get('/')
        return response.data
        
    } catch (error:AxiosError) {
        console.log(error,'erererere');

        throw new Error(error?.response?.data?.message)
    }
}

const addNode=async (data:Partial<INode>)=>{
    try {
        const response=await API.post('/',data)
        return response.data
    } catch (error:AxiosError) {
        throw new Error(error?.response?.data?.message)
    }
}
const deleteNode=async(id:string)=>{
    try {
        const response=await API.delete(`/${id}`)
        return response.data
    } catch (error:AxiosError) {
        console.log(error);
        
        throw new Error(error?.response?.data?.message)
    }
}
export {
    fetchTree,addNode,deleteNode
}