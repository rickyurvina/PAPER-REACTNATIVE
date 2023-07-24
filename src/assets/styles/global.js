import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({ 
    title:{
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 30,
        fontSize: 30
    },
    container:{
        flex: 1,
        marginTop: 20,
        marginHorizontal: '2.5%'
    },
    fab: {
        position: 'absolute',
        margin: 10,
        right: 0,
        bottom: 10,
    }


  });

export default globalStyles;