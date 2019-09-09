import React, { Component } from 'react';
import { SafeAreaView , ScrollView, Dimensions} from 'react-native';
import { WebView } from 'react-native-webview';
const {width, height} = Dimensions.get('window');

class Authen extends Component {
    constructor (props) {
        super(props);
    }
    _onMessage(event) {
        let action = JSON.parse(event.nativeEvent.data),
            {navigate} = this.props.navigation;

            console.log(action.type, '1111');
        
        switch (action.type) {
            case 'auth_phone':
                navigate('AuthPhone');
                break;
            case 'auth_base':
                navigate('AuthBase');
                break;
            case 'get_product_id':
                let { productId, token, userId, merchantId } = this.props.navigation.state.params,
                    str = `${token}&&${merchantId}&&${userId}&&${productId}`;
                this.refs.webview.injectJavaScript(`getProductId("${str}");true;`);
                break;
            case 'go_back_home':
                this.props.navigation.navigate('First');
                break;
            case 'go_look_des':
                this.props.navigation.navigate('DesPages',{
                    pages: action.pages
                });
                break;
            case 'go_to_apply':
                this.props.navigation.navigate('BankList');
                break;
        }
    }

    render () {
        return (
            <SafeAreaView style={{flex: 1}}>
                <WebView
                        ref="webview"
                        style={{width: width, height: height}}
                        source={{uri: `http://huopan-test.baijiajiekuan.com/rn_app/#/ThreeAction?t=${new Date().getTime()}`}}
                        onMessage={ event => {
                            this._onMessage(event);
                        } }    
                    >
                    </WebView>
            </SafeAreaView>
        )
    }
}

export default Authen;