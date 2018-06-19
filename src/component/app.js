import React, { Component } from 'react';
import { Layout,Button,Modal,message } from 'antd';
import TaskListItem from './taskListItem'
import CreateTaskList from './createNewTask'
import {getTaskListItems,deleteTask} from '../utils/nebulasUtils'
import ShowTask from './showTask'
import EditTask from './editTaskItem'
import ShowCase from './showCase'
import Guide from './guide'

class App extends Component {
  constructor() {
    super()
    this.state = {showCreate:false,taskList:[],cTaskData:null,editData:null,showCase:false,showGuide:false}
  }

  componentDidMount(){
    const hide = message.loading('正在加载任务列表', 0);
    getTaskListItems().then(res=>{
      hide()
      this.setState({taskList:res})
    })
  }

  updateListItems(){
    const hide = message.loading('正在刷新任务列表', 0);
    getTaskListItems().then(res=>{
      hide()
      this.setState({taskList:res})
    })
  }

  showShowCase(){
    this.setState({showCase:true})
  }

  hideShowCase(){
    this.setState({showCase:false})
  }

  hideCreate(){
    this.setState({showCreate:false})
  }

  showCreate(){
    this.setState({showCreate:true})

  }

  hideEdit(){
    this.setState({editData:null})
  }

  showEdit(data){
    this.setState({editData:data})
  }

  hideShowTask(){
    this.setState({cTaskData:null})
  }

  onShowTask(data){
    console.log(data)
    this.setState({cTaskData:data})
  }

  hideGuide(){
    this.setState({showGuide:false})
  }

  onDeleteTask(id){
    const hide = message.loading('正在删除', 0);
    deleteTask(id).then(res=>{
      hide()
      message.success('删除成功...');
      this.updateListItems()
    })
  }

  renderTaskList(){
    const {taskList} = this.state

    let listStyle = {
      width:'800px',
      margin:'0 auto'
    }
    const list = taskList.map((item,i)=>{
      return <TaskListItem  updateList={this.updateListItems.bind(this)} onDelete={this.onDeleteTask.bind(this)} eidtClick={this.showEdit.bind(this)} onDbClick={this.onShowTask.bind(this)} data={item} key={i}></TaskListItem>
    })
    return (
      <div style={listStyle}>
        {list}
      </div>
    )
  }

  renderEdit(){
    const {editData} = this.state
    if(editData){
      return <EditTask updateList={this.updateListItems.bind(this)} editTask={this.state.editData} hideEdit={this.hideEdit.bind(this)}></EditTask>
    }
  }

  renderGuide(){
    const {showGuide} = this.state
    if(showGuide){
      return <Guide handleCancel={this.hideGuide.bind(this)}></Guide>
    }
  }

  renderShowCase(){
    const {showCase} = this.state
    if(showCase){
      return <ShowCase updateList={this.updateListItems.bind(this)} hideShowCase={this.hideShowCase.bind(this)}></ShowCase>
    }
  }
  
  render(){
    const {Header, Footer, Content} = Layout
    let contentStyle = {
      position:'fixed',
      top:'74px',
      left:'10px',
      right:'10px',
      left:'10px',
      bottom:'10px',
      padding:'10px',
      overflow:'auto',
      borderRadius:'10px',
      backgroundColor:'#FFF'
    }
    
    return (
      <div className="container">
        <Layout>
          <Header style={{backgroundColor:'#FFF'}}>
            <span>
              <i style={{fontSize:'35px'}} className="icon iconfont icon-todo"></i>
              <span style={{
                  fontSize: '20px',
                  verticalAlign: '6px',
                  marginLeft:'10px'
              }}>极简TODO</span>
              <Button  onClick={()=>{this.setState({showGuide:true})}} style={{float:'right',marginTop:'15px'}} type="primary">使用说明</Button>
              <Button style={{float:'right',marginTop:'15px',marginRight:'5px'}} onClick={()=>{this.showShowCase()}} type="primary">示例</Button>
              <Button onClick={this.showCreate.bind(this)} style={{float:'right',marginTop:'15px',marginRight:'5px'}} type="primary">新建</Button>

            </span>
          </Header>  
          <Content style={contentStyle}>
              {this.renderTaskList()}
          </Content>
        </Layout>
        <CreateTaskList  updateList={this.updateListItems.bind(this)} show={this.state.showCreate} hideModal={this.hideCreate.bind(this)}></CreateTaskList>
        <ShowTask cTaskData={this.state.cTaskData} hideTaskContent={this.hideShowTask.bind(this)}></ShowTask>
        {this.renderEdit()}
        {this.renderShowCase()}
        {this.renderGuide()}
      </div>
    )
  }
}

export default App;
