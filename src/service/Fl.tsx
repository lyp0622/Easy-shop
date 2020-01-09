import request from '../utils/request'

//获取分类页初始化信息
export let getCategory=()=>{
    return request.get('/catalog/index')
}

//获取当前分类信息和子分类
export let fn=(parame:any)=>{
    return request.get('/catalog/current',{id: Number})
}

//获取分类ID分类Nav数据
export let goods=(id:number)=>{
    return request.get(`/goods/category?id=${id}`)
}

