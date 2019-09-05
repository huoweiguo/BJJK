import React, { Component } from 'react';
import { WebView, SafeAreaView, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

class RealName extends Component {
    constructor (props) {
        super(props);
    }

    _onMessage(event) {
        let action = JSON.parse(event.nativeEvent.data),
            { navigate } = this.props.navigation;
    }
    
    render () { 
        return (
            <SafeAreaView style={{flex: 1}}>
                <WebView 
                    style={{width: width, height: height}}
                    source={{uri: ''}}
                    onMessage = {event => {
                        this._onMessage(event);
                    }}
                >
                </WebView>
            </SafeAreaView>
        )
    }
}

export default RealName;