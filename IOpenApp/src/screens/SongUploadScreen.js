import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, TouchableHighlight, ScrollView} from "react-native";
import Slider from '@react-native-community/slider';
import stairs from '../../assets/stairs.png'
import download from '../../assets/download.png'
import magic from '../../assets/magic.png'
import play from '../../assets/play.png'
import youtube from '../../assets/youtube.png'
import arrow from '../../assets/arrow.png'
import sud from '../../assets/sud.png'
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from "expo-file-system";
import {FileSystemUploadType} from "expo-file-system";


export const SongUploadScreen = () => {

    const [status, setStatus] = useState('');

    const checkedPermission = async () => {
        const cameraPermission = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );
    }

    useEffect(() => {
        checkedPermission()
        for (var i = 1; i < 30; i++)
            window.clearInterval(i);
    }, [])

    const startTask = async (id) => {
        await setInterval(async () => {
            let res = await fetch('http://192.168.1.98:8080/api/v1/files/status?_id=' + id);
            let json = await res.json();
            console.log(id, json)
            if (json.result !== null) {
                setStatus(json.result)
                clearInterval(this)
            }
        }, 5000, 30000)
    }

    return (
        <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#fff'}}>
            <Image source={stairs} style={{width: '90%', margin: 16}}/>
            <View style={{
                position: 'absolute',
                top: 150,
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'center'
            }}>
                <TouchableOpacity onPress={async () => {
                    // MediaLibrary.saveToLibraryAsync()
                    const media = await MediaLibrary.getAssetsAsync({
                        mediaType: MediaLibrary.MediaType.audio,
                    });
                    console.log(media.assets[0])
                    let json = await FileSystem.uploadAsync('http://192.168.1.98:8080/api/v1/files/', media.assets[0].uri,
                        {
                            httpMethod: 'POST',
                            uploadType: FileSystemUploadType.MULTIPART,
                            fieldName: 'file',
                            parameters: {'_id': '1', 'user_id': '1', '_type': media.assets[0].mediaType}
                        })
                    console.log(json.body)
                    let data = JSON.parse(json.body)
                    console.log(data.id)
                    await startTask(data.id)
                }} style={{
                    width: 50,
                    height: 50,
                    backgroundColor: '#fff',
                    justifyContent: "center",
                    alignItems: 'center',
                    borderRadius: 10,
                    marginHorizontal: 20,
                    opacity: .6,
                    elevation: 3,
                    shadowOffset: {width: 10, height: 10},
                    shadowColor: '#000',
                    shadowOpacity: 1
                }}>
                    <View style={{width: 12, height: 12, borderRadius: 50, backgroundColor: 'red'}}>

                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: 50,
                    height: 50,
                    backgroundColor: '#fff',
                    justifyContent: "center",
                    alignItems: 'center',
                    borderRadius: 10,
                    marginHorizontal: 20,
                    elevation: 3,
                    shadowOffset: {width: 10, height: 10},
                    shadowColor: '#000',
                    shadowOpacity: 1
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
                    marginHorizontal: 20,
                    opacity: .6,
                    elevation: 3,
                    shadowOffset: {width: 10, height: 10},
                    shadowColor: '#000',
                    shadowOpacity: 1
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
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '90%',
                top: -10
            }}>
                <Text>4:00</Text>
                <Text>00:00</Text>
            </View>

            <View style={{justifyContent: "flex-start", width: '100%', paddingHorizontal: 25}}>
                <Text style={{
                    color: '#F85151',
                    fontWeight: 'bold',
                    fontSize: 14
                }}>{status === 'allowed' ? 'Можно выкупить' : 'Нельзя использовать'}</Text>
                <View>
                    <TouchableHighlight activeOpacity={0}
                                        underlayColor="transparent" onPress={() => alert('Pressed!')}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingVertical: 6,
                        }}>
                            <View style={{
                                padding: 14,
                                borderRadius: 10,
                                shadowOffset: {width: 1, height: 5},
                                shadowColor: '#000',
                                shadowOpacity: .8,
                                elevation: 2,
                                backgroundColor: "#fff"
                            }}>
                                <Image source={youtube}/>
                            </View>
                            <View style={{textAlign: "left", width: 245}}>
                                <Text style={{fontWeight: '600', fontSize: 14, color: "#151515"}}>
                                    YouTube
                                </Text>
                                <Text style={{color: '#757575', fontSize: 14, fontWeight: '400'}}>
                                    7$
                                </Text>
                            </View>
                            <Image source={arrow}/>
                        </View>
                    </TouchableHighlight>
                </View>

                <Text style={{color: '#000', fontWeight: 'bold', fontSize: 14, paddingBottom: 10}}>Похожие</Text>
                <ScrollView horizontal={true} style={{height: 50}} showsHorizontalScrollIndicator={false}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
                        <Image source={sud}/>
                        <View style={{paddingLeft: 5}}>
                            <Text style={{fontWeight: '700', fontSize: 14, color: "#151515"}}>Suddenly I See</Text>
                            <Text style={{color: '#757575', fontSize: 14, fontWeight: '400'}}>KT Tunstall</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}
