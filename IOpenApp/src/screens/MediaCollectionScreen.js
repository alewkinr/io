import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity
} from "react-native";
import nause from '../../assets/nause.png'
import battle from '../../assets/battle.png'
import hard from '../../assets/hard.png'
import fat from '../../assets/fat.png'
import muzzy from '../../assets/muzze.png'
import surf from '../../assets/surf.png'
import adam from '../../assets/adam.png'
import nitro from '../../assets/nitro.png'
import hals from '../../assets/halsey.png'
import ctrl from '../../assets/ctrl.png'
import play from '../../assets/white_play.png'

export const MediaCollectionScreen = () => {
    return (
        <View style={{backgroundColor: '#fff'}}>
            <ScrollView>
                <TouchableOpacity>
                    <View style={{flexDirection: 'row', padding: 16, alignItems: 'center'}}>
                        <View>
                            <Image source={nause}/>
                            <Image source={play} style={{position: 'absolute', left: 23, top: 20}}/>
                        </View>

                        <View style={{paddingLeft: 10}}>
                            <Text style={{fontWeight: '700'}}>
                                Dynamite
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                color: '#757575',
                                fontWeight: '400',
                                marginBottom: 7
                            }}>
                                Nause
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{flexDirection: 'row', padding: 16, alignItems: 'center'}}>
                        <View>
                            <Image source={battle}/>
                            <Image source={play} style={{position: 'absolute', left: 23, top: 20}}/>
                        </View>

                        <View style={{paddingLeft: 10}}>
                            <Text style={{fontWeight: '700'}}>
                                Touch in the Night
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                color: '#757575',
                                fontWeight: '400',
                                marginBottom: 7
                            }}>
                                Battle Beast
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{flexDirection: 'row', padding: 16, alignItems: 'center'}}>
                        <View>
                            <Image source={hard}/>
                            <Image source={play} style={{position: 'absolute', left: 23, top: 20}}/>
                        </View>

                        <View style={{paddingLeft: 10}}>
                            <Text style={{fontWeight: '700'}}>
                                Unnecessary Trouble
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                color: '#757575',
                                fontWeight: '400',
                                marginBottom: 7
                            }}>
                                Hard-Fi
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{flexDirection: 'row', padding: 16, alignItems: 'center'}}>
                        <View>
                            <Image source={fat}/>
                            <Image source={play} style={{position: 'absolute', left: 23, top: 20}}/>
                        </View>

                        <View style={{paddingLeft: 10}}>
                            <Text style={{fontWeight: '700'}}>
                                Funk soul brother
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                color: '#757575',
                                fontWeight: '400',
                                marginBottom: 7
                            }}>
                                Fat boy slim
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{flexDirection: 'row', padding: 16, alignItems: 'center'}}>
                        <View>
                            <Image source={muzzy}/>
                            <Image source={play} style={{position: 'absolute', left: 23, top: 20}}/>
                        </View>

                        <View style={{paddingLeft: 10}}>
                            <Text style={{fontWeight: '700'}}>
                                Endgame
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                color: '#757575',
                                fontWeight: '400',
                                marginBottom: 7
                            }}>
                                Muzzy
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{flexDirection: 'row', padding: 16, alignItems: 'center'}}>
                        <View>
                            <Image source={surf}/>
                            <Image source={play} style={{position: 'absolute', left: 23, top: 20}}/>
                        </View>

                        <View style={{paddingLeft: 10}}>
                            <Text style={{fontWeight: '700'}}>
                                Surface
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                color: '#757575',
                                fontWeight: '400',
                                marginBottom: 7
                            }}>
                                Aero Chord
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{flexDirection: 'row', padding: 16, alignItems: 'center'}}>
                        <View>
                            <Image source={adam}/>
                            <Image source={play} style={{position: 'absolute', left: 23, top: 20}}/>
                        </View>

                        <View style={{paddingLeft: 10}}>
                            <Text style={{fontWeight: '700'}}>
                                Sandcastles (ToWonder x Severo Re...
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                color: '#757575',
                                fontWeight: '400',
                                marginBottom: 7
                            }}>
                                Adam Jensen
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{flexDirection: 'row', padding: 16, alignItems: 'center'}}>
                        <View>
                            <Image source={nitro}/>
                            <Image source={play} style={{position: 'absolute', left: 23, top: 20}}/>
                        </View>

                        <View style={{paddingLeft: 10}}>
                            <Text style={{fontWeight: '700'}}>
                                Checkpoint (Original Mix)
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                color: '#757575',
                                fontWeight: '400',
                                marginBottom: 7
                            }}>
                                Nitro Fun & Hyper Potions
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{flexDirection: 'row', padding: 16, alignItems: 'center'}}>
                        <View>
                            <Image source={hals}/>
                            <Image source={play} style={{position: 'absolute', left: 23, top: 20}}/>
                        </View>

                        <View style={{paddingLeft: 10}}>
                            <Text style={{fontWeight: '700'}}>
                                You Should Be Sad (Tiësto Remix)
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                color: '#757575',
                                fontWeight: '400',
                                marginBottom: 7
                            }}>
                                Halsey
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{flexDirection: 'row', padding: 16, alignItems: 'center'}}>
                        <View>
                            <Image source={hals}/>
                            <Image source={play} style={{position: 'absolute', left: 23, top: 20}}/>
                        </View>

                        <View style={{paddingLeft: 10}}>
                            <Text style={{fontWeight: '700'}}>
                                You Should Be Sad (Tiësto Remix)
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                color: '#757575',
                                fontWeight: '400',
                                marginBottom: 7
                            }}>
                                Halsey
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{flexDirection: 'row', padding: 16, alignItems: 'center'}}>
                        <View>
                            <Image source={ctrl}/>
                            <Image source={play} style={{position: 'absolute', left: 23, top: 20}}/>
                        </View>

                        <View style={{paddingLeft: 10}}>
                            <Text style={{fontWeight: '700'}}>
                                CTRL Z
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                color: '#757575',
                                fontWeight: '400',
                                marginBottom: 7
                            }}>
                                Halvorsen
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}