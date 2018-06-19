import React, { Component } from 'react';
import { Button } from 'antd';
import '../styles/taskListItem.css'
export default class TaskListItem extends Component{
    constructor(){
        super()
    }

    render(){
        let itemStyle = {
            margin:'5px 10px',
            border:'1px solid #eee',
            borderRadius:'10px',
            padding:'5px 10px',
            cursor:'pointer'
        }
        let spanStyle={
            width:'615px',
            display:'inline-block',
            marginRight:'10px'
        }
        const {data,onDbClick,eidtClick,onDelete} = this.props

        return (
            <div onDoubleClick={()=>{onDbClick(data)}} style={itemStyle} className="taskListItem">
                <span style={spanStyle}>{decodeURIComponent(data.title)}</span>
                <Button onClick={()=>{eidtClick(data)}} type="primary" style={{marginRight:'5px'}}>编辑</Button>
                <Button onClick={()=>{onDelete(data.id)}}>删除</Button>
            </div>
        )
    }
}