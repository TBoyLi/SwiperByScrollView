import React, {Component} from 'react';
import{
	AppRegistry,
    StyleSheet,
    View,
    Text
} from 'react-native';

class App extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
            <View style={styles.container}>
                <Text>
                    Welcome react-native!
                </Text>
            </View>
		)
	}
}

const styles = StyleSheet.create({
    container : {
        flex: 1
    }
});

AppRegistry.registerComponent('SwiperByScrollView', () => App);
