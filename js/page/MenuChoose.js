/**
 * desc：
 * author：
 * date：
 */
import React from "react";
import {
    Image, ScrollView,ToastAndroid,Alert,
    StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback,
    View,
} from "react-native";
import NavigationBar from "../common/NavigationBar";
import barColor from '../utils/colors'
import {Actions} from "react-native-router-flux";
import  LanguageDao ,{FLAG_LANGUAGE} from '../expand/LanguageDao'
import CheckBox from "react-native-check-box";
import  ArrayUtils from '../utils/ArrayUtils'
import DeviceStorage from "../utils/DeviceStorage";

export default class Mine extends React.Component {

    static propTypes = {}

    constructor(props) {
        super(props);
        this.languageDao=new LanguageDao(FLAG_LANGUAGE.flag_key)
        this.saveChange=[];//这是记录有没有改变，简单来说就是一个标记
        this.state = {
            dataArray:[]
        }
    }

    /**
     * 初始化了状态之后，在第一次绘制 render() 之前
     * （能够使用setState()来改变属性 有且只有一次）
     */
    loadData()
    {
      this.languageDao.fetchStore().then(result=>{
          console.log("加载111"+result)
           this.setState({
               dataArray:result
           })
      })
    }
    componentWillMount() {

    }

    /**
     * 这个函数开始，就可以和 JS 其他框架交互了，例如设置计时 setTimeout 或者 setInterval，
     * 或者发起网络请求。这个函数也是只被调用一次
     * （能够使用setState()来改变属性 有且只有一次）
     */
    componentDidMount() {
        this.loadData()
    }

    /**
     * 输入参数 nextProps 是即将被设置的属性，旧的属性还是可以通过 this.props 来获取。在这个回调函数里面，你可以根据属性的变化，
     * 通过调用 this.setState() 来更新你的组件状态，这里调用更新状态是安全的，并不会触发额外的 render()
     * （能够使用setState()来改变属性 多次调用）
     */
    componentWillReceiveProps() {

    }

    /**
     * 当组件接收到新的属性和状态改变的话，都会触发调用 shouldComponentUpdate(...)
     * （不能够使用setState()来改变属性 多次调用）
     */
    shouldComponentUpdate() {
        return true

    }

    /**
     * 如果组件状态或者属性改变，并且上面的 shouldComponentUpdate(...) 返回为 true，就会开始准更新组件
     * （不能够使用setState()来改变属性 多次调用）
     */
    componentWillUpdate() {

    }

    /**
     * 调用了 render() 更新完成界面之后，会调用 componentDidUpdate() 来得到通知
     * （不能够使用setState()来改变属性 多次调用）
     */
    componentDidUpdate() {

    }

    /**
     * 组件要被从界面上移除的时候，就会调用 componentWillUnmount()
     * （不能够使用setState()来改变属性 有且只有一次调用）
     */
    componentWillUnmount() {

    }
    renderView()
    {
        if (this.state.dataArray)
        {
            let len=this.state.dataArray.length
            let views=[];
            for(var i = 0; i < len; i++) {
                views.push(
                    <View key={i} style={styles.container}>
                        <View >
                            {this.renderCheckBox(this.state.dataArray[i])}
                        </View>
                        <View style={styles.line}></View>
                    </View>
                )
            }
           return views
        }
    }
    renderCheckBox(data)
    {
        let leftText=data.name;
        return (
            <CheckBox
                style={{flex:1,height:60,padding:20,alignItems:'center',justifyContent:'center'}}
                onClick={()=>this.onClick11(data)}
                leftText={leftText }
                leftTextStyle={{fontSize:20, color:"#000000"}}
                isChecked={data.checked}
                checkedImage={<Image style={{width:24,height:24}} source={require('../res/images/ic_choose.png')}/>}
                unCheckedImage={<Image style={{width:24,height:24}} source={require('../res/images/ic_nochoose.png')}/>}>
            </CheckBox>
        )
    }
    onClick11(data)
    {
       data.checked=!data.checked;
       //选中设置成未选中，未选中设置成选中
        //没有的加进去，有的去除掉
        ArrayUtils.updateArray(this.saveChange,data)

    }
    render() {
        return (
            <View>
                <NavigationBar
                    title={"分类"}
                    statusBar={{backgroundColor:barColor.color_bar}}
                    leftButton={<TouchableOpacity onPress={()=>this.onBack()}><Image style={{width:24,height:24,marginLeft:8}} source={require('../res/images/ic_left.png')}/></TouchableOpacity>}
                    rightButton={<TouchableOpacity onPress={()=>this.onSave()}><Image style={{width:28,height:28,marginRight:16}} source={require('../res/images/ic_sure.png')}/></TouchableOpacity>}
                />
                <ScrollView >
                    {this.renderView()}
                </ScrollView>
            </View>
        );
    }
    onSave()
    {
        if (this.saveChange.length===0)
        {
            Actions.pop()
            return;
        }
        else {
            for (let i = 0; i < this.state.dataArray.length; i++) {
              if (this.state.dataArray[i].checked)
              { //如果有中的，就说明数量不为0,保存返回。
                  this.languageDao.onSave(this.state.dataArray)
                  Actions.pop({ refresh: { 'fresh': true }})
                  break;
              }else {
                  ToastAndroid.show("标签数不能为0",1000)
              }
            }


        }

    }
    onBack()
    {
        if (this.saveChange.length===0)
        {
            Actions.pop()
            return;
        }else {
            Alert.alert("提示","确定要修改吗？",
                [
                    {text:"取消",onPress:()=>{
                    Actions.pop()},style:'cancel'
                    },{text:"保存",onPress:()=>{
                      this.onSave()
                }}
                ])
        }
    }
}

const styles = StyleSheet.create({
    container:{
      flex:1
    },
    text_style:{
        flex:1,
        fontSize:16,
        height:32,
        width:120,
        justifyContent:'center',
        alignItems:'center'
    },
    line:{
        height:1,
        backgroundColor:'#ff2a00'
    },
    item_ch:{
        flexDirection:'row'
    }

});
