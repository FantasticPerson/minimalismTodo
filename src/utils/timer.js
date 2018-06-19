class Timer{
    constructor(cb,timer){
        this.cb = cb
        this.timer = timer
        this.intervelId = null
        this.reset=()=>{
            let that = this
            this.now = (new Date()).valueOf()
            if(!that.intervelId){
                that.intervelId = setInterval(()=>{
                    if((new Date()).valueOf() - that.now >= timer){
                        try{
                            cb()
                        } catch(e){
                            console.error(e)
                        }
                        
                        if(that.intervelId){
                            clearInterval(that.intervelId)
                        }
                        that.intervelId = null
                    }
                },timer)
            }
        }
    }
}

export default Timer