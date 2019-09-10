import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { preAddress } from '../../../api';
import Toast from 'react-native-easy-toast';

class ProductDetail extends Component {
    constructor (props) {
        super(props);
        this.state = {
            prod: {}
        }
    }

    getProductInfo () {
        let t = new Date().getTime(),
            {token, productId} = this.props.navigation.state.params;
        fetch(`${preAddress}/product/getProductInfo?t=${t}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token
            },
            body: JSON.stringify({
                productId
            })
        })
        .then( res => res.json())
        .then( res => {
            if (res.respCode === '000000') {
                this.setState({
                    prod: res.data
                });
            } else {
                this.refs.toast.show("获取产品信息失败");
            }
            console.log(res);
        })
        .catch( err => {
            console.log(err);
        })
    }

    componentDidMount() {
        this.getProductInfo();
    }

    render () {
        let apply = eval(this.state.prod.authOption),
            listStr = '';
        var str = apply && apply.map( item => {
            return listStr += item.authName + '，';
        })
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.paragraph}>
                        <Text style={styles.p_title}>申请条件</Text>
                        <Text style={styles.p_txt}>&middot; 年龄：{this.state.prod.minAge}-{this.state.prod.maxAge}周岁</Text>
                        <Text style={styles.p_txt}>&middot; 申请资料：{listStr}</Text>
                    </View>

                    <View style={styles.paragraph}>
                        <Text style={styles.p_title}>额度期限</Text>
                        <Text style={styles.p_txt}>&middot; 借款额度：{this.state.prod.loanMinAmt}-{this.state.prod.loanMaxAmt}</Text>
                        <Text style={styles.p_txt}>&middot; 借款期限：{this.state.prod.loanPeriodsNum} {this.state.prod.loanPeriodsUnit === 'DAY' ? '天' : this.state.prod.loanPeriodsUnit === 'WEEK' ? '周' : this.state.prod.loanPeriodsUnit === 'MONTH' ? '月' : ''}</Text>
                        <Text style={styles.p_txt}>&middot; 审批方式：{this.state.prod.auditTypeDesc}</Text>
                        <Text style={styles.p_txt}>&middot; 还款方式：{this.state.prod.repaymentTypeDesc}</Text>
                    </View>

                    <View style={[styles.paragraph, styles.borNo]}>
                        <Text style={styles.p_title}>费用说明</Text>
                        <Text style={styles.p_txt}>&middot; 年利率：{this.state.prod.protInterestRate * 100}%</Text>
                        <Text style={styles.p_txt}>&middot; 违约金：{this.state.prod.protViolateRate * 100}%</Text>
                        <Text style={styles.p_txt}>&middot; 罚息：{this.state.prod.protPenalSumRate * 100}%/天</Text>
                        <Text style={styles.p_txt}>&middot; VIP卡费：额度金额*25%</Text>
                        <Text style={[styles.p_txt,styles.p_fw]}>&middot; 实际到手金额=额度金额-VIP卡费，具体到手金额以实际银行到账为准</Text>
                        <Text style={[styles.p_txt,styles.p_small]}>&middot; 如有疑问请咨询在线客服</Text>
                    </View>
                </View>
                <Toast  position="center" ref="toast"/>
            </View>
        )
    }
}

export default ProductDetail;