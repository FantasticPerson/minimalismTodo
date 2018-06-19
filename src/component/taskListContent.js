import React, { Component } from 'react';
import { Button,Tag } from 'antd';
import '../styles/taskListContent.css'


export default class TaskListContent extends Component{
    constructor(){
        super()
    }
    
    render(){
        const {data} = this.props
        console.log(data)
        
        const content = data.map((item,i)=>{
            let marginLeft = `${20*(item.level)}px`
            return <div key={i} className={`tlContentL tlContentL-${item.level > 5 ? 5 : item.level}`} style={{margin:'5px',marginLeft:marginLeft}}>
                {item.items.map((d,i)=>{
                    let tagColor = ['','blue','orange','blue'][d.type-1]
                    if(d.type == 4){
                        return <Tag key={i} color={tagColor}><a target="_blank" href={d.content}>{d.content}</a></Tag>
                    } else {
                        return <Tag key={i} color={tagColor}>{d.content}</Tag>
                    }
                })}
            </div>
        })

        return <div className={`tlContentContainer`}>{content}</div>
    }
}
