import { Layout,Button,Modal,Input,message } from 'antd';
import React, { Component } from 'react';

import Timer  from '../utils/timer'
import render from '../utils/render'

import TaskListContent from './taskListContent'

import {updateTaskListItem} from '../utils/nebulasUtils'

const { TextArea } = Input;

export default class CreateTaskList extends Component{
    constructor(){
        super()
        this.state={value:null,taskData:[]}

        this.title = React.createRef()
        this.content = React.createRef()
    }

    componentDidMount(){
        console.log('componentDidMount')
        this.timer = new Timer(this.handleValueChange.bind(this),1000)
        const {editTask} = this.props

        let content = decodeURIComponent(editTask.content)

        let res = render(content)
        this.setState({taskData:res})
        // saveTaskListItem('123','123')
    }

    handleValueChange(){
        const {value} = this.state
        console.log(value)
        let res = render(value)
        console.log(res)
        this.setState({taskData:res})
    }

    handleOk(){
        const {editTask,updateList} = this.props
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
        const hide = message.loading('正在更新...', 0);
        setTimeout(hide,2500)
        const {hideEdit} = this.props
        hideEdit()
        updateTaskListItem(encodeURIComponent(content),encodeURIComponent(title),editTask.id).then(res=>{
            message.success('更新成功...');
            updateList()
        })
        
    }

    handleCancel(){
        const {hideEdit} = this.props
        hideEdit()
    }

    onChange(e){
        let value = e.target.value
        this.timer.reset()
        this.setState({value:value})
    }

    render(){
        const {editTask} = this.props
        if(editTask){
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

            let defaultContent = decodeURIComponent(editTask.content)
            let defaultTitle = decodeURIComponent(editTask.title)

            console.log(defaultContent)

            let visible = Boolean(editTask)
            
            return (
                <Modal 
                    title="编辑任务" 
                    visible={visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    width={840}
                >
                    <Input ref={(input)=>{this.title=input}} defaultValue={defaultTitle} placeholder="请填写标题" style={{margin:'5px',width:'785px'}}/>
                    <div style={containerStyle}>
                        <div style={partStyle}>
                            <TaskListContent data={this.state.taskData}></TaskListContent>
                        </div>
                        <div style={{...partStyle,marginTop:'-595px',marginLeft:'400px'}}>
                            <TextArea defaultValue={defaultContent} ref={(input)=>{this.content=input}} autosize={false} onChange={this.onChange.bind(this)} style={{height:'588px'}}></TextArea>
                        </div>
                    </div>
                </Modal>
            )
        } else {
            return <div></div>
        }
    }
}