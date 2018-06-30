import { Layout,Button,Modal,Input } from 'antd';
import React, { Component } from 'react';

import Timer  from '../utils/timer'
import render from '../utils/render'

import TaskListContent from './taskListContent'


const { TextArea } = Input;

export default class CreateTaskList extends Component{
    constructor(){
        super()
        this.state={value:null}

        this.title = React.createRef()
        this.content = React.createRef()
    }

    componentDidMount(){

        this.timer = new Timer(this.handleValueChange.bind(this),1000)

        let defaultValue = `.# 事件1(已完成) // test\n.. 事件1-1 // test\n... 事件1-1-1 https://www.baidu.com\n.. 事件 1-2 //! 很重要\n. 事件2 // 事件`

        let res = render(defaultValue)
        this.setState({taskData:res})
    }

    handleValueChange(){
        const {value} = this.state
        console.log(value)
        let res = render(value)
        this.setState({taskData:res})
    }

    handleCancel(){
        const {hideShowCase} = this.props
        hideShowCase()
    }

    onChange(e){
        let value = e.target.value
        this.timer.reset()
        this.setState({value:value})
    }

    render(){

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

        let defaultValue = `.# 事件1(已完成) // test\n.. 事件1-1 // test\n... 事件1-1-1 https://www.baidu.com\n.. 事件 1-2 //! 很重要\n. 事件2 // 事件`
        
        return (
            <Modal 
                title="使用示例" 
                visible={true}
                onCancel={this.handleCancel.bind(this)}
                width={840}
                footer={null}
            >
                <div style={containerStyle}>
                    <div style={partStyle}>
                        <TaskListContent data={this.state.taskData}></TaskListContent>
                    </div>
                    <div style={{...partStyle,marginTop:'-595px',marginLeft:'400px'}}>
                        <TextArea defaultValue={defaultValue} ref={(input)=>{this.content=input}} autosize={false} onChange={this.onChange.bind(this)} style={{height:'588px'}}></TextArea>
                    </div>
                </div>
            </Modal>
        )
    }
}