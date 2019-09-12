import React, { Component } from 'react';
import { View, Text, Image, DeviceEventEmitter} from 'react-native';
import { styles } from './initStyle';
import RotateInit from '../../components/rotateInit';
import StorageUtil from '../../../storageUtil';
import {postAddress, preAddress} from '../../../api';
import queryString from 'querystring';
import commons from '../../../getItems';
import axios from 'axios';

class Init extends Component {
    constructor (props) {
        super(props);
        console.disableYellowBox = true;
        this.timer = null;
        this.state = {
            count: 10,
            isShow: false,
            cancel: null,
            productLoanAmt: 0,
            isPass: false,
            loanApplySeqId: '',
            token: '',
            merchantId: '',
            userId: '',
            userName: '',
            productId: '',
            productName: ''
        }
    }

    //项目初始化
    initInterface () {
        const CancelToken = axios.CancelToken;
        const _this = this;
        let t = new Date().getTime(),
            url = `${preAddress}/risk/getRiskResult?token=${this.state.token}&userId=${this.state.userId}&merchantId=${this.state.merchantId}&t=${t}`;
        
        axios({
            method: 'POST',
            url: url,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: queryString.stringify({
                productId: _this.state.productId,
                userName: _this.state.userName,
                productName: _this.state.productName,
                channelId: '01'
            })
        },{
            cancelToken: new CancelToken(function executor (c) {
                _this.setState({
                    cancel: c
                })
            })
        })
        .then ( res => {
            if (res.data.respCode === '6666666') {
                _this.setState( _ => ({
                    productLoanAmt: res.data.data.productLoanAmt,
                    loanApplySeqId: res.data.data.sysSeqId
                }))
                if(res.data.data.auditProcess == 3){
                    setTimeout( _ => {
                        this.toloan();
                    },1500)
                }else{
                    setTimeout( _ => {
                        this.props.navigation.navigate('LoanDetail',{
                            sysSeqId: res.data.data.sysSeqId,
                            productId: _this.state.productId,
                            productName: _this.state.productName,
                            userName: _this.state.userName
                        });
                    },1500)
                }
            } else {
                _this.props.navigation.navigate('Result',{
                    result: 'refuse',
                    smallText: res.data.respMsg,
                    productId: _this.state.productId
                });
            }
            console.log(res);
        })
        .catch( err => {
            console.log(err);
            _this.setState({
                count: 0,
                isShow: true
            });
        });
    }

    toloan(){
        const _this = this;
        let t  = new Date().getTime();
        fetch(`${postAddress}/loan/confirmLoan?t=${t}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                token: _this.state.token
            },
            body: JSON.stringify({
                loanApplyId: _this.state.loanApplySeqId,
                merchantId: _this.state.merchantId,
                userId: _this.state.userId
            })
        }).then( res => res.json())
        .then( res => {
            if(res.respCode=='000000'){
                setTimeout( _ => {
                    this.queryloanResult();
                }, 1)
            }else if(res.respCode  == '060028'){
                _this.props.navigation.navigate('Result',{
                    result: 'over',
                    smallText: res.respMsg,
                    productId: _this.state.productId
                });
            }else  if(res.respCode == '060021'){
                _this.props.navigation.navigate('Result',{
                    result: 'deal',
                    smallText: res.respMsg,
                    productId: _this.state.productId
                });
            }else{
                _this.props.navigation.navigate('Result',{
                    result: 'faild',
                    smallText: res.respMsg,
                    productId: _this.state.productId
                });
            }
        })
        .catch( err => {
            console.error(err);
        })
        .done();
    }

    queryloanResult(){
        const _this = this;
        let t  = new Date().getTime();
        fetch(`${postAddress}/loan/queryLoanResult?t=${t}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                token: _this.state.token
            },
            body: JSON.stringify({
                loanApplyId: _this.state.loanApplySeqId,
                merchantId: _this.state.merchantId,
                userId: _this.state.userId
            })
        }).then( res => res.json())
        .then( res => {
            console.log(res);
            if(res.data.respCode=='000000'){
                let data = res.data;
                if(data.loanStatus === 'N'){
                    _this.props.navigation.navigate('Result',{
                        result: 'success',
                        smallText: res.data.respMsg,
                        bankName: data.bankName,
                        endOfNumber: data.bankCode.substring(data.bankCode.length-4),
                        paymentAmt: data.paymentAmt,
                        protAmt: data.protAmt,
                        productId: _this.state.productId
                    });
                }else if(data.loanStatus === 'P' || data.loanStatus === 'I'){
                    _this.props.navigation.navigate('Result',{
                        result: 'deal',
                        smallText: res.data.respMsg,
                        productId: _this.state.productId
                    });
                }else{
                    _this.props.navigation.navigate('Result',{
                        result: 'faild',
                        smallText: res.data.respMsg,
                        productId: _this.state.productId
                    });
                }
            }else{
                _this.props.navigation.navigate('Result',{
                    result: 'faild',
                    smallText: res.data.respMsg,
                    productId: _this.state.productId
                });
            }
        })
        .catch( err => {
            console.error(err);
        })
        .done();
    }

    async getProd (fn) {
        //获取productId
        await StorageUtil.get('productId').then( res => {
            this.setState({
                productId: res
            });
        });

        await StorageUtil.get('productName').then( res => {
            this.setState({
                productName: res
            });
        });

        await fn && fn();
    }

    componentDidMount() {
        let _this = this;
        commons.getItemParams(this, function(){
            _this.getProd(function() {
                _this.initInterface();
                _this.countDown();
            });
        }); 
    }

    componentWillUnmount () {
        clearInterval(this.timer);
    }
    
    //倒计时
    countDown () {
        let _this = this,
            count = this.state.count;
        clearInterval(this.timer);
        
        this.timer = setInterval(function () {
            console.log(count);
            count = count - 1;
            if (count < 0 ) {
                _this.state.cancel();
                clearInterval(_this.timer);
                _this.setState({
                    count: 0,
                    isShow: true
                });
            } else {
                _this.setState({
                    count: count
                });
            }
            
        }, 1000);
    }

    //跳转到首页
    goHome () {
        const { navigate } = this.props.navigation;
        navigate('First');
    }

    resubmit () {
        this.setState( _=> ({
            isShow: false,
            count: 10
        }));
        this.countDown();
    }

    
    render () {
        const reset = (<View style={styles.promptView}>
            <Text style={styles.promptText}>提交失败，请重新提交</Text>
            <View style={styles.btn_view}>
                <Text style={styles.init_btn1} onPress={this.goHome.bind(this)}>返回首页</Text>
                <Text style={styles.init_btn2} onPress={this.resubmit.bind(this)}>重新提交</Text>
            </View>
        </View>);

        return (
            <View style={styles.container}>
                <Image style={styles.initBg} source={require('../../assets/init_body_bg.png')} />
                <View style={styles.rotateImg}>
                    <Image style={styles.rotaBg} source={require('../../assets/init_bg.png')} />
                    <RotateInit style={styles.rotaBg}></RotateInit>
                    <Text style={styles.smallText}>智能计算您的额度</Text>
                    {
                        this.state.isPass 
                            ?  <Text style={[styles.compute,styles.productLoanAmt]}><Text style={styles.yen}>&yen;</Text>{this.state.productLoanAmt}</Text>
                            : <Text style={styles.compute}>计算中{this.state.count}S</Text>
                    }
                    
                </View>

                {
                    this.state.isShow ? reset : (<View></View>)
                }
                
            </View>
        )
    }
}

export default Init;