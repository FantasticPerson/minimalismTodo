import { Layout,Button,Modal,Input,message } from 'antd';
import React, { Component } from 'react';
import TaskListContent from './taskListContent'
import render from '../utils/render'

export default class ShowTask extends Component{
    constructor(){
        super()
    }

    handleCancel(){
        const {hideTaskContent} = this.props
        hideTaskContent()
    }

    renderContent(){
        const {cTaskData} = this.props
        if(cTaskData){
            let res = render(decodeURIComponent(cTaskData.content))
            return <TaskListContent data={res}></TaskListContent>
        }
    }

    render(){
        const {cTaskData,handleOk,handleCancel} = this.props
        let title = cTaskData ? decodeURIComponent(cTaskData.title) : ''
        let visible = Boolean(cTaskData)
        return (
            <Modal 
                title={title}
                visible={visible}
                confirmLoading={false}
                onCancel={this.handleCancel.bind(this)}
                footer={null}
                width={840}
            >
                <div style={{width:'800px',height:'600px',overflow:'auto'}}>
                    {this.renderContent()}
                </div>
            </Modal>
        )
    }
}