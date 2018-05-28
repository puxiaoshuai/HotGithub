/**
 * desc：
 * author：
 * date：
 */
import React, {PropTypes} from 'react';
import {
    Image,
    StyleSheet, Text, TouchableOpacity,
    View,
} from 'react-native';
import LoadView from '../common/loadview'
import NavigationBar from '../common/NavigationBar'

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message:''
        }
    }

    static propTypes = {}

    /**
     * 初始化了状态之后，在第一次绘制 render() 之前
     * （能够使用setState()来改变属性 有且只有一次）
     */
    componentWillMount() {

    }

    /**
     * 这个函数开始，就可以和 JS 其他框架交互了，例如设置计时 setTimeout 或者 setInterval，
     * 或者发起网络请求。这个函数也是只被调用一次
     * （能够使用setState()来改变属性 有且只有一次）
     */
    componentDidMount() {

     this._fetch()


    }

    /**
     * 输入参数 nextProps 是即将被设置的属性，旧的属性还是可以通过 this.props 来获取。在这个回调函数里面，你可以根据属性的变化，
     * 通过调用 this.setState() 来更新你的组件状态，这里调用更新状态是安全的，并不会触发额外的 render()
     * （能够使用setState()来改变属性 多次调用）
     */
    componentWillReceiveProps() {

    }
     _fetch()
     {
         fetch('https://facebook.github.io/react-native/movies.json',{
             method:'GET',//如果为GET方式，则不要添加body，否则会出错    GET/POST
             header:{//请求头
             },

         })
             .then((response) => response.json())//将数据转成json,也可以转成 response.text、response.html
             .then((responseJson) => {//获取转化后的数据responseJson、responseText、responseHtml
                 this.setState({
                     message:responseJson.title
                 })
             }).catch((error) => {
             console.log(error);
         });
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
    render() {

        if (!this.state.message)
        {
            return (
                <LoadView/>

            );
        }
        return (
            <View style={styles.container}>
                <NavigationBar
                    leftButton={<TouchableOpacity><Image style={{width:24,height:24,marginLeft:8}} source={require('../res/images/ic_left.png')}/></TouchableOpacity>}
                    title={"首页"}
                    rightButton={<TouchableOpacity><Image style={{width:24,height:24,marginRight:8}} source={require('../res/images/ic_left.png')}/></TouchableOpacity>}
                    statusBar={{backgroundColor:'#ff776d'}}
                />
                <Text onPress={()=>this._fetch()}>点击加载</Text>
               <Text>{this.state.message}</Text>

            </View>
        );

    }
}

const styles = StyleSheet.create({
    container:{

    },
});
