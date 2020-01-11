import React, { useEffect } from "react"
import useStore from "../../../../utils/useStore"
import { useObserver } from "mobx-react-lite"
import './detail.css'
import { History } from 'history'

interface PropeType {
    history: History
    location: Location
    [name: string]: any,
}

let Detail: React.FC<PropeType> = (props: any) => {
    let store = useStore();
    let { Topic } = store;
    useEffect(() => {
        //id 通过字符串的方法解决而得，typeOf 为 string ，对于后期的使用很不方便 
        // console.log(props.location.pathname.split('=')[1], 'id') 
        let detaiL = props.match.params.id
        Topic.getTypeDetail(detaiL)
        Topic.commentList({ valueId: detaiL, typeId: 1, page: 1, size: 5 })
        Topic.topicDetails({ id: detaiL })
    }, [Topic])

    let many = (id: number) => {
        props.history.push(`/many/${id}/typeId=1`)
    }

    let writes = (id: number) => {
        props.history.push(`/liuyan/${id}`)
    }

    let backTop = (id: number) => {
        Topic.getTypeDetail(id)
        Topic.commentList({ valueId: id, typeId: 1, page: 1, size: 5 })
        // props.history.push(`/specialDetail?id=${detaiL}`)
        props.history.push('/specialDetail')
        // props.history.push(`/specialDetail/${id}`)
    }

    return useObserver(() => (
        <div className="specaidetail">
            {
                Topic.title.map((item, index) => {
                    return <div className="specialele" key={index}>
                        <p className="header">
                            <a href="/main/special" className="p-a">&lt;</a>
                            <span className="header-span">{item.title}</span>
                        </p>
                        {/* react官网的属性   dangerouslySetInnerHTML渲染返回值为标签的数据*/}
                        <div dangerouslySetInnerHTML={{ __html: item.content }} className="detail"></div>
                        <div className="message">
                            <div className="messageTitle">
                                <p>精品留言</p>
                                <p onClick={() => writes(item.id)}>编辑</p>
                            </div>
                            <div className="message-box">
                                {
                                    Topic.dlist.length == 0 ? <div className="message-talk">等你来评论！</div> : Topic.dlist.map((ite, ind) => {
                                        return <div className="messagename" key={ind}>
                                            <p className="p1">
                                                <span className="span1">
                                                    {  // 对象套对象时，解决按条件渲染数据
                                                        Object.values(ite.user_info).length > 0 ? ite.user_info.username : "匿名用户"
                                                    }
                                                </span>
                                                <span className="span2">{ite.add_time}</span>
                                            </p>
                                            <p className="p2">{ite.content}</p>
                                        </div>
                                    })
                                }
                            </div>
                            <div>
                                {
                                    Topic.dlist.length == 0 ? "" : <div className="look" onClick={() => many(item.id)}>查看更多评论</div>
                                }
                            </div>
                        </div>
                    </div>
                })
            }
            <div className="recommend">
                <p className="recommend-p">推荐专题</p>
                <div className="recommend-image">
                    {
                        Topic.zhuanTi.map((items, indexs) => {
                            return <div key={indexs} className="small-box" onClick={()=>backTop(items.id)}>
                                <img src={items.scene_pic_url} alt="" className="small-img" />
                                <p className="small-p">{items.title}</p>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    ))
}
export default Detail;