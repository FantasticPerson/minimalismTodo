import { Layout,Button,Modal,Input,message } from 'antd';
import React, { Component } from 'react';

import Timer  from '../utils/timer'
import render from '../utils/render'

import TaskListContent from './taskListContent'

import {saveTaskListItem} from '../utils/nebulasUtils'

const { TextArea } = Input;

export default class CreateTaskList extends Component{
    constructor(){
        super()
        this.state={value:null,taskData:[]}

        this.title = React.createRef()
        this.content = React.createRef()
    }

    componentDidMount(){

        this.timer = new Timer(this.handleValueChange.bind(this),1000)

        // saveTaskListItem('123','123')
    }

    handleValueChange(){
        const {value} = this.state
        console.log(value)
        let res = render(value)
        this.setState({taskData:res})
    }

    handleOk(){
        let title = this.title.input.value.trim()
        let content = this.content.textAreaRef.value.trim()

        if(title.length == 0){
            alert('请填写标题')
            return
        }
        if(content.length == 0){
            alert('请填写内容')
            return
        }
        const hide = message.loading('正在提交...', 0);
        setTimeout(hide,2500)
        const {hideModal,updateList} = this.props
        hideModal()
        saveTaskListItem(encodeURIComponent(content),encodeURIComponent(title)).then(res=>{
            message.success('提交成功...');
            updateList()
        })
        
    }

    handleCancel(){
        const {hideModal} = this.props
        hideModal()
    }

    onChange(e){
        let value = e.target.value
        this.timer.reset()
        this.setState({value:value})
    }

    render(){
        const {show} = this.props
        let containerStyle = {
            width:'800px',
            height:'600px'
        }
        let partStyle = {
            width:'390px',
            height:'590px',
            margin:'5px',
            border:'1px solid #eee',
            borderRadius:'10px'
        }
        return (
            <Modal 
                title="新建任务" 
                visible={show}
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                width={840}
            >
                <Input ref={(input)=>{this.title=input}} placeholder="请填写标题" style={{margin:'5px',width:'785px'}}/>
                <div style={containerStyle}>
                    <div style={partStyle}>
                        <TaskListContent data={this.state.taskData}></TaskListContent>
                    </div>
                    <div style={{...partStyle,marginTop:'-595px',marginLeft:'400px'}}>
                        <TextArea ref={(input)=>{this.content=input}} autosize={false} defaultValue={this.state.value} onChange={this.onChange.bind(this)} style={{height:'588px'}}></TextArea>
                    </div>
                </div>
            </Modal>
        )
    }
}