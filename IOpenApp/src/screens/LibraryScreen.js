import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from "react-native";
import {SearchBar} from "react-native-elements";
import uhhuh from "../../assets/UhHuh-min.png";
import colors from "../../assets/colors-min.png";
import amafi from "../../assets/amafi-min.png";
import oasis from "../../assets/oasis-min.png";
import apeople from "../../assets/APeople-min.png";
import apanic from "../../assets/APanic.png";
import {Col, Grid, Row} from "react-native-easy-grid";
import pop from '../../assets/pop.png'
import hiphop from '../../assets/hiphop-min.png'
import dance from '../../assets/dance-min.png'
import rnb from '../../assets/rnb.png'
import folk from '../../assets/folk.png'
import rock from '../../assets/rock-min.png'
import classic from '../../assets/classic-min.png'
import remix from '../../assets/remix.png'
import recomend from '../../assets/recomend.png'
import {Dimensions} from 'react-native';


export const LibraryScreen = (props) => {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);


    const [state, setState] = useState('3');

    const onChangeIndexLibs = (text) => {
        console.log(text)
        setState(text)
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

    const ItemView = ({name, title, aut, lic}) => {
        return (
            // Flat List Item
            <TouchableOpacity {...props} onPress={() => props.navigation.navigate('Song', {
                params: {title: title + ' - ' + aut}
            })}>
                <View style={{flexDirection: 'row', paddingVertical: 10}}>
                    <Image source={name}/>
                    <View style={{paddingHorizontal: 10}}>
                        <Text style={{fontSize: 14, fontWeight: 'bold'}}>{title}
                        </Text>
                        <Text style={{fontSize: 14, color: '#757575', fontWeight: '400', marginBottom: 7}}>{aut}
                        </Text>
                        <Text style={{fontSize: 14, color: '#000', fontWeight: '400'}}>{lic}
                        </Text>
                    </View>
                </View>

            </TouchableOpacity>
        );
    };

    const MusicScreen = () => {
        return (
            <View>
                <ScrollView style={{height: '90%'}}>
                    <Text style={{
                        paddingHorizontal: 10,
                        fontSize: 14,
                        fontWeight: 'bold',
                        paddingTop: 16
                    }}>Популярное</Text>
                    <ScrollView horizontal={true} contentContainerStyle={{padding: 10, height: '100%'}}>
                        <Grid>
                            <Col style={{marginRight: 150}}>
                                <ItemView name={uhhuh} aut='пше ' title='Uh Huh' lic='TikTok 00:30'/>

                                <ItemView name={colors} aut='Maduk feat. Diamond Eyes' title='Colours'
                                          lic='Бесплатно'/>
                                <ItemView name={amafi} aut='Hooverphonic' title='Amalfi' lic='Бесплатно'/>
                            </Col>
                            <Col style={{marginRight: 150}}>
                                <ItemView name={apeople} lic='Бесплатно' title='APeople' aut='VANYN'/>
                                <ItemView name={apanic} lic='Бесплатно' title='A Panic' aut='The Pretty Reckless'/>
                            </Col>
                        </Grid>
                    </ScrollView>
                    <View style={{width: '90%', backgroundColor: '#EEEEEE', height: 1, margin: 15}}>
                    </View>
                    <Text style={{paddingHorizontal: 10, fontSize: 14, fontWeight: 'bold'}}>Новинки</Text>
                    <ScrollView horizontal={true} contentContainerStyle={{padding: 10, height: '100%'}}>
                        <Grid>
                            <Col style={{marginRight: 150}}>
                                <ItemView name={oasis} aut='La Chica' title='Oasis' lic='Бесплатно'/>
                                <ItemView name={apanic} lic='Бесплатно' title='A Panic' aut='The Pretty Reckless'/>
                                <ItemView name={uhhuh} aut='Jade Bird' title='Uh Huh' lic='Бесплатно'/>
                            </Col>
                        </Grid>
                    </ScrollView>
                </ScrollView>
            </View>
        )
    }

    const PlayListScreen = () => {
        return (
            <View>
                <ScrollView style={{height: Dimensions.get('window').height - 230}}>
                    <Grid style={{paddingHorizontal: 25, paddingBottom: 20}}>
                        <Row style={{paddingVertical: 5}}>
                            <Col>
                                <View>
                                    <Image source={pop}/>
                                    <Text style={{
                                        position: 'absolute',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        padding: 10
                                    }}>Поп</Text>
                                </View>
                            </Col>
                            <Col>
                                <View>
                                    <Image source={hiphop}/>
                                    <Text style={{
                                        position: 'absolute',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        padding: 10
                                    }}>Хип-хоп</Text>
                                </View>
                            </Col>
                        </Row>
                        <Row style={{paddingVertical: 5}}>
                            <Col>
                                <View>
                                    <Image source={dance}/>
                                    <Text style={{
                                        position: 'absolute',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        padding: 10
                                    }}>Dance/Electronic</Text>
                                </View>
                            </Col>
                            <Col>
                                <View>
                                    <Image source={rnb}/>
                                    <Text style={{
                                        position: 'absolute',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        padding: 10
                                    }}>R&B</Text>
                                </View>
                            </Col>
                        </Row>
                        <Row style={{paddingVertical: 5}}>
                            <Col>
                                <View>
                                    <Image source={folk}/>
                                    <Text style={{
                                        position: 'absolute',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        padding: 10
                                    }}>Фолк</Text>
                                </View>
                            </Col>
                            <Col>
                                <View>
                                    <Image source={rock}/>
                                    <Text style={{
                                        position: 'absolute',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        padding: 10
                                    }}>Рок</Text>
                                </View>
                            </Col>
                        </Row>
                        <Row style={{paddingVertical: 5}}>
                            <Col>
                                <View>
                                    <Image source={classic}/>
                                    <Text style={{
                                        position: 'absolute',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        padding: 10
                                    }}>Классическая</Text>
                                </View>
                            </Col>
                            <Col>
                                <View>
                                    <Image source={remix}/>
                                    <Text style={{
                                        position: 'absolute',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        padding: 10
                                    }}>Ремиксы</Text>
                                </View>
                            </Col>
                        </Row>
                        <Row style={{paddingVertical: 5}}>
                            <Col>
                                <View>
                                    <Image source={recomend}/>
                                    <Text style={{
                                        position: 'absolute',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        padding: 10
                                    }}>Рекомендации</Text>
                                </View>
                            </Col>
                        </Row>
                    </Grid>
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
                        {/*<Button title='hello' onPress={() => {*/}
                        {/*    console.log(index);*/}
                        {/*    onChangeIndexLibs('4');*/}
                        {/*}*/}
                        {/*}/>*/}
                        <TouchableOpacity onPress={() => setState('3')
                        } style={state === '3' ? styles.selectedIndex : styles.unselectedIndex}>
                            <Text style={{textAlign: 'center', width: '100%', fontWeight: 'bold', paddingTop: 5}}>
                                Рекомендации
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() =>
                            setState('4')

                        } style={state === '4' ? styles.selectedIndex : styles.unselectedIndex}>
                            <Text style={{
                                textAlign: 'center',
                                width: '100%',
                                paddingTop: 5
                            }}>
                                Плейлисты
                            </Text>
                        </TouchableOpacity>

                    </View>
                    {
                        state === '3' &&
                        <MusicScreen navigation={props.navigation}/>
                    }
                    {
                        state === '4' &&
                        <PlayListScreen navigation={props.navigation}/>
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    selectedIndex: {
        color: 'black',
        fontSize: 14,
        width: '50%',
        height: '100%',

        borderBottomColor: '#000',
        borderBottomWidth: 1
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

