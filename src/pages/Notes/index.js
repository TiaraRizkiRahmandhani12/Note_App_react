import React, { useState, useEffect, useLayoutEffect } from 'react'
import { SafeAreaView, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Style from './style';
import Save from '../../components/saveNote';
import Delete from '../../components/delNote';

export default function Notes({route,navigation}){
    const [date, setDate] = useState(new Date())
    const [note,setNote] = useState({
        title:'',
        note:'',
        date: date,
        notificationId: null
    });
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(()=>{
        if(route.params.note){
            setNote(route.params.note);
        }
    },[])

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: () => {
                return(
                    <View style={{width: 80, flexDirection:'row', justifyContent: 'space-between', marginRight: 30}}>
                        <TouchableOpacity onPress={()=>Save(note, navigation)}>
                            <Feather name="save" size={24} color="#00FF00"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>Delete(note, navigation)}>
                            <Feather name="trash-2" size={24} color="red"/>
                        </TouchableOpacity>
                    </View>
                )
            }  
        })
    },[navigation,note])

    return(
        <SafeAreaView style={Style.conteiner}>
            <TextInput 
                style={Style.txtTitleNote} 
                autoFocus={true} 
                maxLength={50}
                value={note.title} 
                placeholder={'Topic'}
                onChangeText={text=>setNote({ ...note, title: text })}
            >
            </TextInput>
            <ScrollView>
                <TextInput style={Style.txtInput} 
                    multiline={true} 
                    value={note.note}
                    placeholder={'Tambahkan Catatan'}
                    onChangeText={text=>setNote({ ...note, note: text })}
                    >
                </TextInput>
            </ScrollView>
        </SafeAreaView>
    )
}