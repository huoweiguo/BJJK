import React, { Component } from 'react';
import { ScrollView, Dimensions, SafeAreaView} from 'react-native';
import { WebView } from 'react-native-webview';
const {width, height} = Dimensions.get('window');



class ResetPsw extends Component {
    constructor (props) {
        super(props);
        console.disableYellowBox = true;
    }

    _onMessage (event) {
        let action = JSON.parse(event.nativeEvent.data),
            {navigate} = this.props.navigation;
        if (action.type === 'reset_password') {
            navigate('PLogin');
        } 
    }

    render () {
        return (
            <SafeAreaView style={{flex: 1}}>
                <ScrollView style={{flex: 1}}>
                    <WebView
                        style={{width: width, height: height}}
                        source={{uri: 'http://huopan-test.baijiajiekuan.com/rn_app/#/ChangePassword'}}
                        onMessage={ event => {
                            this._onMessage(event);
                        } }    
                    >
                    </WebView>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default  ResetPsw;