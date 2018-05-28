/**
 * desc：
 * author：
 * date：
 */
import React from 'react'
import PropTypes from 'prop-types'
import {
    View,
    Text,
    StyleSheet,
    Platform,
    StatusBar
} from 'react-native';
// // barStyle:PropTypes.oneOf(['default','light-content','dark-content']),
const NAVBAR_HEIGHT_ANDROID=50;
const NAVBAR_HEIGHT_IOS=44;
const STATUS_BAR_HEIGHT=24;
const STATUS_BAR_SHAPE={
    backgroundColor:PropTypes.string,
    hidden:PropTypes.bool
};
export default class NavigationBar extends React.Component{
    static propTypes={
        //设置约束
        style:View.propTypes.style,
        title:PropTypes.string,
        titleView:PropTypes.element,
        hide:PropTypes.bool,
        leftButton:PropTypes.element,
        rightButton:PropTypes.element,
        statusBar:PropTypes.shape(STATUS_BAR_SHAPE)
    }
    static defaultProps={
        statusBar:{

            hidden:false
        }
    }
    constructor(props){
        super(props);
        this.state={
            title:'',
            hide:false
        }
    }
    render(){
        let status=<View style={[styles.statusBar,this.props.statusBar]}><StatusBar {...this.props.statusBar}/></View>
        let titleView=this.props.titleView?this.props.titleView:<Text style={styles.title}>
            {this.props.title}
        </Text> //没有设置titleview的时候，使用text文字作为title
        let content=<View style={styles.navBar}>{this.props.leftButton}
            <View style={styles.titleViewContainer}>
                {titleView}
            </View>
            {this.props.rightButton}
        </View>
        return (
            <View style={[styles.container,this.props.style]}>
                {status}
                {content}
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{

    },
    navBar:{
        justifyContent:'space-between',
        alignItems:'center',
        height:Platform.OS==='ios'?NAVBAR_HEIGHT_IOS:NAVBAR_HEIGHT_ANDROID,
        backgroundColor:'#ff776d',
        flexDirection:'row'
    },
    titleViewContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        position:'absolute',
        left:40,
        right:40,
        top:0,
        bottom:0
        //绝对布局，让标题固定在中间
    },
    title:{

        fontSize:20,
        color:'white'
    },
    statusBar:{
        height:Platform==='ios'?STATUS_BAR_HEIGHT:0,
    }
});
