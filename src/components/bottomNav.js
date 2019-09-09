import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

class BottomNav extends Component {
    constructor (props) {
        super(props);
    }

    goToLink (name) {
        if (name === 'loan' && this.props.type !== 'loan') {
            this.props.navigate('First');
        }

        if (name === 'repay' && this.props.type !== 'repay') {
            this.props.navigate('Order');
        }

        if (name === 'my' && this.props.type !== 'my') {
            this.props.navigate('Center');
        }
    }

    render () {
        return (
            <View style={styles.bottom_content}>
                <TouchableOpacity onPress={this.goToLink.bind(this, 'loan')}>
                    {
                        this.props.type === 'loan' ?  <Image style={styles.icon_img} source={require('../assets/icon1_jk_pre.png')} /> : <Image style={styles.icon_img} source={require('../assets/icon1_jk.png')} />
                    }
                    <Text style={this.props.type === 'loan' ? styles.active_text : styles.normal_text}>借款</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.goToLink.bind(this, 'repay')}>
                    {
                        this.props.type === 'repay' ?  <Image style={styles.icon_img} source={require('../assets/icon2_hk_pre.png')} /> : <Image style={styles.icon_img} source={require('../assets/icon2_hk.png')} />
                    }
                    <Text style={this.props.type === 'repay' ? styles.active_text : styles.normal_text}>还款</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.goToLink.bind(this, 'my')}>
                    {
                        this.props.type === 'my' ?  <Image style={styles.icon_img} source={require('../assets/icon3_user_pre.png')} /> : <Image  style={styles.icon_img} source={require('../assets/icon3_user.png')} />
                    }
                    <Text style={this.props.type === 'my'? styles.active_text: styles.normal_text}>我的</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default BottomNav;

const styles = StyleSheet.create({
    bottom_content: {
        width: '100%',
        paddingTop: 9,
        paddingBottom: 9,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderStyle: 'solid',
        borderColor: '#eee'
    },
    normal_text: {
        color: '#9b9b9b',
        fontSize: 10,
        textAlign: 'center'
    },
    icon_img: {
        width: 26,
        height: 26,
        marginBottom: 4
    },
    active_text: {
        color:'#000517',
        fontSize: 10,
        textAlign: 'center'
    }
});