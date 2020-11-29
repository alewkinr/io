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
import {SearchBar} from 'react-native-elements';
import apeople from '../../assets/APeople-min.png'
import apanic from '../../assets/APanic.png'
import forgiven from '../../assets/Forgiven-min.png'
import phenomen from '../../assets/Bphenomen.png'
import {Dimensions} from 'react-native';


export const MainScreen = (props) => {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    const [index, setIndex] = useState('1');

    const onChangeIndex = (text) => {
        setIndex(text)
    }

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((responseJson) => {
                setFilteredDataSource(responseJson);
                setMasterDataSource(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = masterDataSource.filter(function (item) {
                const itemData = item.title
                    ? item.title.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };


    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                }}
            />
        );
    };

    const PaidScreen = () => {
        return (
            <View>
                <ScrollView horizontal={false} style={{height: Dimensions.get('window').height - 230}}>
                    <View>
                        <View>
                            <Text style={{paddingHorizontal: 20, paddingTop: 20, fontWeight: 'bold'}}>A</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('Main', {
                                screen: 'SongUpload',
                                params: {title: 'APeople - VANYN'}
                            })}>
                            <View style={{flexDirection: 'row', padding: 16}}>
                                <Image source={apeople}/>
                                <View style={{paddingHorizontal: 10}}>
                                    <Text style={{fontWeight: '700'}}>APeople</Text>
                                    <Text style={{
                                        fontSize: 14,
                                        color: '#757575',
                                        fontWeight: '400',
                                        marginBottom: 7
                                    }}>VANYN</Text>
                                    <Text style={{fontSize: 14, color: '#000', fontWeight: '400'}}>Бесплатно</Text>
                                </View>

                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Main', {
                            screen: 'SongUpload',
                            params: {title: 'A Panic - The Pretty Reckless'}
                        })}>
                            <View style={{flexDirection: 'row', padding: 16}}>
                                <Image source={apanic}/>
                                <View style={{paddingHorizontal: 10}}>
                                    <Text style={{fontWeight: '700'}}>A Panic</Text>
                                    <Text style={{fontSize: 14, color: '#757575', fontWeight: '400', marginBottom: 7}}>
                                        The Pretty Reckless</Text>
                                    <Text style={{fontSize: 14, color: '#F85151', fontWeight: '400'}}>Нельзя
                                        использовать</Text>
                                </View>

                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            props.navigation.navigate('Main', {
                                screen: 'SongUpload',
                                params: {title: 'Az Forgiven - Within Temptation'}
                            })}}>
                            <View style={{flexDirection: 'row', padding: 16}}>
                                <Image source={forgiven}/>
                                <View style={{paddingHorizontal: 10}}>
                                    <Text style={{fontWeight: '700'}}>Az Forgiven</Text>
                                    <Text style={{
                                        fontSize: 14,
                                        color: '#757575',
                                        fontWeight: '400',
                                        marginBottom: 7
                                    }}>Within Temptation</Text>
                                    <Text style={{fontSize: 14, color: '#F85151', fontWeight: '400'}}>Можно
                                        выкупить</Text>
                                </View>

                            </View>
                        </TouchableOpacity>
                        <View>
                            <Text style={{paddingHorizontal: 20, paddingTop: 20, fontWeight: 'bold'}}>B</Text>
                        </View>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Main', {
                            screen: 'SongUpload',
                            params: {title: 'B phenomenon - Thousand Foot Krutch'}
                        })}>
                            <View style={{flexDirection: 'row', padding: 16}}>
                                <Image source={phenomen}/>
                                <View style={{paddingHorizontal: 10}}>
                                    <Text style={{fontWeight: '700'}}>B phenomenon</Text>
                                    <Text style={{
                                        fontSize: 14,
                                        color: '#757575',
                                        fontWeight: '400',
                                        marginBottom: 7
                                    }}>Thousand Foot Krutch</Text>
                                    <Text style={{fontSize: 14, color: '#000', fontWeight: '400'}}>Бесплатно</Text>
                                </View>

                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Main', {
                            screen: 'SongUpload',
                            params: {title: 'B phenomenon - Thousand Foot Krutch'}
                        })}>
                            <View style={{flexDirection: 'row', padding: 16}}>
                                <Image source={apeople}/>
                                <View style={{paddingHorizontal: 10}}>
                                    <Text style={{fontWeight: '700'}}>APeople</Text>
                                    <Text style={{
                                        fontSize: 14,
                                        color: '#757575',
                                        fontWeight: '400',
                                        marginBottom: 7
                                    }}>VANYN</Text>
                                    <Text style={{fontSize: 14, color: '#000', fontWeight: '400'}}>Бесплатно</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }


    const FreeScreen = () => {
        return (
            <View>
                <ScrollView horizontal={false} style={{height: '100%'}}>
                    <View>
                        <View>
                            <Text style={{paddingHorizontal: 20, paddingTop: 20, fontWeight: 'bold'}}>A</Text>
                        </View>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Main', {
                            screen: 'SongUpload',
                            params: {title: 'APeople - VANYN'}
                        })}>
                            <View style={{flexDirection: 'row', padding: 16}}>
                                <Image source={apeople}/>
                                <View style={{paddingHorizontal: 10}}>
                                    <Text style={{fontWeight: '700'}}>APeople</Text>
                                    <Text style={{
                                        fontSize: 14,
                                        color: '#757575',
                                        fontWeight: '400',
                                        marginBottom: 7
                                    }}>VANYN</Text>
                                    <Text style={{fontSize: 14, color: '#000', fontWeight: '400'}}>Бесплатно</Text>
                                </View>

                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Main', {
                            screen: 'SongUpload',
                            params: {title: 'A Panic - The Pretty Reckless'}
                        })}>
                            <View style={{flexDirection: 'row', padding: 16}}>
                                <Image source={apanic}/>
                                <View style={{paddingHorizontal: 10}}>
                                    <Text style={{fontWeight: '700'}}>A Panic</Text>
                                    <Text style={{fontSize: 14, color: '#757575', fontWeight: '400', marginBottom: 7}}>The
                                        Pretty Reckless</Text>
                                    <Text style={{fontSize: 14, color: '#F85151', fontWeight: '400'}}>Нельзя
                                        использовать</Text>
                                </View>

                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }


    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <SearchBar
                    squera
                    containerStyle={{backgroundColor: '#fff', borderBottomColor: '#fff', borderTopColor: '#fff'}}
                    inputContainerStyle={{backgroundColor: '#F1F1F1'}}
                    inputStyle={{backgroundColor: '#F1F1F1', fontSize: 14}}
                    searchIcon={{size: 22}}
                    onChangeText={(text) => searchFilterFunction(text)}
                    onClear={(text) => searchFilterFunction('')}
                    placeholder="Поиск композиции"
                    value={search}/>
                <View>
                    <View style={styles.mainContainer}>
                        <TouchableOpacity onPress={() => {
                            onChangeIndex('1')
                        }} style={index === '1' ? styles.selectedIndex : styles.unselectedIndex}>
                            <Text style={index === '1' ? styles.textSelect : styles.textUnselect}>
                                Вся музыка
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            onChangeIndex('2')
                        }} style={index === '2' ? styles.selectedIndex : styles.unselectedIndex}>
                            <Text style={index === '2' ? styles.textSelect : styles.textUnselect}>
                                Платные
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {
                        index === '1' &&
                        <PaidScreen navigation={props.navigation}/>
                    }
                    {
                        index === '2' &&
                        <FreeScreen navigation={props.navigation}/>
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    itemStyle: {
        padding: 10,
    },
    selectedIndex: {
        color: 'black',
        fontSize: 14,
        width: '50%',
        height: '100%',

        borderBottomColor: '#000',
        borderBottomWidth: 1
    },
    textSelect: {
        textAlign: 'center',
        width: '100%',
        fontWeight: 'bold',
        paddingTop: 5

    },
    textUnselect: {
        textAlign: 'center',
        width: '100%',
        paddingTop: 5
    },
    unselectedIndex:
        {
            color: 'gray',
            fontSize: 14,
            width: '50%',
            height: '100%',
        },
    mainContainer: {
        backgroundColor: 'white',
        height: 40,
        width: '100%',
        // paddingLeft: '7%',
        // paddingRight: '7%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
    },
    containerHeader: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    textContainer: {
        marginTop: 70
    },
    textWhite: {
        color: "black",
        marginVertical: 10
    },
    tabContainer: {
        backgroundColor: "white",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        height: "20%",
        alignItems: "center",
        marginTop: 10,
    }
});






