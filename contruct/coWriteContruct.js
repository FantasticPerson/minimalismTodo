'use strict';

var TaskListItem = function(text){
    if(text){
        var obj = JSON.parse(text)
        this.title = obj.title
        this.content = obj.content
        this.id = obj.id
        this.timestamp = this.timestamp
    } else {
        this.title = ''
        this.content = ''
        this.id = ''
        this.timestamp = Blockchain.transaction.timestamp
    }
}

TaskListItem.prototype = {
    toString:function(){
        return JSON.stringify(this)
    }
}

var naviteConfig = {
    stringify:function(obj){
        return obj
    },
    parse:function(str){
        return str
    }
}

var taskListContract = function(){
    LocalContractStorage.defineMapProperty(this,'taskLists',{
        stringify:function(obj){
            return obj.toString()
        },
        parse:function(str){
            return new TaskListItem(str);
        }
    }),
    LocalContractStorage.defineMapProperty(this,'userTaskIds',naviteConfig),
    LocalContractStorage.defineProperties(this,{
        "maxTaskId":null
    })
}

taskListContract.prototype = {
    init:function(){
        this.maxTaskId = 0
    },
    saveTaskListItem:function(content,title){
        var address = Blockchain.transaction.from;

        var id = parseInt(this.maxTaskId) + 1
        this.maxTaskId = id
        var taskListItem = new TaskListItem()
        taskListItem.id = id
        taskListItem.title = title
        taskListItem.content = content
        this.taskLists.set(id,taskListItem)
        this._saveUserTaskId(id,address)
    },
    updateTaskListItem:function(content,title,id){
        let item = this.taskLists.get(id)
        if(item){
            item.content = content
            item.title = title
            this.taskLists.set(id,item)
        }
    },
    getTaskListItems:function(){
        var address = Blockchain.transaction.from;
        var item = this.userTaskIds.get(address)
        if(!item){
            item = ''
        }
        var ids = item.length == 0 ? [] : item.split(',')
        var itemArr = []
        for(var i=0;i<ids.length;i++){
            var taskItem = this.taskLists.get(ids[i])
            if(taskItem){
                itemArr.push(taskItem)
            }
        }
        return itemArr
    },
    delTaskList(id){
        var address = Blockchain.transaction.from;
        var item = this.userTaskIds.get(address)
        if(!item){
            return
        }
        if(this._checkIsValidId(id)){
            this.taskLists.delete(id)
            this._deleteUserItem(id)
        } else {
            return "id:"+id+" is not exist"
        }
    },
    _checkIsValidId(id){
        var address = Blockchain.transaction.from;
        var item = this.userTaskIds.get(address)
        if(!item){
            return false
        }
        var arr = item.split(',')
        if(arr.indexOf(id+'') >= 0){
            return true
        }
        return false
    },
    _saveUserTaskId(id,address){
        var item = this.userTaskIds.get(address)
        if(!item){
            item = ''
        }
        var arr = item.length == 0 ? [] : item.split(',')
        arr.push(id)
        item = arr.join(',')
        this.userTaskIds.set(address,item)
    },
    _deleteUserItem(id,address){
        var item = this.userTaskIds.get(address)
        if(item && item.length > 0){
            var arr = item.split(',')
            var index = arr.indexOf(id+'')
            if(index >= 0){
                arr.splice(index,1)
                item = arr.join(',')
                this.userTaskIds.set(address,item)
            }
        }
    }

}

module.exports = taskListContract;