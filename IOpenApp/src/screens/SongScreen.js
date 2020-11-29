import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import Slider from '@react-native-community/slider';
import stairs from '../../assets/stairs.png'
import download from '../../assets/download.png'
import magic from '../../assets/magic.png'
import play from '../../assets/play.png'


export const SongScreen = () => {
    return (
        <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
            <Image source={stairs} style={{width: '90%', margin: 16}}/>
            <View style={{
                position: 'absolute',
                top: 150,
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'center'
            }}>
                <TouchableOpacity style={{
                    width: 50,
                    height: 50,
                    backgroundColor: '#fff',
                    justifyContent: "center",
                    alignItems: 'center',
                    borderRadius: 10,
                    marginHorizontal: 20
                }}>
                    <Image source={download}/>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: 50,
                    height: 50,
                    backgroundColor: '#fff',
                    justifyContent: "center",
                    alignItems: 'center',
                    borderRadius: 10,
                    marginHorizontal: 20
                }}>
                    <Image source={play}/>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: 50,
                    height: 50,
                    backgroundColor: '#fff',
                    justifyContent: "center",
                    alignItems: 'center',
                    borderRadius: 10,
                    marginHorizontal: 20
                }}>
                    <Image source={magic}/>
                </TouchableOpacity>
            </View>

            <Slider
                style={{width: "90%", height: 40}}
                minimumValue={0}
                maximumValue={2}
                minimumTrackTintColor="#3B04DD"
                maximumTrackTintColor="#D9D9D9"
                thumbTintColor='#3B04DD'
            />
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', top: -10}}>
                <Text>4:00</Text>
                <Text>00:00</Text>
            </View>

            <View style={{justifyContent: "flex-start", width: '100%', paddingHorizontal: 25, marginTop: 30}}>
                <Text style={{color: '#3B04DD', fontWeight: 'bold', fontSize: 14}}>Бесплатно</Text>
                <Text style={{color: '#757575', fontWeight: '400', fontSize: 14, marginBottom: 10}}>Все платформы</Text>
                <Text style={{color: '#000', fontWeight: 'bold', fontSize: 14}}>Последнее обновление</Text>
                <Text style={{color: '#757575', fontWeight: '400', fontSize: 14, marginBottom: 10}}>22.11.2020</Text>
            </View>


        </View>
    )
}


const styles = StyleSheet.create({})