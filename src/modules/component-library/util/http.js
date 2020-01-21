import vue from 'vue';
import { Message } from 'element-ui';

/**
 * 
 * 返回参数结构： { code: 0,  msg: '', data:[] }
 *
 */
export function httpGet(url, params) {
    let error = ''
    // eslint-disable-next-line
    const reg = new RegExp('(^(https?)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$)|(^/[A-Za-z0-9-_/]+$)')
    if(!reg.test(url)) {
        error = 'url格式不正确！'
    }
    if(!vue.http) {
        error = 'vue.http对象不存在，请添加HTTP库!'
    }
    if(error) {
        Message.error(error) 
        return Promise.reject(new Error(error))
    }
    return new Promise((resolve, reject) =>{        
        vue.http.get(url, {            
            params: params        
        }).then(response => {
            Message.success('请求成功,请确认labelField和valueField!')
            resolve(response)  
        }).catch(err =>{
            reject(err)        
        })
    })
}
