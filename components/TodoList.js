import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TouchableHighlight } from 'react-native';
import Colors from '../Colors';
import TodoModal from './TodoModal';

export default class TodoList extends React.Component {
    state = {
        showListVisible: false,
        deletedList: []
    }

    toggleListModal() {
        this.setState({showListVisible: !this.state.showListVisible})
    }

    deleteList(index) {
        this.setState(prevState => ({
            deletedList: [...prevState.deletedList, index]
        }))
    }

    render() {
        const list = this.props.list
        const completedCount = list.todos.filter(todo => todo.completed).length;
        const remainingCount = list.todos.length - completedCount;

        return (
            <View>
                <Modal 
                animationType='slide' 
                visible={this.state.showListVisible} 
                onRequestClose={() => this.toggleListModal()}
                >
                    <TodoModal 
                    list={list} 
                    closeModal={() => this.toggleListModal()} 
                    updateList={this.props.updateList} 
                />
                </Modal>
                {this.state.deletedList.indexOf(this.props.index) === -1 && (
                    <TouchableOpacity 
                        style={[styles.listContainer, { backgroundColor: list.color }]} 
                        onPress={() => this.toggleListModal()}
                    >
                        <TouchableHighlight style={styles.deleteButton} onPress={() => this.deleteList(this.props.index)}>
                            <Text style={{color: Colors.white}}>X</Text>
                        </TouchableHighlight>
                        <Text style={styles.listTitle} numberOfLines={1}>
                            {list.name}
                        </Text>
                        <View style={{alignItems: "center"}}>
                            <Text style={styles.count}>{remainingCount}</Text>
                            <Text style={styles.subtitle}>Remaining</Text>
                        </View>
                        <View style={{alignItems: "center"}}>
                            <Text style={styles.count}>{completedCount}</Text>
                            <Text style={styles.subtitle}>Completed</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: "center",
        width: 200,
        position: 'relative'
    },
    listTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.white,
        marginBottom: 18
    },
    count: {
        fontSize: 48,
        fontWeight: "200",
        color: Colors.white
    },
    subtitle: {
        fontSize: 12,
        fontWeight: "700",
        color: Colors.white
    },
    deleteButton: {
        backgroundColor: 'purple',
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 5,
        right: 5
    }
});


