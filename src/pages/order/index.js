import React, { Component } from 'react';
import { SafeAreaView, Text, Dimensions, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
const { width, height } = Dimensions.get('window');
import commons from '../../../getItems';

class Order extends Component {

    constructor(props) {
        super(props);
    }

    _onMessage (event) {

    }

    render () {
        return (
            <SafeAreaView style={{flex: 1}}>
                 <WebView
                        ref="webview"
                        style={{width: width, height: height}}
                        source={{uri: `http://huopan-test.baijiajiekuan.com/rn_app/#/order?t=${new Date().getTime()}`}}
                        onMessage={ event => {
                            this._onMessage(event);
                        } }
                >
                </WebView>
            </SafeAreaView>
        )
    }
}

export default Order;