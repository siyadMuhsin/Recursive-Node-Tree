// import type { AxiosError } from 'axios'
import {API} from '../../config/axios.config'
import type { INode } from '../interfaces/INode'



const fetchTree=async ()=>{
    try {
        const response=await API.get('/')
        return response.data
        
    } catch (error:AxiosError) {
        throw new Error(error?.response?.data?.msg)
    }
}

const addNode=async (data:Partial<INode>)=>{
    try {
        const response=await API.post('/',data)
        return response.data
    } catch (error:AxiosError) {
        throw new Error(error?.response?.data?.msg)
    }
}
const deleteNode=async(id:string)=>{
    try {
        const response=await API.delete(`/${id}`)
        return response.data
    } catch (error:AxiosError) {
        throw new Error(error?.response?.data?.msg)
    }
}
export {
    fetchTree,addNode,deleteNode
}