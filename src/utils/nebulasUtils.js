let Nebulas = require('nebulas')
let NebPay = require('nebpay')

let nebPay = new NebPay()
let Neb = Nebulas.Neb
var Account = Nebulas.Account;

let neb = new Neb(new Nebulas.HttpRequest("https://testnet.nebulas.io")) //https://mainnet.nebulas.io   https://testnet.nebulas.io

const dappAddress = "n1fBZojkdPTAQD1eDC267aPG9jRrYFtJqbq" //n1rZsBd7vPrE4R3rEr9pf5S3wvdAnGCHyJ6 test:n1sAsGewgwBtdUnvbCjpPzguX5NPhvfcQgt

function doSaveRequest(callFunction,callArgs,functionName){
    let to = dappAddress;
    let value = "0";
    let tryTimes = 0
    return new Promise((resolve,reject)=>{
        nebPay.call(to,value,callFunction,callArgs,{
            listener:(resp)=>{
                let intervalQuery = setInterval(()=>{
                    tryTimes++;
                    neb.api.getTransactionReceipt({hash: resp["txhash"]})
                    .then((receipt)=>{
                        if(receipt["status"] == 2){
                            console.info(`${functionName} pending......`)
                        } else if(receipt["status"] == 1){
                            clearInterval(intervalQuery)
                            console.info(`${functionName} sucess......`)
                            resolve({'tryTimes':tryTimes})
                        } else {
                            clearInterval(intervalQuery)
                            console.error(`${functionName} save fail.....`)
                            reject('failure')
                        }
                    })
                    .catch(err=>{
                        clearInterval(intervalQuery)
                        console.error(`${functionName} ${JSON.parse(err)}`)
                        reject(err)
                    })
                },5000)
            }
        })
    })
}

function doGetRequest(callFunction,callArgs,functionName){
    let to = dappAddress;
    let value = "0";
    return new Promise((resolve,reject)=>{
        nebPay.simulateCall(to,value,callFunction,callArgs,{
            listener:(res)=>{
                try{
                    let result = res.result
                    if(result){
                        let obj = JSON.parse(result)
                        console.info(`${functionName} ${res.result}`)
                        resolve(obj)
                    } else {
                        reject()
                    }
                } catch(e){
                    console.error(`${functionName} ${JSON.parse(e)}`)
                    reject(e)
                }
            }
        })
    })
}

export function getTaskListItems(){
    let callFunction = "getTaskListItems";
    let callArgs = `[]`;
    return doGetRequest(callFunction,callArgs,'getTaskListItems')
}

export function saveTaskListItem(content,title){
    let callFunction = "saveTaskListItem";
    let callArgs = `["${content}","${title}"]`;
    return doSaveRequest(callFunction,callArgs,'saveTaskListItem')
}

export function deleteTask(id){
    let callFunction = "delTaskList";
    let callArgs = `["${id}"]`;
    return doSaveRequest(callFunction,callArgs,'delTaskList')
}

export function updateTaskListItem(content,title,id){
    let callFunction = "updateTaskListItem";
    let callArgs = `["${content}","${title}","${id}"]`;
    return doSaveRequest(callFunction,callArgs,'updateTaskListItem')
}