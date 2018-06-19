import React, { Component } from 'react';
import { Layout,Button,Modal,Input,message } from 'antd';

export default class Guide extends Component{
    render(){
        const {handleCancel} = this.props
        let contentStyle = {padding:'10px',position: 'fixed',top: '65px',bottom: '7px',overflowY: 'auto',width:'500px',margin:'4px auto',left:0,right:0}
        return (
            <Modal 
                title="使用说明" 
                visible={true}
                onCancel={handleCancel}
                width={840}
                footer={null}
            >
                <div>
                    <h1>第一步</h1>
                    <h2>安装chrome钱包插件</h2>
                    <h3>请从Chrome Web Store安装插件 <a href="https://chrome.google.com/webstore/detail/nasextwallet/gehjkhmhclgnkkhpfamakecfgakkfkco" target="_blank">Chrome extension</a></h3>
                    <h1 style={{marginTop:'50px'}}>第二步</h1>
                    <h2>创建新钱包</h2>
                    <h3>打开插件并创建一个钱包</h3>
                    <h1 style={{marginTop:'50px'}}>第三步</h1>
                    <h2>你可以开始啦</h2>
                    <h3>去展示你的才华吧!</h3>
                </div>
            </Modal>
        )
    }
}