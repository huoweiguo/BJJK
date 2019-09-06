import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { styles } from './setPasswordStyle';
import Password from '../../components/password';
import { preAddress, merchantId, regChannelId } from '../../../api';
import commons from '../../../getItems'; 
import Toast from 'react-native-easy-toast';

class SetPassword extends Component {
    constructor (props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {
            password: '',
            token: '',
            userId: '',
            merchantId: '',
            userName: ''
        }
    }

    setSixPassword (value) {
        this.setState({
            password: value
        });
    }

    fetchSetPsw () {
        let _this = this,
            t = new Date().getTime(),
            url = `${preAddress}/userReg/resetPassword?t=${t}`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: _this.state.token,
                userId: _this.state.userId,
                merchantId: _this.state.merchantId
            },
            body: JSON.stringify({
                token: _this.state.token,
                userId: _this.state.userId,
                merchantId: _this.state.merchantId,
                phoneNum: _this.props.navigation.state.params.mobile,
                userPwd: _this.state.password,
                loginType: 2
            })
        })
        .then ( res => res.json())
        .then ( res=> {
            if(res.respCode === '000000') {
                _this.refs.toast.show('密码设置成功');
                setTimeout(function(){
                    _this.props.navigation.navigate('Home');
                }, 1500);
            } else {
                _this.refs.toast.show(res.respMsg);
            }
        })
        .catch( err => {
            console.error(err);
        })
    }


    componentDidMount() {
        const _this = this;
        commons.getItemParams(this, null);
    }
    

    render () {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>设置密码</Text>
                    <Text style={styles.smallText}>输入6位密码，别太复杂，容易忘记</Text>
                </View>
                <View>
                    <Password maxLength={6} onChange={value => {
                        this.setSixPassword(value);
                    }}/>
                </View>

                <View>
                    {
                        this.state.password.length === 6 ? 
                        (<TouchableHighlight underlayColor="#bbcaff" onPress={this.fetchSetPsw.bind(this)} style={styles.btnAct}>
                            <Text style={styles.btnText}>确定</Text>
                        </TouchableHighlight>) : 
                        (<TouchableHighlight underlayColor="#bbcaff" style={styles.btn}>
                            <Text style={styles.btnText}>确定</Text>
                        </TouchableHighlight>)
                    }
                </View>
                <Toast position="center" ref="toast"/>
            </View>
        )
    }
}

export default SetPassword;