/**
 * desc：
 * author：
 * date：
 */
import React, {PropTypes} from 'react';
import {
    StyleSheet, Text,
    View, WebView, Dimensions, TouchableOpacity, Image
} from 'react-native';
import barColor from "../utils/colors";
import NavigationBar from "../common/NavigationBar";
//获取设备的宽度和高度
var {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');
import {Actions} from 'react-native-router-flux'
export default class NewsDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
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

    render() {
        return (
            <View style={styles.container}>
               {/* <Text>ff{this.props.url}</Text>*/}
                <NavigationBar
                    leftButton={<TouchableOpacity onPress={Actions.pop}><Image style={{width:24,height:24,marginLeft:8}} source={require('../res/images/ic_left.png')}/></TouchableOpacity>
                     }
                    title={"详情"}
                    statusBar={{backgroundColor:barColor.color_bar}}
                />
                <WebView
                    automaticallyAdjustContentInsets={false}
                    source={{uri:this.props.url}}
                    javaScriptEnabled={true}
                    scrollEnabled={true}
                    startInLoadingState={true}
                />

            </View>
        );
    }

}
//样式定义
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

