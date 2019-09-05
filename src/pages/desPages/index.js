import React, { Component } from 'react';
import { SafeAreaView,WebView, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
class DesPages extends Component {
    constructor (props) {
        super(props) ;
        this.state = {
            src: props.navigation.state.params.pages
        }
    }

    render () {
        return (
            <SafeAreaView style={{flex: 1}}>
                <WebView
                    source={{uri: this.state.src}}
                    style={{ width: width, height: height }}
                >
                </WebView>
            </SafeAreaView>
        )
    }
}

export default DesPages;