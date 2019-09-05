import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        height: height,
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    scroll_view: {
        marginBottom: 65
    },
    idImg: {
        padding: 18,
        backgroundColor: '#fff',
        marginTop: 9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40
    },
    pic_id: {
        width: (width - 51)/ 2
    },
    pic_img: {
        width: '100%',
        height: 104,
        marginBottom: 10
    },
    id_txt: {
        textAlign: 'center',
        color: '#4a4a4a'
    },
    id_txt2: {
        fontWeight: 'bold'
    },
    attention_view: {
        paddingLeft: 18,
        paddingRight: 18,
        width: width - 36
    },
    attend_img: {
        width: width - 36,
        height: 122
    },
    submit_view: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        padding: 18,
        backgroundColor: '#fff'
    },
    btn_txt: {
        width:'100%',
        height: 44,
        backgroundColor: '#567bff',
        color: '#fff',
        textAlign: 'center',
        lineHeight: 44,
        fontSize: 18
    },
    btn_view: {
        borderRadius: 5,
        overflow:'hidden',
        width: '100%',
        height: 44
    }
});