import React, { Component } from 'react';
import '../styles/homePage.css'
import {Button} from 'antd'
import { Layout } from 'antd';
import {createBrowserHistory} from 'history'
import StateManager from '../utils/stateManager'

export default class HomePage extends Component{
    constructor(){
        super()
        this.history = StateManager.getHistory()
    }
    render(){
        const nebUrl = "https://nebulas.io/cn/index.html"
        const { Header, Footer, Content } = Layout;
        const fullStyle = {position:'absolute',top:0,bottom:0,right:0,left:0}
        return (
            <div className="homePageContainer">
                <Layout style={{
                    ...fullStyle,
                    background:'transparent',
                    display:'flex'                   
                }}>
                    <Header style={{
                        height:'200px',
                        padding:'30px',
                        background:'transparent'
                    }}>
                        <a className='nebLink' href={nebUrl} target="_blank">
                            
                        </a>
                        <span className='writeSpan'>
                            <i className="icon iconfont icon-New_write"></i>
                            <h2>发现灵感，展示才华</h2>
                        </span>
                    </Header>
                    <Content style={{position:'relative'}}>
                        <div style={{
                            ...fullStyle,
                            display:'flex',
                            flexDirection:'column',
                            padding:'30px',
                            justifyContent:'center',
                            fontFamily: 'cursive'
                        }}>
                            <h2 className='brief'>星云共同写作平台</h2>
                            <p className='briefText'>这是一个用于共同创作文章的平台！
                            <br/>你可以自己新建一篇文章，你也可以在别人文章基础上继续创作!
                            <br/>你可以来这里展示才华，你也可以来这里寻找灵感！
                            <br/>希望你在这里能感到愉悦....</p>

                            <i style={{
                                position: 'absolute',
                                right: '0',
                                top: '113px',
                                fontSize: '180px'
                            }} className="icon iconfont icon-readingandwritingabookwithinkandafeather"></i>
                        </div>
                    </Content>
                    <Footer  onClick={this.onFooterClick.bind(this)} style={{
                        height:'200px',
                        fontSize:'30px',
                        background:'transparent',
                        color:'#FFF',
                        cursor:'pointer'
                    }}>
                        <div className="footerBackGround"></div>
                        <p style={{
                            paddingTop:'20px'
                        }}>开启你的创作之旅吧</p>
                        <p style={{
                            textAlign: 'right',
                            fontSize: '40px',
                            fontWeight: 'bold'
                        }}>GO<i style={{fontSize: '34px',marginLeft: '20px'}} className="icon iconfont icon-cc-arrow-circle-right"></i></p>
                    </Footer>
                </Layout>
            </div>
        )
    }

    onFooterClick(){
        StateManager.routerPush('/article')
    }
}