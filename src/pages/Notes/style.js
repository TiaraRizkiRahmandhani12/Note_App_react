import { StyleSheet } from 'react-native'
import Colors from '../../styles/color'

const style = StyleSheet.create({
    conteiner:{
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor:Colors.NoteBackground,
        padding:20
    },
    txtInput:{
        fontSize:18
    },
    txtTitleNote:{
        width:'100%',
        padding:10,
        borderBottomWidth:1,
        marginBottom:20,
        fontSize:20,
        color:'#000602',
        fontWeight:'bold'
    }
})

export default style;