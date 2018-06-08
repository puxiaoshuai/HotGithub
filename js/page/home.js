/**
 * desc：
 * author：
 * date：
 */
import React  from 'react';
import {
    Image,
    StyleSheet, Text, TouchableOpacity,
    View, ToastAndroid, ScrollView, TouchableWithoutFeedback
} from 'react-native';
import LoadView from '../common/loadview'
import NavigationBar from '../common/NavigationBar'
import barColor from '../utils/colors'
import ScrollableTabView  , { ScrollableTabBar }from 'react-native-scrollable-tab-view'
import FlatListHome from "./FlatListHome";
import {Actions} from "react-native-router-flux";
import LanguageDao,{FLAG_LANGUAGE} from '../expand/LanguageDao'

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.languageDao=new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.state = {
           news_tabs:[]
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
       this.loadData()

    }
    loadData()
    {
        this.languageDao.fetchStore().then(result=>{
            console.log("加载111"+result)
            this.setState({
                news_tabs:result
            })
        })
    }

    /**
     * 输入参数 nextProps 是即将被设置的属性，旧的属性还是可以通过 this.props 来获取。在这个回调函数里面，你可以根据属性的变化，
     * 通过调用 this.setState() 来更新你的组件状态，这里调用更新状态是安全的，并不会触发额外的 render()
     * （能够使用setState()来改变属性 多次调用）
     */
    componentWillReceiveProps(nextProps) {
      //  console.log(nextProps.fresh)
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

        if (!this.state.news_tabs)
        {
            return (<LoadView/>);
        }else {
            return (
                <View style={styles.container}>
                    <NavigationBar
                        title={"首页"}
                        statusBar={{backgroundColor:barColor.color_bar}}
                        leftButton={<View/>}
                        rightButton={<TouchableWithoutFeedback onPress={()=>Actions.menu_choose()}><Image style={{width:24,height:24,marginRight:16}} source={require('../res/images/ic_menu.png')}/></TouchableWithoutFeedback>}

                    />
                    <ScrollableTabView
                        tabBarBackgroundColor={barColor.color_bar} //tab栏目背景色
                        tabBarActiveTextColor='#4d4a4d'//选中的文字颜色
                        tabBarInactiveTextColor='#fff'//未选中的文字颜色
                        tabBarUnderlineStyle={styles.tabBarUnderline}
                        tabBarTextStyle={styles.text_style}
                        renderTabBar={()=><ScrollableTabBar />}>
                        {
                              this.state.news_tabs.map((item,i)=>{
                                  console.log(JSON.stringify(item));
                                  return  item.checked?(<ScrollView tabLabel={item.name} key={i} >
                                    <FlatListHome id={item.path}/>
                                </ScrollView>):null
                            })
                        }
                    </ScrollableTabView>
                </View>
            );
        }

    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,flexDirection:'column'
    },
    tabBarUnderline: {
        backgroundColor: '#ff6300',
        height: 2,
    },
    text_style:{
        fontSize:14,
    }
});
