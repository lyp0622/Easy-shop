import request from '../utils/request';

//专题页面的初始渲染
export let getSpecialData = (params: any)=>{
    return  request.get('/topic/list',params)
}

//专题页面的详情
export let getTypeDetail = (id: number)=>{
    return  request.get(`/topic/detail?id=${id}`)
}

//精品留言
export let commentList = (params: any)=>{
    return  request.get('/comment/list',{params})
}

//根据专题
export let topicDetails = (params: any) =>{
    return request.get('/topic/related',params)
}






// //专题页面的初始渲染
// export let getSpecialData = (params: any)=>{
//     return  request.get('/topic/list',{page:params.currentPage,size:params.pageSize})
// }

// //专题页面的详情
// export let getTypeDetail = (params: any)=>{
//     return  request.get('/topic/detail',{id:params.id})
// }

// //精品留言
// export let commentList = (params: any)=>{
//     return  request.get('/comment/list',{valueId:params.valueId,typeId:params.typeId,page:params.page,size:params.size})
// }

// //根据专题
// export let topicDetails = (params: any) =>{
//     return request.get('/topic/related',{id:params.id})
// }