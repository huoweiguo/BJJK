import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Platform } from 'react-native';
import { styles } from './setPasswordStyle';
import Password from '../../components/password';
import { preAddress, merchantId, regChannelId } from '../../../api';
import Toast, {DURATION} from 'react-native-easy-toast';
import StorageUtil from '../../../storageUtil';

class SetPassword extends Component {
    constructor (props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {
            code: '',
            time: 60,
            getText: '',
            smsStatus: false,
            mobile: '',
            device: '',
            captchaId: '',
            validate: ''
        }
    }

    _getSmsCode () {
        this.props.navigation.navigate('LoginH5');
    }

    componentDidMount () {
        const mobile = this.props.navigation.state.params.mobile;
        this.setState({
            mobile: mobile,
            device: Platform.OS
        });
    }

    inputSmsCode (value) {
        this.setState({
            code: value
        });

        if (value.length >= 4) {
            this.linkToSetPassWord(value);
        }
    }

    linkToSetPassWord (code) {
        let _this = this,
            t = new Date().getTime(),
            url = `${preAddress}/userReg/codeLogin?t=${t}`;
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                phoneNum: _this.state.mobile,
                merchantId: merchantId,
                regChannelId: regChannelId,
                code: code,
                device: Platform.OS,
                version: '',
                deviceId: ''
            })
        })
        .then (res => res.json())
        .then ( res => {
            if (res.respCode === '000000') {
                StorageUtil.save('token',res.data.token);
                StorageUtil.save('userId', res.data.userId);
                StorageUtil.save('merchantId', res.data.merchantId);
                StorageUtil.save('userName', res.data.userName);
                setTimeout( function() {
                    let { navigate } = _this.props.navigation;
                    if (res.data.hasPassword === 'N') {
                        navigate('SetPassword',{
                            mobile: _this.state.mobile
                        });
                    } else {
                        navigate("Home");
                    }
                    
                }, 1500);
                _this.refs.toast.show('登录成功');
            } else {
                _this.refs.toast.show(res.respMsg);
            }
            console.log(res);
        }) 
        .catch( err =>{
            console.error(err)
        });
    }


    render () {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>短信验证码</Text>
                    <Text style={styles.smallText}>短信验证码已发送至{this.state.mobile}</Text>
                </View>
                <View>
                    <Password maxLength={4} isShow={true} onChange={value => {
                        this.inputSmsCode(value);
                    }}/>
                </View>
                <View style={{marginTop: 20}}>
                    {
                        this.state.smsStatus ?
                        <Text style={{textAlign:'center'}}><Text style={{color:'#567bff',}}>{this.state.getText}</Text>后重新获取</Text> :
                        <Text style={{color:'#567bff',textAlign:"center"}} onPress={this._getSmsCode.bind(this)}>重新获取验证码</Text>
                    }
                    
                </View>

                {/* <View>
                    <TouchableHighlight underlayColor="#bbcaff" style={styles.btn}>
                        <Text style={styles.btnText}>确定</Text>
                    </TouchableHighlight>
                </View> */}

                <Toast  position="center" ref="toast"/>
            </View>
        )
    }
}

export default SetPassword;