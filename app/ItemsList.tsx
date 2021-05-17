import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, View, Pressable, Text, Modal, TouchableHighlight, FlatList } from 'react-native';

interface ItemsListProps {
    sortProps: {
        label: string,
        property: string
    }[],
    items: any[],
    render: (item: any) => React.ReactElement,
    keyExtractor: (item: any) => string,
    onSort: (sortBy: string) => void,
    onSearch: (searchTerm: string) => void,
    searchTerm: string,
    onRefresh: () => void,
    refreshing: boolean,
}

const ItemsList = (props: ItemsListProps) => {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View
            style={{flex: 1}}>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}
                    onTouchEnd={() => setModalVisible(false)}>
                    <View style={styles.modalView}>
                        {props.sortProps.map((sortProp, i) => (                        
                            <TouchableHighlight
                                key={sortProp.label}
                                onPress={() => {
                                    setModalVisible(false);
                                    props.onSort(sortProp.property);
                                }}
                                style={[
                                    styles.modalTextContainer,
                                    i === props.sortProps.length - 1
                                        ? {
                                            marginBottom: 0,
                                        }
                                        : { }
                                ]}
                                underlayColor='rgba(240, 248, 255, 0.8)'>
                                <Text>{sortProp.label}</Text>
                            </TouchableHighlight>
                        ))}
                    </View>
                  </View>
            </Modal>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder='Search...'
                    value={props.searchTerm}
                    onChangeText={props.onSearch}
                    style={styles.searchInput} />
                    <Pressable
                        onPress={() => setModalVisible(true)}>
                        <Image
                            source={require('../images/sort.png')}
                            style={styles.sortIcon} />
                    </Pressable>
            </View>
            <View
                style={styles.itemsListContainer}>
                <FlatList
                    data={props.items}
                    renderItem={({item}) => (
                        <View
                            style={styles.itemContainer}>
                            {props.render(item)}
                        </View>
                    )}
                    keyExtractor={props.keyExtractor}
                    onRefresh={props.onRefresh}
                    refreshing={props.refreshing} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        height: 40,
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: 15,
    },
    searchInput: {
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: StyleSheet.hairlineWidth,
        width: '85%',
        paddingLeft: 15,
    },
    sortIcon: {
        width: 40,
        height: 40,
        marginLeft: '2.5%',
        alignSelf: 'center',
    },
    itemsListContainer: {
        flexDirection: 'column',
        marginTop: 20,
        flex: 1,
    },
    itemContainer: {
        marginLeft: '5%',
        marginRight: '5%',
        marginBottom: 15,
        padding: 5,
        borderRadius: 10,
        height: 100,
        borderWidth: StyleSheet.hairlineWidth,
    },
    modalTextContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.75)'
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      paddingTop: 10,
      paddingBottom: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: '50%'
    },
})

export default ItemsList;
