import { createAppContainer, createStackNavigator } from 'react-navigation';

import PLogin from './src/pages/login/pLogin';
import Login from './src/pages/login';
import LoginH5 from './src/pages/loginH5';
import ModifyPassword from './src/pages/login/modifyPassword';
import SetPassword from './src/pages/login/setPassword';
import SetCode from './src/pages/login/setCode';
import Home from './src/pages/index';
import InitPage from './src/pages/init';
import LoanDetail from './src/pages/loanDetail';
import Result from './src/pages/result';
import RepayDetail from './src/pages/RepayDetail';
import extendDate from './src/pages/extends';
import RepayNext from './src/pages/repayNext';
import RepayDetail2 from './src/pages/repayDetail2';
import RepayDetail3 from './src/pages/repayDetail3';
import Repayment from './src/pages/repayment';
import RepayResult from  './src/pages/repayResult';
import BankList from './src/pages/bankList';
import BindCard from './src/pages/bindCard';
import SelectBank from './src/pages/selectBank';
import Agreement from './src/pages/agreement';
import ResetPsw from './src/pages/login/resetPsw';
import Authen from './src/pages/authen';
import AuthPhone from './src/pages/authPhone';
import AuthBase from './src/pages/authBase';
import DesPages from './src/pages/desPages';
import RealName from './src/pages/realName';
import First from './src/pages/first';

const AppNavigator = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: ({navigation}) => ({
            title: '登录',
            header: null
        }),
    },
    LoginH5: {
        screen: LoginH5,
        navigationOptions: ({navigation}) => ({
            title: '登录',
            header: null
        }),
    },
    PLogin: PLogin,
    ModifyPassword: ModifyPassword,
    SetPassword: SetPassword,
    SetCode: SetCode,
    InitPage: {
        screen: InitPage,
        navigationOptions: ({navigation}) => ({
            header: null
        })
    },
    Home: {
        screen: Home,
        navigationOptions: ({navigation}) => ({
            header: null
        })
    },
    LoanDetail: {
        screen: LoanDetail,
        navigationOptions: ({navigation}) => ({
            header: null
        })
    },
    Result: {
        screen: Result,
        navigationOptions: ({navigation}) => ({
            header: null
        })
    },
    ResetPsw: {
        screen: ResetPsw,
        navigationOptions: ({navigation}) => ({
            headerBackTitle: null
        })
    },
    extendDate: {
        screen: extendDate,
        navigationOptions: ({navigation}) => ({
            title: '展期还款',
            headerBackTitle: null
        })
    },
    RepayDetail: {
        screen: RepayDetail,
        navigationOptions: ({navigation}) => ({
            title: '还款详情',
            headerBackTitle: null
        })
    },
    RepayNext: {
        screen: RepayNext,
        navigationOptions: ({navigation}) => ({
            title: '还款',
            headerBackTitle: null
        })
    },
    RepayDetail2: {
        screen: RepayDetail2,
        navigationOptions: ({navigation}) => ({
            title: '还款详情',
            headerBackTitle: null
        })
    },
    RepayDetail3: {
        screen: RepayDetail3,
        navigationOptions: ({navigation}) => ({
            title: '还款详情',
            headerBackTitle: null
        })
    },
    Repayment: {
        screen: Repayment,
        navigationOptions: ({navigation}) => ({
            title: '还款',
            headerBackTitle: null
        })
    },
    RepayResult: {
        screen: RepayResult,
        navigationOptions: ({navigation}) => ({
            title: '还款结果',
            headerBackTitle: null
        })
    },
    BankList: {
        screen: BankList,
        navigationOptions: ({navigation}) => ({
            title: '银行卡',
            headerBackTitle: null
        })
    },
    BindCard: {
        screen: BindCard,
        navigationOptions: ({navigation}) => ({
            title: '绑定银行卡',
            headerBackTitle: null
        })
    },
    SelectBank: {
        screen: SelectBank,
        navigationOptions: ({navigation}) => ({
            title: '支持的银行卡和限额',
            headerBackTitle: null
        })
    },
    Agreement: {
        screen: Agreement,
        navigationOptions: ({navigation}) => ({
            title: '',
            headerBackTitle: null
        })
    },
    Authen: {
        screen: Authen,
        navigationOptions: ({navigation}) => ({
            header: null
        })
    },
    AuthPhone: {
        screen: AuthPhone,
        navigationOptions: ({navigation}) => ({
            header: null
        })
    },
    AuthBase: {
        screen: AuthBase,
        navigationOptions: ({navigation}) => ({
            header: null
        })
    },
    DesPages: {
        screen: DesPages,
        navigationOptions: ({navigation}) => ({
            title: '产品详情'
        })
    },
    RealName: {
        screen: RealName,
        navigationOptions: ({navigation}) => ({
            title: '实名认证'
        })
    },
    First: {
        screen: First,
        navigationOptions: ({navigation}) => ({
            header: null
        })
    }   
}, {
    initialRouteName: 'Home' //login
});

export default createAppContainer(AppNavigator);