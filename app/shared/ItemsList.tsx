import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Button, Divider, Icon, Overlay, SearchBar } from 'react-native-elements';
import { SearchBarBaseProps } from 'react-native-elements/dist/searchbar/SearchBar';

const SafeSearchBar = (SearchBar as unknown) as React.FC<SearchBarBaseProps & { lightTheme: boolean, round: boolean }>;

interface ItemsListProps {
    sortProps: {
        label: string,
        property: string
    }[],
    items: any[],
    render: (item: any) => React.ReactElement,
    keyExtractor: (item: any) => string,
    onSort: (sortBy: string) => void,
    onSearch: (text: string) => void,
    searchTerm: string,
    onRefresh: () => void,
    refreshing: boolean,
    children?: JSX.Element | JSX.Element[];
}

const ItemsList = (props: ItemsListProps) => {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View
            style={{ flex: 1 }}>
            <Overlay
                animationType="fade"
                backdropStyle={styles.overlayBackdrop}
                overlayStyle={styles.overlay}
                isVisible={modalVisible}
                onBackdropPress={() => {
                    setModalVisible(!modalVisible);
                }}>
                {props.sortProps.map((sortProp) => (
                    <Button
                        key={sortProp.label}
                        onPress={() => {
                            setModalVisible(false);
                            props.onSort(sortProp.property)
                        }}
                        title={sortProp.label}
                        type='clear' />
                ))}
            </Overlay>
            <View style={styles.searchContainer}>
                <SafeSearchBar
                    platform='default'
                    placeholder='Search...'
                    value={props.searchTerm}
                    onChangeText={props.onSearch}
                    lightTheme
                    round
                    inputContainerStyle={styles.searchInput}
                    containerStyle={styles.searchBar}
                />
                <Icon
                    name="filter-outline"
                    type="ionicon"
                    onPress={() => setModalVisible(true)} />
            </View>
            {(!props.children || !!props.searchTerm)
                ? <View
                    style={styles.itemsListContainer}>
                    <FlatList
                        data={props.items}
                        renderItem={({ item }) =>
                            props.render(item)
                        }
                        keyExtractor={props.keyExtractor}
                        onRefresh={props.onRefresh}
                        refreshing={props.refreshing} />
                </View>
                : props.children
            }
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        width: '50%',
        paddingLeft: 0,
        paddingRight: 0,
    },
    overlayBackdrop: {
        backgroundColor: 'rgba(0, 0, 0, .5)'
    },
    searchBar: {
        width: '90%',
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0
    },
    searchContainer: {
        flexDirection: 'row',
        marginRight: '5%',
        marginLeft: '2.5%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    searchInput: {
        backgroundColor: 'lightgray'
    },
    itemsListContainer: {
        flex: 1,
    },
})

export default ItemsList;
