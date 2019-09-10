import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#f5f5f5'
    },
    content: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 40,
        paddingRight: 40,
        backgroundColor: '#fff',
        marginTop: 10
    },
    paragraph: {
        fontSize: 14,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#eee',
        marginBottom: 18
    },
    p_title: {
        fontSize: 14,
        color: '#9b9b9b',
        marginBottom: 10
    },
    p_txt: {
        color: '#000117',
        fontSize: 12,
        marginBottom: 10
    },
    borNo: {
        borderBottomWidth: 0
    },
    p_small: {
        color: '#9b9b9b',
        fontSize: 12
    },
    p_fw: {
        fontWeight: '500',
        lineHeight: 25
    }
});