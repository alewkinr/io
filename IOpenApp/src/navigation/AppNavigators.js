import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import React, {useContext} from "react";
import {MainScreen} from "../screens/MainScreen";
import {SongScreen} from "../screens/SongScreen";
import {LibraryScreen} from "../screens/LibraryScreen";
import {Text, TouchableOpacity, View, Image} from "react-native";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {UserScreen} from "../screens/UserScreen";
import signout from '../../assets/signout.png'
import {AuthContext} from "../context/AuthContext";
import {SongUploadScreen} from "../screens/SongUploadScreen";
import {MediaCollectionScreen} from "../screens/MediaCollectionScreen";
import times from '../../assets/times.png'


export const Stack = createStackNavigator()
export const Tab = createBottomTabNavigator()
export const MainStack = createStackNavigator()
export const LibraryStack = createStackNavigator()
export const TopBar = createMaterialTopTabNavigator()
export const UserStack = createStackNavigator()



export const MainStackScreen = (props) => {
    return (
        <MainStack.Navigator>
            <MainStack.Screen name='MainList' component={MainScreen} options={{
                title: 'Библиотека',
                headerRight: () => (
                    <TouchableOpacity>
                        <Text style={{marginRight: 15, color: '#B7B7B7'}}
                              onPress={() => props.navigation.navigate('Media')}>Добавить</Text>
                    </TouchableOpacity>),
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    alignSelf: 'center',
                    textAlign: "center",
                    justifyContent: 'center',
                    flex: 1,
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlignVertical: 'center'
                },
            }}/>
            <MainStack.Screen name='SongUpload' component={SongUploadScreen} options={({route}) => ({
                title: route.params?.title.length >= 25 ? route.params?.title.slice(0, 23) + '...' : route.params?.title,
                headerTitleAlign: 'center',
                headerStyle: {}
            })}/>
            <MainStack.Screen name='Media' component={MediaCollectionScreen} options={{
                title: 'Медиатека', headerTitleAlign: 'center', headerLeft: () => (
                    <TouchableOpacity onPress={() => props.navigation.navigate('MainList')} style={{paddingLeft: 10}}>
                        <Image source={times}/>
                    </TouchableOpacity>)
            }}/>
        </MainStack.Navigator>)
}


export const LibraryStackScreen = () => {
    return (
        <LibraryStack.Navigator>
            <LibraryStack.Screen name='Libs' component={LibraryScreen} options={{
                title: 'Музыка',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    alignSelf: 'center',
                    textAlign: "center",
                    justifyContent: 'center',
                    flex: 1,
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlignVertical: 'center'
                }
            }}/>
            <LibraryStack.Screen name='Song' component={SongScreen} options={({route: {params}}) => ({
                title: 'Uh Huh - Jade Bird', headerTitleAlign: 'center'
            })}/>
        </LibraryStack.Navigator>)
}


export const UserStackScreen = (props) => {
    const {signOut} = useContext(AuthContext);
    return (
        <UserStack.Navigator>
            <UserStack.Screen name='Users' component={UserScreen} options={{
                title: 'Виктория Нилкина',
                headerRight: () => (
                    <TouchableOpacity style={{paddingRight: 20}} onPress={() => signOut()}>
                        <Image source={signout}/>
                    </TouchableOpacity>),
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    alignSelf: 'center',
                    textAlign: "center",
                    justifyContent: 'center',
                    flex: 1,
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlignVertical: 'center'
                }
            }}/>
        </UserStack.Navigator>
    )
}