import React, {useEffect, useMemo, useReducer, useState, createContext} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LoginScreen} from "./src/screens/LoginScreen";
import {MainScreen} from "./src/screens/MainScreen";
import {AuthContext} from "./src/context/AuthContext";
import {LibraryStackScreen, MainStackScreen, Stack, Tab, UserStackScreen} from "./src/navigation/AppNavigators";
import {NavigationContainer} from "@react-navigation/native";
import {bootstrap} from "./src/bootstrap";
import {AppLoading} from "expo";
import {LibraryScreen} from "./src/screens/LibraryScreen";
import {UserScreen} from "./src/screens/UserScreen";
import {Entypo, FontAwesome} from '@expo/vector-icons';
import {Image} from "react-native";
import books from './assets/books.png';
import booksFill from './assets/books-fill.png';


export default function App({navigation}) {
    // const [isReady, setIsReady] = useState(false)
    //
    // if (!isReady) {
    //     return <AppLoading startAsync={bootstrap} onFinish={() => setIsReady(true)}
    //                        onError={err => console.error(err)}/>
    // }
    // bootstrap()

    // let [fontsLoaded] = useFonts({
    //     Inter_900Black,
    // });
    //
    // if (!fontsLoaded) {
    //     return <AppLoading />;
    // }

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );


    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;

            try {
                userToken = await AsyncStorage.getItem('userToken');
            } catch (e) {
                // Restoring token failed
            }


            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({type: 'RESTORE_TOKEN', token: userToken});
        };

        bootstrapAsync();
    }, []);

    const authContext = useMemo(
        () => ({
            signIn: async data => {
                const formData = new FormData();
                formData.append('username',
                    data.username,
                );
                formData.append('password',
                    data.password,
                );
                let resp = await fetch('http://192.168.1.98:5050/api/v1/sessions/',
                    {
                        method: 'POST',
                        // cache: 'no-cache',
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "multipart/form-data"
                        },
                        body: formData
                    })

                let json = await resp.json();
                const userToken = AsyncStorage.setItem('userToken', json.token);

                if (!json.token) {
                    return
                }
                dispatch({type: 'SIGN_IN', token: json.token});
            },
            signOut: async () =>  {
                console.log('signout');
                await AsyncStorage.clear();
                dispatch({type: 'SIGN_OUT'});
            },
            signUp: async data => {

                dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
            },
        }),
        []
    );

    return (
        <NavigationContainer>
            <AuthContext.Provider value={authContext}>

                {state.userToken == null ? (
                    <Stack.Navigator screenOptions={{headerShown: false}}>
                        <Stack.Screen name="SignIn" component={LoginScreen}/>
                    </Stack.Navigator>
                ) : (
                    // <Stack.Screen name="Main" component={MainScreen}/>
                    <Tab.Navigator screenOptions={({route}) => ({
                        tabBarIcon: ({focused, color, size}) => {
                            let iconName;

                            if (route.name === 'Main') {
                                return <Entypo name="home" size={24} color={focused ? "#3E03E9" : "#DADBDD"}/>
                            } else if (route.name === 'Library') {
                                return focused ? <Image source={booksFill}/> : <Image source={books}/>
                            } else if (route.name === 'User') {
                                return <FontAwesome name="user-circle" size={24}
                                                    color={focused ? "#3E03E9" : "#DADBDD"}/>
                            }
                        },
                    })}
                                   tabBarOptions={{
                                       activeTintColor: 'transparent',
                                       inactiveTintColor: 'transparent',
                                       style: {
                                           height: 70,
                                       }
                                   }}>
                        <Tab.Screen name='Main' component={MainStackScreen}/>
                        <Tab.Screen name='Library' component={LibraryStackScreen}/>
                        <Tab.Screen name='User' component={UserStackScreen}/>
                    </Tab.Navigator>
                )}

            </AuthContext.Provider>
        </NavigationContainer>
    );

}
