import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, Switch, Dimensions} from "react-native";
import tiktok from '../../assets/tik-tok.png'
import insta from '../../assets/instagram.png'
import youtube from '../../assets/youtube.png'
import vk from '../../assets/vk.png'
import fb from '../../assets/facebook.png'
import twit from '../../assets/twitter.png'
import {AuthContext} from "../context/AuthContext";


export const UserScreen = (props) => {
    const [isEnabledTik, setIsEnabledTik] = useState(false);
    const toggleSwitchTik = () => setIsEnabledTik(previousState => !previousState);

    const [isEnabledInsta, setIsEnabledInsta] = useState(false);
    const toggleSwitchInsta = () => setIsEnabledInsta(previousState => !previousState);
    //
    const [isEnabledTube, setIsEnabledTube] = useState(false);
    const toggleSwitchTube = () => setIsEnabledTube(previousState => !previousState);
    //
    const [isEnabledVK, setIsEnabledVK] = useState(false);
    const toggleSwitchVK = () => setIsEnabledVK(previousState => !previousState);
    //
    const [isEnabledFB, setIsEnabledFB] = useState(false);
    const toggleSwitchFB = () => setIsEnabledFB(previousState => !previousState);

    const [isEnabledTwit, setIsEnabledTwit] = useState(false);
    const toggleSwitchTwit = () => setIsEnabledTwit(previousState => !previousState);


    return (
        <View style={{backgroundColor: '#fff'}}>
            <View>


                <Text style={{paddingTop: 20, paddingHorizontal: 16, fontWeight: 'bold', color: '#151515', fontSize: 14}}>Проверка</Text>
                <ScrollView
                    style={{height: Dimensions.get('window').height - 165, paddingVertical: 10, paddingHorizontal: 16}}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical: 10,
                    }}>
                        <View style={{
                            padding: 14,
                            borderRadius: 10,
                            shadowOffset: { width: 10, height: 10 },
                            shadowColor: '#000',
                            shadowOpacity: 1,
                            elevation: 3,
                            backgroundColor : "#fff",
                            marginLeft: 10
                        }}>
                            <Image source={tiktok}/>
                        </View>
                        <View style={{textAlign: "left", width: 180}}>
                            <Text style={{fontWeight: '700', fontSize: 14, color: "#151515"}}>
                                TikTok
                            </Text>
                            <Text style={{color: '#757575', fontSize: 14, fontWeight: '400'}}>
                                Свободный контент
                            </Text>
                        </View>
                        <Switch trackColor={{false: '#DADBDD', true: '#5A75F8'}}
                                onValueChange={toggleSwitchTik}
                                thumbColor={isEnabledTik ? '#3E03E9' : '#C4C4C4'}
                                value={isEnabledTik}/>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical: 10,
                    }}>
                        <View style={{
                            padding: 14,
                            borderRadius: 10,
                            shadowOffset: { width: 10, height: 10 },
                            shadowColor: '#000',
                            shadowOpacity: 1,
                            elevation: 3,
                            backgroundColor : "#fff",
                            marginLeft: 10
                        }}>
                            <Image source={insta}/>
                        </View>
                        <View style={{textAlign: "left", width: 180}}>
                            <Text style={{fontWeight: '700', fontSize: 14, color: "#151515"}}>
                                Instagram
                            </Text>
                            <Text style={{color: '#757575', fontSize: 14, fontWeight: '400'}}>
                                Свободный контент
                            </Text>
                        </View>
                        <Switch trackColor={{false: '#DADBDD', true: '#5A75F8'}}
                                onValueChange={toggleSwitchInsta}
                                thumbColor={isEnabledInsta ? '#3E03E9' : '#C4C4C4'}
                                value={isEnabledInsta}/>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical: 10,
                    }}>
                        <View style={{
                            padding: 14,
                            borderRadius: 10,
                            shadowOffset: { width: 10, height: 10 },
                            shadowColor: '#000',
                            shadowOpacity: 1,
                            elevation: 3,
                            backgroundColor : "#fff",
                            marginLeft: 10
                        }}>
                            <Image source={youtube}/>
                        </View>
                        <View style={{textAlign: "left", width: 180}}>
                            <Text style={{fontWeight: '700', fontSize: 14, color: "#151515"}}>
                                YouTube
                            </Text>
                            <Text style={{color: '#F85151', fontSize: 14, fontWeight: '400'}}>
                                2 композиции
                            </Text>
                        </View>
                        <Switch trackColor={{false: '#DADBDD', true: '#5A75F8'}}
                                onValueChange={toggleSwitchTube}
                                thumbColor={isEnabledTube ? '#3E03E9' : '#C4C4C4'}
                                value={isEnabledTube}/>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical: 10,
                    }}>
                        <View style={{
                            padding: 14,
                            borderRadius: 10,
                            shadowOffset: { width: 10, height: 10 },
                            shadowColor: '#000',
                            shadowOpacity: 1,
                            elevation: 3,
                            backgroundColor : "#fff",
                            marginLeft: 10
                        }}>
                            <Image source={vk}/>
                        </View>
                        <View style={{textAlign: "left", width: 180}}>
                            <Text style={{fontWeight: '700', fontSize: 14, color: "#151515"}}>
                                VK
                            </Text>
                            <Text style={{color: '#757575', fontSize: 14, fontWeight: '400'}}>
                                Свободный контент
                            </Text>
                        </View>
                        <Switch trackColor={{false: '#DADBDD', true: '#5A75F8'}}
                                onValueChange={toggleSwitchVK}
                                thumbColor={isEnabledVK ? '#3E03E9' : '#C4C4C4'}
                                value={isEnabledVK}/>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical: 10,
                    }}>
                        <View style={{
                            padding: 14,
                            borderRadius: 10,
                            shadowOffset: { width: 10, height: 10 },
                            shadowColor: '#000',
                            shadowOpacity: 1,
                            elevation: 3,
                            backgroundColor : "#fff",
                            marginLeft: 10
                        }}>
                            <Image source={fb}/>
                        </View>
                        <View style={{textAlign: "left", width: 180}}>
                            <Text style={{fontWeight: '700', fontSize: 14, color: "#151515"}}>
                                Facebook
                            </Text>
                            <Text style={{color: '#757575', fontSize: 14, fontWeight: '400'}}>
                                Свободный контент
                            </Text>
                        </View>
                        <Switch trackColor={{false: '#DADBDD', true: '#5A75F8'}}
                                onValueChange={toggleSwitchFB}
                                thumbColor={isEnabledFB ? '#3E03E9' : '#C4C4C4'}
                                value={isEnabledFB}/>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical: 10,
                    }}>
                        <View style={{
                            padding: 14,
                            borderRadius: 10,
                            shadowOffset: { width: 10, height: 10 },
                            shadowColor: '#000',
                            shadowOpacity: 1,
                            elevation: 3,
                            backgroundColor : "#fff",
                            marginLeft: 10
                        }}>
                            <Image source={twit}/>
                        </View>
                        <View style={{textAlign: "left", width: 180}}>
                            <Text style={{fontWeight: '700', fontSize: 14, color: "#151515"}}>
                                Twitter
                            </Text>
                            <Text style={{color: '#757575', fontSize: 14, fontWeight: '400'}}>
                                Свободный контент
                            </Text>
                        </View>
                        <Switch trackColor={{false: '#DADBDD', true: '#5A75F8'}}
                                onValueChange={toggleSwitchTwit}
                                thumbColor={isEnabledTwit ? '#3E03E9' : '#C4C4C4'}
                                value={isEnabledTwit}/>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    shadow: {
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 3,
        // background color must be set
        backgroundColor : "#0000" // invisible color
    }
})