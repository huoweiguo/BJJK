import React, { Component } from 'react';
import { SafeAreaView, Text, Dimensions, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import BottomNav from '../../components/bottomNav';
const { width, height } = Dimensions.get('window');
import commons from '../../../getItems';

class Order extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            userId: '',
            merchantId: '',
            userName: ''
        }
    }

    _onMessage (event) {
        let action = JSON.parse(event.nativeEvent.data),
            {navigate} = this.props.navigation;
        switch (action.type) {
            case 'get_user_info':
                let {token, merchantId, userId} = this.state;
                let str = `${token}&&${merchantId}&&${userId}`;
                this.refs.webview.injectJavaScript(`receiveBaseInfo("${str}"); true;`);
                break;
            case 'many_and_over':
                navigate('RepayDetail3', {
                    sysSeqId: action.sysSeqId,
                    pendingRepayAmt: action.pendingRepayAmt
                });
                break;
            case 'single_and_over':
                navigate('RepayDetail2', {
                    singleRepayPlanId: action.singleRepayPlanId
                });
                break;
            case 'single_and_use':
                navigate('RepayDetail', {
                    singleRepayPlanId: action.singleRepayPlanId,
                    sysSeqId: action.sysSeqId
                });
                break;
            case 'many_and_use':
                navigate('RepayNext', {
                    sysSeqId: action.sysSeqId,
                    repayAmt: action.repayAmt
                });
                break;
        }
    }

    componentDidMount() {
        commons.getItemParams(this, null);
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
                <BottomNav type="repay" navigate={this.props.navigation.navigate}/>
            </SafeAreaView>
        )
    }
}

export default Order;