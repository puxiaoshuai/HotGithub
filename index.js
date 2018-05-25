import {AppRegistry, Image, View,StyleSheet} from 'react-native';
import  TabNavigator from  'react-native-tab-navigator'
import React from "react";
import  MyTest from './js/page/test'
import  MyTest1 from './js/page/test1'
class BottomTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab:'首页'
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
    _renderTabsItems(selectTab,icon,selectedIcon,Component,bage_tab)
    {
        return(
            <TabNavigator.Item
                selected={this.state.selectedTab === selectTab} //选中那个
                title={selectTab}
                titleStyle={styles.tabText}
                selectedTitleStyle={styles.selectedTabText}
                renderIcon={() => <Image style={styles.icon} source={icon} />}
                renderSelectedIcon={() => <Image style={styles.icon} source={selectedIcon} />}
                onPress={() => this.setState({ selectedTab: selectTab })}//设置选中的那个
                badgeText={bage_tab}

            >
            <Component></Component>
            </TabNavigator.Item>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <TabNavigator tabBarStyle={ styles.bar_height}>
                    {this._renderTabsItems("首页",require('./res/images/ic_homeno.png'),require('./res/images/ic_homechoose.png'),MyTest,"")}
                    {this._renderTabsItems("推荐",require('./res/images/ic_tuijianno.png'),require('./res/images/ic_tuijian.png'),MyTest1,"")}
                    {this._renderTabsItems("我的",require('./res/images/ic_mineno.png'),require('./res/images/ic_minechoose.png'),MyTest,"1")}
                </TabNavigator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    tabText:{
        color:'#000000',
        fontSize:12
    },
    selectedTabText:{
        color:'#D81E06'
        ,fontSize:12
    },
    icon:{
        width:24,
        height:24
    },
    bar_height:{
        height:54,
    },
    page:{
        flex:1,
        color:"#ffc56a"
    }


})

AppRegistry.registerComponent('HotGithub', () => BottomTabs);
