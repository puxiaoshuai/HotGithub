import  React,{Component} from 'react'
import {AsyncStorage,ToastAndroid} from 'react-native'
export  var  FLAG_LANGUAGE={flag_lan:'flag_language',flag_key:'flag_key'}
import  keys from '../res/keys'  //这是转化成对象了
import DeviceStorage from "../utils/DeviceStorage";
export  default  class  LanguageDao {
    constructor(flag) {
        this.flag = flag;
    }

    fetchStore()  //
    {
        return new Promise((resolve, reject) => {
            DeviceStorage.get(this.flag).then((data) => {
                if (data) //若果获取不为空,表示有存储就返回
                {
                    resolve(data) //返回对象
                } else {
                    //为空，加载默认的，当可以值相等的时候，才加。
                    let data = this.flag === FLAG_LANGUAGE.flag_key ? keys : null
                    console.log(data);
                    this.onSave(data)
                    resolve(data)//返回对象
                }
            }).catch((err) => {
                console.log(err);
                reject(err)
            })
        })
    }
    onSave(data)
    {
        DeviceStorage.save(this.flag, data)//保存成字符串
    }
}

