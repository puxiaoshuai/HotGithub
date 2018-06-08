/**
 * desc：
 * author：puhao
 * date： 6/6
 */
import React, {PropTypes} from 'react';
import {
    ActivityIndicator, ToastAndroid,
    FlatList,  RefreshControl,
    StyleSheet, Text, TouchableNativeFeedback,
    View, TouchableOpacity, TouchableWithoutFeedback,
} from 'react-native';
import HttpUtils from '../utils/HttpUrils'
import NetUrl from  '../utils/urls'
let totalPage=10;//总的页数
let itemNo=0;//item的个数
let  page=1;
import {Actions} from 'react-native-router-flux'
import Image from  'react-native-image-progress'
import  colorUrils from '../utils/colors'
import * as Progress from 'react-native-progress';

export default class FlatListHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            isLoading:true,
            error:false,
            errorInfo:'',
            news:[]
            ,showFoot:0//  0：隐藏footer   1：已加载完成,没有更多数据   2 ：显示加载中
            ,isRefreshing:false
        }
    }
    _fetchList()
    {
        console.log(page)
        HttpUtils.get(NetUrl.BaseUrl+this.props.id+NetUrl.Page_Size+page).then(result=>{
            let data=result.results//获取json 数据并存在data数组中
            let dataBlob =[]//这是创建该数组，目的放存在key值的数据，就不会报黄灯了
            let i=itemNo
            data.map(function (item) {
                dataBlob .push({
                    key:i,
                    desc:item.desc,
                    time:item.createdAt,
                    who:item.who,
                    url:item.url,
                    img:!item.images?[]:item.images
                })
                i++;
            })
            itemNo=i;
            let foot=0;
            if (page>totalPage)
            {
                foot=1
            }
            this.setState({
                news:this.state.news.concat( dataBlob ),
                isLoading: false,
                showFoot:foot,
                isRefreshing:false,
            })
            data=null ;//重置为空
            dataBlob =null;
        }).catch(error=>{
            this.setState({
                error: true,
                errorInfo: error
            })
        })
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
        this._fetchList()
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
        //第一次加载等待的view
        if (this.state.isLoading && !this.state.error) {
            return this.renderLoadingView();
        } else if (this.state.error) {
            //请求失败view
            return this.renderErrorView();
        }
        //加载数据
        return this.renderData();
    }
    renderData() {
        //onEndReached是在当列表被滚动到距离内容最底部不足onEndReachedThreshold的距离时调用。
        // 0.5表示距离内容最底部的距离为当前列表可见长度的一半时触发。
        return (
            <View style={styles.list_height}>
                <FlatList
                    refreshing={this.state.isRefreshing}
                    data={this.state.news}
                    renderItem={this._renderItemView}
                    ListFooterComponent={()=>this._renderFooter()}
                  /*  onEndReached={()=>this._onEndReached()}
                    onEndReachedThreshold={1}*/
                    ItemSeparatorComponent={this._separator}
                    keyExtractor={this._keyExtractor}
                    //为刷新设置颜色
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={()=>this.handleRefresh()}//因为涉及到this.state
                            colors={['#ff0000', '#00ff00','#0000ff','#3ad564']}
                            progressBackgroundColor="#ffffff"
                        />
                    }
                />
            </View>

        );
    }
    //下拉刷新执行
    handleRefresh = () => {
        this.setState({
            page:1,
            isRefreshing:true,//tag,能下拉刷新中，加载完全，就设置成flase
            news:[]
        });
        this._fetchList()
    }
    //加载等待页
    renderLoadingView() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    animating={true}
                    color='red'
                    size="large"
                />
            </View>
        );
    }
    _keyExtractor = (item, index) => index.toString();
    //加载失败view
    renderErrorView() {
        return (
            <View style={styles.container}>
                <Text>
                    {this.state.errorInfo}
                </Text>
            </View>
        );
    }
    //返回itemView
    _renderItemView({item}) {
        const  gotoDetails=()=>Actions.web_view({'url':item.url})//跳转并传值
        return (
            //切记不能带（）不能写成gotoDetails()
            <TouchableNativeFeedback onPress={gotoDetails}>
                <View>
                    <Text style={styles.title}>{item.desc}</Text>
                    <TouchableWithoutFeedback onPress={()=>ToastAndroid.show("点击图片",2000)}>
                    <Image
                        source={{uri:item.img.length===0?'http://ww1.sinaimg.cn/large/0065oQSqly1fs1vq7vlsoj30k80q2ae5.jpg':item.img[0]}}
                        indicator={Progress.Circle}
                        color={'#ff2702'}
                        strokeCap={'butt'}
                        style={{width:160,height:100,marginLeft:8}}/>
                    </TouchableWithoutFeedback>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.content}>作者: {item.who}</Text>
                    <Text style={styles.content}>时间: {item.time}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback >
        );
    }
    _separator(){
        return <View style={{height:1,backgroundColor:'#d9d1bf'}}/>;
    }
    _renderFooter(){
        if (this.state.showFoot === 1) {
            return (
                <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else if(this.state.showFoot === 2) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator />
                    <Text>正在加载更多数据...</Text>
                </View>
            );
        } else if(this.state.showFoot === 0){
            return (
                <View style={{marginBottom:6}}>

                </View>
            );
        }
    }

    _onEndReached(){
        //如果是正在加载中或没有更多数据了，则返回
        if(this.state.showFoot != 0 ){
            return ;
        }
        //如果当前页大于或等于总页数，那就是到最后一页了，返回
        if((page!=1) && (page>=totalPage)){
            return;
        } else {
            page++;
        }
        //底部显示正在加载更多数据
        this.setState({showFoot:2});
        //获取数据
        if (page>1)
        {
            this._fetchList(page);
        }


    }

}

let styles = StyleSheet.create({
    container: {
        padding:10,
        height:'100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    content: {
        marginTop:4,
        marginBottom:4,
        marginLeft:8,
        marginRight:8,
        fontSize: 14,
        color: 'black',
    },
    title: {
        marginTop:8,
        marginLeft:8,
        marginRight:8,
        fontSize: 15,
        color: '#ffa700',
    },
    footer:{
        flexDirection:'row',
        height:24,
        justifyContent:'center',//主轴为水平，主轴对齐方式为中心
        alignItems:'center',//交叉轴也为中心
        marginBottom:10,
    },

    list_height:{
        height:'100%'
    }
});
