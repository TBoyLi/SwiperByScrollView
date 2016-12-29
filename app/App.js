import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    ScrollView,
    Image,
    Dimensions,
	Text,
	Platform
} from 'react-native';

var {height, width} = Dimensions.get('window');
//引入定时器
var TimerMixin = require('react-timer-mixin');
//引入图片数据
var ImageData = [
    require('./assets/img_01.png'),
    require('./assets/img_02.png'),
	require('./assets/img_03.png'),
	require('./assets/img_04.png'),
	require('./assets/img_05.png')
];

var App = React.createClass({

    //注册定时器
    mixins: [TimerMixin],

    getDefaultProps() {
        return {duration: 2000}
    },

    getInitialState() {
        return {
            //当前的页数
            currentPage: 0
        }
    },

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
					ref="scrollView"
                    horizontal={true}
                    // 隐藏水平滚动条
                    showsHorizontalScrollIndicator={false}
                    // 自动分页
                    pagingEnabled={true}
                    // 当一帧滚动结束
                    onMomentumScrollEnd={(e)=>this.onAnimationEnd(e)}
                    // 开始拖拽
                    onScrollBeginDrag={this.onScrollBeginDrag}
                    // 停止拖拽
                    onScrollEndDrag={this.onScrollEndDrag}>
					{this.renderAllImage()}
                </ScrollView>
				<View style={styles.pageViewStyle}>
                  {this.renderPageCircle()}
                </View>
            </View>
        )
    },

	componentDidMount(){
		// 开启定时器
        this.startTimer();
	},

	// 返回所有的图片
    renderAllImage() {
		var allImage = [];
        for (var i = 0; i < ImageData.length; i++) {
            allImage.push(<Image key={i} source={ImageData[i]} style={{
                width: width,
                height: 120
            }}/>);
        }
        return allImage;
    },

	// 返回所有的圆点
	renderPageCircle(){
		// 定义一个数组放置所有的圆点
		var indicatorArr = [];
		var style;
		// 遍历
		for(var i=0; i<ImageData.length; i++){
		   // 判断
		   style = (i==this.state.currentPage) ? {color:'orange'} : {color:'#ffffff'};

		  // 把圆点装入数组
		  indicatorArr.push(
			  <Text key={i} style={[{fontSize:25},style]}>&bull;</Text>
		  );
		}
		// 返回
		return indicatorArr;
	},

	onScrollEndDrag(){
		// 开启定时器
        this.startTimer();
	},

	onScrollBeginDrag(){
		// 停止定时器
        this.clearInterval(this.timer);
	},

	//  当一帧滚动结束的时候调用
    onAnimationEnd(e){
       // 1.求出水平方向的偏移量
       var offSetX = e.nativeEvent.contentOffset.x;

       // 2.求出当前的页数
       var currentPage = Math.floor(offSetX / width);
       // console.log(currentPage);

       // 3.更新状态机,重新绘制UI
       this.setState({
         // 当前的页码
         currentPage: currentPage
       });
   },

	// 开启定时器
    startTimer(){
         // 1. 拿到scrollView
        var scrollView = this.refs.scrollView;
        var imgCount = ImageData.length;

         // 2.添加定时器  this.timer --->可以理解成一个隐式的全局变量
        this.timer = this.setInterval(function () {
            // 2.1 设置圆点
            var activePage = 0;
            // 2.2 判断
            if((this.state.currentPage+1) >= imgCount){ // 越界
               activePage = 0;
            }else{
               activePage = this.state.currentPage+1;
            }

            // 2.3 更新状态机
            this.setState({
              currentPage: activePage
            });

            // 2.4 让scrollView滚动起来
            var offsetX = activePage * width;
            scrollView.scrollResponderScrollTo({x:offsetX, y:0, animated:true});

         }, this.props.duration);

    },
});

const styles = StyleSheet.create({
    container: {
        marginTop: (Platform.OS === 'ios') ? 25 : 0
    },
	pageViewStyle:{
        width:width,
        height:25,
        backgroundColor:'rgba(0,0,0,0.4)',

        // 定位
        position:'absolute',
        bottom:0,

        // 设置主轴的方向
        flexDirection:'row',
        // 设置侧轴方向的对齐方式
        alignItems:'center'
    }
});

AppRegistry.registerComponent('SwiperByScrollView', () => App);
