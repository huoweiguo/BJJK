import React,{Component} from 'react';
import { View, Text, Image, TouchableHighlight, SafeAreaView, Modal, ScrollView } from 'react-native';
import { postAddress, preAddress }  from '../../../api';
import { styles } from './styleCss';
import commons from '../../../getItems';
import queryString from 'querystring';
import Toast from 'react-native-easy-toast';
import StorageUtil from '../../../storageUtil';

class LoanDetail extends Component {
    constructor (props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {
            isQuit: false,
            token: '',
            merchantId:  '',
            userId: '',
            userName: '',
            productLoanAmt: 0,
            productName: '',
            dw: '',
            date: '',
            serviceAmt: 0,
            accountAmt: 0,
            totalPayAmt: 0,
            defaultCard: '',
            defaultCardName: '',
            visible: false,
            interestPayAmt: 0,
            contractShowFlag: '',
            planList: [],
            productId: '',
            isBtnType: false,
            isShowBtn: false
        }
    }

    //返回按钮
    goBack () {
        this.setState({
            isQuit: true
        })
    }

    //在考虑下
    consider () {
        this.setState({
            isQuit: false
        })
    }

    //返回首页
    goHome () {
        this.props.navigation.navigate('First');
    }

    lookPeriod () {
        this.setState({
            visible: true
        })
    }

    closeModal () {
        this.setState({
            visible: false
        })
    }

    //agree loan
    toloan(){
        const _this = this;
        let t  = new Date().getTime();
        let { sysSeqId } = this.props.navigation.state.params;
        fetch(`${postAddress}/loan/confirmLoan?t=${t}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                token: _this.state.token
            },
            body: JSON.stringify({
                loanApplyId:sysSeqId,
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
                    smallText: res.respMsg
                });
            }else  if(res.respCode == '060021'){
                _this.props.navigation.navigate('Result',{
                    result: 'deal',
                    smallText: res.respMsg
                });
            }else{
                _this.props.navigation.navigate('Result',{
                    result: 'faild',
                    smallText: res.respMsg
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
        let { sysSeqId } = this.props.navigation.state.params;
        fetch(`${postAddress}/loan/queryLoanResult?t=${t}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                token: _this.state.token
            },
            body: JSON.stringify({
                loanApplyId: sysSeqId,
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
                        protAmt: data.protAmt
                    });
                }else if(data.loanStatus === 'P' || data.loanStatus === 'I'){
                    _this.props.navigation.navigate('Result',{
                        result: 'deal',
                        smallText: res.data.respMsg
                    });
                }else{
                    _this.props.navigation.navigate('Result',{
                        result: 'faild',
                        smallText: res.data.respMsg
                    });
                }
            }else{
                _this.props.navigation.navigate('Result',{
                    result: 'faild',
                    smallText: res.data.respMsg
                });
            }
        })
        .catch( err => {
            console.error(err);
        })
        .done();
    }

    renderData () {
        let _this = this,
        { productId, sysSeqId, productName } = this.props.navigation.state.params,
        t = new Date().getTime(),
        url = `${preAddress}/loanApply/record/getApplyLoanResult?loanApplySeqId=${sysSeqId}&productId=${productId}&token=${this.state.token}&merchantId=${this.state.merchantId}&userId=${this.state.userId}&t=${t}`

        fetch(url,{
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then ( res => res.json())
        .then( res => {
            console.log(res);
            if (res.respCode === '000000') {
                let {loanApply, replayInfo, userBankInfos, billRepayPlanList} = res.data;
                _this.setState({
                    contractShowFlag: res.data.contractShowFlag,
                    productLoanAmt: loanApply.productLoanAmt,
                    productName: loanApply.productName,
                    dw: loanApply.periodUnit === 'W' ? '周' : loanApply.periodUnit === 'D' ? '天' : loanApply.periodUnit === 'M' ? '月' : '',
                    date: loanApply.loanInstalmentsNum,
                    serviceAmt: replayInfo.serviceAmt,
                    accountAmt: replayInfo.accountAmt,
                    totalPayAmt: replayInfo.totalPayAmt,
                    defaultCard: userBankInfos.bankCard.substr(userBankInfos.bankCard.length - 4, 4),
                    defaultCardName: userBankInfos.bankName,
                    interestPayAmt: replayInfo.interestPayAmt,
                    planList: billRepayPlanList
                })
            } else {
                _this.refs.toast.show(res.respMsg);
            }
        })
        .catch ( err => {
            console.error(err);
        })
    }

    getBankCard () {
        let _this = this,
            t = new Date().getTime(),
            {productId} = this.props.navigation.state.params;
        fetch( `${preAddress}//bankCard/query?t=${t}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: _this.state.token
            },
            body: JSON.stringify({
                userId: _this.state.userId,
                merchantId: _this.state.merchantId,
                productId
            })
        })
        .then( res => res.json())
        .then( res => {
            if (res.respCode === '000000' && res.data.length > 0) {
                this.setState({
                    isBtnType: true
                })
            }
            this.setState({
                isShowBtn: true
            });
            console.log(res);
        })
        .catch( err => {
            console.log(err);
        })
    }

    componentDidMount() {
        let _this = this;
        commons.getItemParams(this, function(){
            _this.renderData();
            _this.getBankCard();
        });
    }
    
    changeCard () {
        this.props.navigation.navigate('BankList',{
            isApply: false
        });
    }

    //跳转到结果页面
    goResult (res) {
        const { navigate } = this.props.navigation;
        const {data} = res;
        switch (res.respCode) {
            case "000000" :
                navigate('Result', {
                    status: "success",
                    smallText: data.smallText,
                    bankName: data.bankName,
                    endOfNumber: data.endOfNumber,
                    loanAmt: data.loanAmt,
                    arrivalAmt: data.arrivalAmt
                });
                break;
            case "060021" :
                navigate('Result', {
                    status: "deal",
                    smallText: data.smallText
                });
                break;
            case "060028" :
                navigate('Result', {
                    status: "over",
                    smallText: data.smallText
                });     
                break;    
            default :
                navigate('Result', {
                    status: "faild",
                    smallText: data.smallText
                });
        }
    }
    
    render () {
        const mask = (
            <View style={styles.mask_content}>
                <View style={styles.mask}></View>
                <View style={styles.mask_box}>
                    <Text style={styles.title_prompt}>确认不借款了吗?</Text>
                    <Text style={styles.prompt_small}>闪电到账银行卡,只差这最后一步</Text>
                    <View style={styles.btn_set}>
                        <Text onPress={this.goHome.bind(this)} style={styles.btn_txt1}>确认</Text>
                        <Text onPress={this.consider.bind(this)} style={styles.btn_txt2}>考虑下</Text>
                    </View>
                </View>
            </View>
        );

        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={styles.headerBg}></View>

                    {/*导航标题 */}
                    <View style={styles.loan_nav}>
                        <Text style={styles.nav_back} onPress={this.goBack.bind(this)}><Image style={styles.back} source={require('../../assets/back.png')}/></Text>
                        <Text style={styles.nav_title}>借款详情</Text>
                    </View>

                    {/**产品详情 */}
                    <View style={styles.amount_detail}>
                        <View style={styles.loan_msg}>
                            <View style={styles.msg_top}>
                                <View style={styles.msg}>
                                    <Text style={styles.msg_name}>借款金额</Text>
                                    <Text style={styles.msg_num}>{this.state.productLoanAmt}元</Text>
                                </View>
                                <View style={styles.msg}>
                                    <Text style={styles.msg_name}>期限</Text>
                                    <Text style={styles.msg_num}>{this.state.date}{this.state.dw}</Text>
                                </View>
                            </View>
                            <View style={[styles.msg_list, styles.msg_prod]}>
                                <Text style={styles.list_name}>借款产品</Text>
                                <Text style={styles.list_num}>{this.state.productName}</Text>
                            </View>
                        </View>
                        <Text style={styles.msg_title}>费用说明</Text>
                        <View style={styles.msg_list}>
                            <View style={styles.list}>
                                <Text style={styles.list_name}>综合费用</Text>
                                <Text style={styles.list_num}>{this.state.serviceAmt}元</Text>
                            </View>
                            <View style={styles.list}>
                                <Text style={styles.list_name}>到账金额</Text>
                                <Text style={styles.list_num}>{this.state.accountAmt}元</Text>
                            </View>
                            <View style={styles.list}>
                                <Text style={styles.list_name}>到期应还</Text>
                                <Text style={styles.list_num}>{this.state.totalPayAmt}元</Text>
                            </View>
                            <View style={[styles.list, styles.noborder]}>
                                <Text style={styles.list_name}>还款计划</Text>
                                <Text style={styles.list_num} onPress={this.lookPeriod.bind(this)}>查看</Text>
                            </View>
                        </View>
                        <View style={styles.change_text}>
                            <Text style={styles.msg_title}>银行卡信息 </Text>
                            <Text style={styles.bank_color} onPress={this.changeCard.bind(this)}>更换银行卡</Text>
                        </View>
                        <View style={styles.msg_list}>
                            <View style={styles.list}>
                                <Text style={styles.list_name}>到站银行卡</Text>
                                <Text style={styles.list_num}>{this.state.defaultCard}</Text>
                            </View>
                            <View style={[styles.list, styles.noborder]}>
                                <Text style={styles.list_name}>所属银行</Text>
                                <Text style={styles.list_num}>{this.state.defaultCardName}</Text>
                            </View>
                        </View>

                        {
                            this.state.contractShowFlag != 'N' 
                                ?  <Text style={styles.msg_agree}>我已阅读并同意<Text style={styles.agree_link}>《借款相关协议》</Text></Text>
                                : <Text></Text>
                        }
                        
                        {
                            this.state.isShowBtn 
                                ? (<View style={styles.btn_views}>
                                        {
                                            this.state.isBtnType 
                                                ? <Text onPress={this.toloan.bind(this)} style={styles.btnText}>同意借款</Text>
                                                : <Text onPress={() => {this.props.navigation.navigate('BankList')}} style={styles.btnText}>去绑卡</Text>
                                        }
                                    </View>)
                                : (<View></View>)
                        }
                        
                        
                       
                    </View>

                    {/**遮照 */}
                    {
                        this.state.isQuit ? mask :  (<View></View>)
                    }
                
                </View>
                <Modal animationType="slide" visible={this.state.visible} transparent={true}>
                    <View style={styles.mask_content_inner}></View>
                    
                    <View style={styles.modal_content}>
                        <View style={styles.modal_nav}>
                            <Text style={styles.modal_title}>还款计划</Text>
                            <Text style={styles.img_outer} onPress={this.closeModal.bind(this)}><Image style={styles.closeImg} source={require('../../assets/delete.png')}/></Text>
                        </View>
                        <Text style={styles.modal_prompt}>温馨提示: 次日起可提前还款</Text>
                        <View style={styles.modal_amt_outer}>
                            <Text style={styles.modal_t1}>还款金额(元)</Text>
                            <Text style={styles.modal_t2}>{this.state.totalPayAmt}</Text>
                            <Text style={styles.modal_t3}>总利息{this.state.interestPayAmt}元</Text>
                        </View>

                        <ScrollView style={{flex: 1}}>
                            {
                                this.state.planList.map( (item, index) => {
                                    return (
                                        <View style={styles.modal_list} key={index}>
                                            <View style={styles.list_t1}>
                                                <Text style={styles.modal_index}>{index+1}</Text>
                                                <Text style={{color: '#4a4a4a'}}>{item.periodsEndDate}</Text>
                                            </View>
                                            <View style={styles.list_t2}>
                                                <Text style={styles.list_t2_amt}>{item.periodsShldRepayAmt}元</Text>
                                                <Text style={styles.list_t2_rate}>含本金{item.periodsPortAmt}元，利息{item.periodsInterestRateAmt}元</Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }

                        </ScrollView>
                    </View>
                </Modal>
                <Toast position="center" ref="toast"/>
            </SafeAreaView>
        )
    }
}

export default LoanDetail;