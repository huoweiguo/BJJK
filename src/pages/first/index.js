import React, { Component } from 'react';
import { SafeAreaView, Text, Dimensions, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import BottomNav from '../../components/bottomNav';
import commons from '../../../getItems';
import { regChannelId } from '../../../api';
import StorageUtil from '../../../storageUtil';
const { width, height } = Dimensions.get('window');

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
        let action = JSON.parse(event.nativeEvent.data),
            {navigate} = this.props.navigation,
            {token, merchantId, userId, device, regChannelId} = this.state;
        StorageUtil.save('regChannelId',regChannelId);
        StorageUtil.save('device',device);
        console.log(token, merchantId, userId, device, regChannelId);
        switch (action.type) {
            case 'get_user_info':
                let str = `${token}&&${merchantId}&&${userId}&&${device}&&${regChannelId}`;
                this.refs.webview.injectJavaScript(`receiveBaseInfo("${str}"); true;`);
                break;
            case 'go_authen_pages':
                StorageUtil.save('productName',action.productName);
                this.props.navigation.navigate('Authen', {
                    token: this.state.token,
                    userId: this.state.userId,
                    merchantId: this.state.merchantId,
                    productId: action.productId
                });
                break;
            case 'go_loanDetail_pages':
                this.props.navigation.navigate('LoanDetail',{
                    sysSeqId: action.sysSeqId,
                    productId: action.productId,
                    productName: action.productName
                });
                StorageUtil.save('productName',action.productName);
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
                <BottomNav type="loan" navigate={this.props.navigation.navigate}/>
            </SafeAreaView>
        )
    }
}

export default First;