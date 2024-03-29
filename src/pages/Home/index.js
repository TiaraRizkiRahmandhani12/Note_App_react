import React, { useState } from 'react'
import { SafeAreaView, FlatList, TouchableOpacity, Text, ActivityIndicator, TouchableHighlight, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from '../../components/SearchBar';
import Style from './styles';
import Colors from '../../styles/color';
import Notes from '../../components/RenderNotes';
import { useAuth } from "../../../contexts/AuthContext";

export default function Home({navigation}){
    const { logout } = useAuth();

    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            const getData = async () => {
                try {
                    let notes = await AsyncStorage.getItem('notes');
                    if(notes === undefined || notes === null){
                        notes = '[]';
                    }
                    if(notes.length > 0 && notes[0] !== '['){
                        notes = `[${notes}]`;
                    }
                    setData(JSON.parse(notes));
                    setLoading(false);
                }catch(err){
                    console.log(err);
                    alert('Error loading notes');
              }
            };
            getData();
        },
    []))
    if(loading){
        return(
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <ActivityIndicator size={'large'} color={Colors.loading}/>
            </View>
        )
    }else{
        return(
            <SafeAreaView style={Style.conteiner}>
                <Text style={Style.txtTitle}>Days Note</Text>
                <SearchBar data={data} onChange={setData}/>
                <FlatList
                    ListEmptyComponent={<Text style={{textAlign:'center'}}>Pencarian tidak ada</Text>}
                    showsVerticalScrollIndicator={false}
                    data={data}
                    numColumns={2}
                    columnWrapperStyle={Style.noteList}
                    keyExtractor={(item)=>item.id.toString()}
                    renderItem={({item})=>{
                        return(
                            <Notes item={item} navigation={navigation}/>
                        )
                    }}
                />
                <TouchableOpacity style={Style.newNoteButton} onPress={()=>navigation.navigate('Notes',{search:false})}>
                    <AntDesign name="pluscircle" size={50} color={Colors.addButton}/>
                </TouchableOpacity>
                <TouchableHighlight onPress={logout}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 30,
                        marginBottom: 27,
                        color: 'white',
                        padding: 10,
                        borderWidth: 2,
                        borderColor: 'black',
                        borderRadius: 20,
                        width: 140,
                        height: 60,
                        backgroundColor: '#008080',
                        left: 100,
                        fontWeight: 'bold'
                    }}>Keluar</Text>
                </TouchableHighlight>
            </SafeAreaView>
        )
    }   
}