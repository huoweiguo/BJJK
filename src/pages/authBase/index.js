import React, { Component } from 'react';
import { SafeAreaView, Dimensions, Text, Alert, PermissionsAndroid, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { merchantId } from '../../../api';
import commons from '../../../getItems';
import Toast from 'react-native-easy-toast';
const { width, height } = Dimensions.get('window');
import Contacts from 'react-native-contacts';

class AuthPhone extends Component {

    constructor(props) {
        super(props);
        this.state = {
            apiKey: 'd24f14b51d1f42dcae06057c9002ef17',
            userId: '',
            userName: '',
            token: '',
            merchantId: '',
            uri: '',
            contacts: [],
            phoneListStr: ''
        }
        console.disableYellowBox = true;
    }

    dealJson (contacts) {
        this.setState({
            phoneListStr: ''
        });
        let str = '';
        for (var i = 0; i < contacts.length; i++) {
            str += `${contacts[i].givenName + ' ' + contacts[i].familyName+'&&'}${contacts[i].recordID + '&&'}${contacts[i].phoneNumbers.length ? contacts[i].phoneNumbers[0].number : ''}${ i === contacts.length - 1 ? '': '||'}`;
        }

        this.setState({
            phoneListStr: str
        });
    }

    _onMessage(event) {
        let action = JSON.parse(event.nativeEvent.data),
            { navigate } = this.props.navigation;

        switch (action.type) {
            case 'auth_base_back':
                navigate('Authen');
                break;
            case 'get_phone_list':
                this.refs.webview.injectJavaScript(`receiveMessage("${this.state.phoneListStr}"); true;`);
                break;
            case 'get_base_info':
                var _this = this;
                let str = `${_this.state.token}&&${_this.state.merchantId}&&${_this.state.userId}&&${_this.state.userName}`;
                _this.refs.webview.injectJavaScript(`transferInfo("${str}"); true;`);
                break;
            case 'info_go_back':
                this.props.navigation.navigate('Authen');
                break;
        }
    }

    getPhoneList() {
        let _this = this;
        if(Platform.OS === 'ios') {
            Contacts.getAll((err, contacts) => {
                if (err) {
                    _this.refs.toast.show("获取手机通讯录失败");
                    return false;
                }
                this.dealJson(contacts);
            });
        } else {

            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    'title': 'Contacts',
                    'message': 'This app would like to view your contacts.'
                }
            )
            .then( () => {
            Contacts.getAll((err, contacts) => {
                    if (err === 'denied'){
                        _this.refs.toast.show("获取手机通讯录失败");
                        return false;
                    } else {
                        _this.dealJson(contacts);
                    }
                })
            })
        }
    }

    componentDidMount() {
        var _this = this;
        this.getPhoneList();
        commons.getItemParams(this, null);
    }


    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <WebView
                    ref="webview"
                    source={{ uri: `http://huopan-test.baijiajiekuan.com/rn_app/#/AuthBase?t=${new Date().getTime()}` }}
                    style={{ width: width, height: height }}
                    onMessage={event => {
                        this._onMessage(event);
                    }}
                >
                </WebView>
                <Toast position="center" ref="toast"/>
                
            </SafeAreaView>
        )
    }
}

export default AuthPhone;