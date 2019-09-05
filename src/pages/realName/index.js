import React, { Component } from 'react';
import {View, Text,  Image, ScrollView, SafeAreaView } from 'react-native';
import Toast from 'react-native-easy-toast';
import { styles } from './styleCss';

class RealName extends Component {
    constructor (props) {
        super(props);
        console.disableYellowBox = true;
    }

    componentDidMount() {
      this.refs.toast.show('身份证拍摄不清晰,请重新拍摄') ;
    }
    

    render () { 
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scroll_view}>
                    <View style={styles.idImg}>
                        <View style={styles.pic_id}>
                            <Image style={styles.pic_img}  source={require('../../assets/ID12x.png')}/>
                            <View><Text style={styles.id_txt}>点击身份证 <Text  style={styles.id_txt2}>姓名面</Text></Text></View>
                        </View>
                        <View  style={styles.pic_id}>
                            <Image style={styles.pic_img} source={require('../../assets/ID22x.png')}/>
                            <View><Text  style={styles.id_txt}>点击身份证 <Text style={styles.id_txt2}>国徽面</Text></Text></View>
                        </View>
                    </View>

                    <View style={styles.attention_view}>
                        <Image style={styles.attend_img} source={require('../../assets/smrz_zysx2x.png')}/>
                    </View>
                </ScrollView>

                <View style={styles.submit_view}>
                    <View style={styles.btn_view}><Text style={styles.btn_txt}>确认提交</Text></View>
                </View>
                <Toast position="center" ref="toast"/>
            </SafeAreaView>
        )
    }
}

export default RealName;