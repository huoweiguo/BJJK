import React, { Component } from 'react';
import { SafeAreaView, Text, Dimensions, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
const { width, height } = Dimensions.get('window');
import commons from '../../../getItems';
import { regChannelId } from '../../../api';

class First extends Component {

    constructor (props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {
            userId: '',
            userName: '',
            token: '',
            merchantId: '',
            device: Platform.OS,
            regChannelId: regChannelId
        }
    }

    _onMessage (event) {
        console.log(event);
        let action = JSON.parse(event.nativeEvent.data),
            {navigate} = this.props.navigation;
        
        switch (action.type) {
            case 'get_user_info':
                let {token, merchantId, userId, device, regChannelId} = this.state;
                let str = `${token}&&${merchantId}&&${userId}&&${device}&&${regChannelId}`;
                this.refs.webview.injectJavaScript(`receiveBaseInfo("${str}"); true;`);
                break;
        }
    }

    componentDidMount () {
        commons.getItemParams(this, null);
    }   

    render () {
        return (
            <SafeAreaView style={{flex: 1}}>
                <WebView
                        ref="webview"
                        style={{width: width, height: height}}
                        source={{uri: `http://huopan-test.baijiajiekuan.com/rn_app/#/First?t=${new Date().getTime()}`}}
                        onMessage={ event => {
                            this._onMessage(event);
                        } }
                >
                </WebView>
            </SafeAreaView>
        )
    }
}

export default First;