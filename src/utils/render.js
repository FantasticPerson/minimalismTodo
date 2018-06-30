export default function dataDealer(text){
    let regArr = text.split(/\n.+#? /)
    let arr = text.match(/\n.+#? /g)

    if(arr){
        for(let i=0;i<arr.length;i++){
            if(regArr[i+1]) regArr[i+1] = arr[i].replace('\n','') + regArr[i+1]
        }
    }

    let rangeArr = getRange(regArr)

    let resArr = []
    for(var i = 0;i<regArr.length;i++){
        let matchTxt = regArr[i].match(/.+#? /)
        let isFinish = false
        if(matchTxt[0] && matchTxt[0].indexOf('#') >= 0){
            isFinish = true
        }
        let item = regArr[i]
        let obj = {level:rangeArr[i],isFinish}
        
        obj.items = calcItem(item)
        resArr.push(obj)
    }
    return resArr
}

function calcItem(text){ 
    let items = text.split('\n')
    let resArr = []
    items.map((item)=>{
        if(item.length > 0){
            let result = calcSingleItem(item)
            if(result){
                resArr = resArr.concat(result)
            }
        }
    })
    return resArr
}

function calcSingleItem(text){
    
    let text2 = text.trim()
    let dArr = text2.match(/[.]+#? /)
    if(!dArr){
        return null
    }
    if(dArr[0]){
        text2 = text2.slice(dArr[0].length)
    }
    let resArr = []

    let reg1 = new RegExp(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/)
    let reg2 = new RegExp(/#?\/\/!? /)

    let urlPattern = new RegExp(/((http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?)|(#?\/\/!? )/gim)

    if(text2.length > 0){
        var arr = text2.split(urlPattern)
        var urls = text2.match(urlPattern) || []
        let str = text2
        while(str.length > 0){
            if(urls.length > 0){
                let url = urls[0]
                urls = urls.slice(1)
                let index = str.indexOf(url)
                if(index > 0){
                    let context = str.slice(0,index)
                    str = str.slice(index)
                    resArr.push({type:1,content:context})
                }
                if(reg2.test(url)){
                    let tempStr = str.slice(url.length)
                    if(urls[0]){
                        let url2 = urls[0]
                        let index2 = tempStr.indexOf(url2)
                        if(index2 > 0){
                            let context = tempStr.slice(0,index2)
                            str=str.slice(index2+url.length)
                            let type = url.indexOf('!') >= 0 ? 3 : 2
                            // if(url.indexOf('#') >=0){
                            //     type = type == 3 ? 4 : 5
                            // }
                            resArr.push({type:type,content:context})
                        }
                    } else {
                        let type = url.indexOf('!') >= 0 ? 3 : 2
                        // if(url.indexOf('#') >=0){
                        //     type = type == 3 ? 4 : 5
                        // }
                        resArr.push({type:type,content:str.slice(url.length)})
                        str = ''
                    }
                    
                } else if(reg1.test(url)){
                    resArr.push({type:4,content:url})
                    str = str.slice(url.length)
                } 
                
            } else {
                resArr.push({type:1,content:str})
                str = ''
            }

            str = str.trim()
        }
    }
    return resArr
}

function getDotNum(text){
    let num = 0
    for(var i=0;i<text.length;i++){
        if(text[i] == '.'){
            num++
        } else {
            break
        }
    }
    return num
}

function getRange(arr){
    let domNumArr = arr.map((item)=>{
        return getDotNum(item)
    })

    return domNumArr
}