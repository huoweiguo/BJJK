import React, { Component } from 'react';
import { WebView, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
class DesPages extends Component {
    constructor (props) {
        super (props) ;
        this.state = {
            src: this.props.navigation.state.params.pages
        }
    }
    render () {
        return (
            <WebView
                source={{uri: this.state.src}}
                style={{ width: width, height: height }}
            >
            </WebView>
        )
    }
}

export default DesPages;