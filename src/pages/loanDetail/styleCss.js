import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    headerBg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: 167,
        backgroundColor: '#567bff'
    },
    back: {
        position: 'relative',
        width: 16,
        height: 17,
        top: 4
    },
    loan_nav: {
        position: 'relative',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    nav_title: {
        width: '100%',
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 25
    },
    nav_back: {
        position: 'absolute',
        left: 0,
        top: 5,
        height: 25,
        width: 25,
        zIndex: 5
    },
    amount_detail: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
        paddingBottom: 40
    },
    loan_msg: {
        width: "100%",
        height: 140,
        backgroundColor: '#fff'
    },
    msg_top: {
        flexDirection: 'row',
        width: '100%',
        height: 91,
        paddingTop: 20,
        borderBottomWidth: 1,
        borderColor: '#f0f0f0',
        borderStyle: 'solid'
    },
    msg: {
        width: '50%'
    },
    msg_name: {
        lineHeight: 17,
        fontSize: 12,
        color: '#9b9b9b',
        textAlign: 'center'
    },
    msg_num: {
        marginTop: 4,
        lineHeight: 36,
        fontSize: 25,
        color: '#4a4a4a',
        textAlign: 'center'
    },
    msg_list: {
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#fff'
    },
    msg_prod: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    list_name: {
        height: 48,
        lineHeight: 48,
        fontSize: 14,
        color: '#9b9b9b',
    },
    list_num: {
        height: 48,
        lineHeight: 48,
        fontSize: 14,
        color: '#4a4a4a'
    },
    msg_title: {
        height: 42,
        lineHeight: 42,
        fontSize: 12,
        color: '#9b9b9b',
        paddingLeft: 20
    },
    list: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 48,
        borderBottomWidth: 1,
        borderColor: '#f0f0f0',
        borderStyle: 'solid'
    },
    noborder: {
        borderBottomWidth: 0
    },
    msg_agree: {
        marginTop: 39,
        height: 14,
        marginBottom: 15,
        fontSize: 10,
        color: '#9b9b9b',
        marginLeft: 10
    },
    agree_link: {
        color: '#567bff'
    },
    loan_btn: {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#567bff'
    },
    mask_content: {
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 99
    },
    mask: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 100
    },
    mask_box: {
        position: 'absolute',
        left: width / 2,
        top: height/2,
        width: 295,
        height: 160,
        marginLeft: -(295/2),
        marginTop: -(160/2),
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 10,
        zIndex: 101
    },
    btn_set: {
        flexDirection: 'row',
        height: 62,
        borderTopWidth: 1,
        borderColor: '#ddd',
        borderStyle: 'solid'
    },
    title_prompt: {
        textAlign: 'center',
        marginTop: 30,
        color: '#000118',
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 25,
        marginBottom: 8
    },
    prompt_small: {
        textAlign: 'center',
        color: '#4a4a4a',
        fontSize: 12,
        lineHeight: 17,
        marginBottom: 17
    },
    btn_set: {
        height: 62,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderColor: '#ddd',
        borderStyle: 'solid'
    },
    btn_txt1: {
        width: '50%',
        textAlign: 'center',
        height: 62,
        lineHeight: 62,
        color: '#909090',
        fontSize: 18
    },
    btn_txt2: {
        width: '50%',
        color: '#567bff',
        fontSize: 18,
        textAlign: 'center',
        height: 62,
        lineHeight: 62,
        fontWeight: '500'
    },
    mask_content_inner: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundColor: '#000',
        opacity: 0.65,
        zIndex: 10
    },
    modal_content: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: width,
        height: 420,
        zIndex: 11,
        backgroundColor: '#fff'
    },
    modal_nav: {
        position: 'relative',
        height: 51,
        backgroundColor: '#f5f5f5'
    },
    modal_title: {
        height: 51,
        lineHeight: 51,
        textAlign: 'center',
        fontSize: 20,
        color: '#000118'
    },
    img_outer: {
        position: 'absolute',
        right: 19,
        top: 19,
        zIndex: 20
    },
    closeImg: {
        width: 18,
        height: 17
    },
    modal_prompt: {
        width: width,
        height: 30,
        lineHeight: 30,
        textAlign: 'center',
        backgroundColor: '#eff2ff',
        color: '#567bff'
    },
    modal_amt_outer: {
        paddingTop: 17,
        paddingBottom: 17,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#eef1f6'
    },
    modal_t1: {
        fontSize: 12,
        color: '#4a4a4a',
        marginBottom: 2,
        textAlign: 'center'
    },
    modal_t2: {
        textAlign: 'center',
        fontSize: 25,
        color: '#4a4a4a',
        fontWeight: '600',
        lineHeight: 36
    },
    modal_t3: {
        color: '#9b9b9b',
        textAlign: 'center',
        fontSize: 10
    },
    modal_list: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 48,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#eef1f6',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 6
    },
    list_t1: {
        flexDirection: 'row',
        width: '40%',
        textAlign: 'left',
        fontSize: 14,
        color: '#4a4a4a'
    },
    list_t2: {
        width: '60%'
    },
    list_t2_amt: {
        fontSize: 14,
        color: '#4a4a4a',
        textAlign: 'right'
    },
    list_t2_rate: {
        fontSize: 10,
        color: '#9b9b9b',
        textAlign: 'right',
        marginTop: 4
    },
    modal_index: {
        paddingRight: 23
    },
    bank_color: {
        color: '#567bff',
        fontSize: 12,
        height: 42,
        lineHeight: 42
    },
    change_text: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 42,
        lineHeight: 42
    },
    btn_views: {
        width: width - 40,
        height: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#567bff',
        borderRadius: 4
    },
    btnText: {
        width: '100%',
        height: 50,
        lineHeight: 50,
        color: '#fff',
        fontSize: 18,
        textAlign: 'center'
    }
});