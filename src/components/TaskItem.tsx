import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput,
    ImageBackground
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import editPen from '../assets/icons/edit/edit.png';
import { Task } from "./TasksList";
import { editTaskAtributes } from "../pages/Home";

interface TaskItemProps{
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: ({taskId, taskNewTitle}: editTaskAtributes) => void
    item: Task
    index: number
}

export function TaskItem({ item, index, toggleTaskDone, removeTask, editTask }: TaskItemProps){

    const [itemBeingEditing, setItemBeingEditing] = useState(false);
    const [itemEditingValue, setItemEditingValue] = useState(item.title);
    const textInputRef = useRef<TextInput>(null)

    function handleStartEditing(){
        setItemBeingEditing(true)
    }

    function handleCancelEditing(){
        setItemEditingValue(item.title)
        setItemBeingEditing(false)
    }

    function handleSubmitEditing(){
        editTask({taskId: item.id, taskNewTitle: itemEditingValue})
        setItemBeingEditing(false)
    }

    useEffect(() => {

        if(textInputRef.current) {
            if(itemBeingEditing){
                textInputRef.current.focus()
            } else {
                textInputRef.current.blur()
            }
        }

    }, [itemBeingEditing])

    return (
        <View style={styles.itemWrapper}>
            <View style={{flex: 1}}>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(item.id)}
                    //TODO - use onPress (toggle task) prop
                >
                    <View 
                    testID={`marker-${index}`}
                    style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                    //TODO - use style prop 
                    >
                    { item.done && (
                        <Icon 
                        name="check"
                        size={12}
                        color="#FFF"
                        />
                    )}
                    </View>

                    <TextInput
                        ref={textInputRef}
                        value={itemEditingValue}
                        onChangeText={setItemEditingValue}
                        editable={itemBeingEditing}
                        onSubmitEditing={handleSubmitEditing}
                        style={item.done ? styles.taskTextDone : styles.taskText}
                        // multiline={true}
                    >

                    </TextInput>

                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                { itemBeingEditing ? (
                    <TouchableOpacity
                        onPress={handleCancelEditing}
                    >
                        <Icon name="x" size={24} color="#b2b2b2"/>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={handleStartEditing}
                    >
                        <Image source={editPen} />
                    </TouchableOpacity>
                ) }

                <View
                    style={styles.iconsDivider}
                ></View>

                <TouchableOpacity
                    disabled={itemBeingEditing}
                    onPress={() => removeTask(item.id)}
                    style={{marginRight: 5}}
                >
                    <Image source={trashIcon} style={{opacity: itemBeingEditing ? 0.2 : 1}}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 20,
        marginRight: 20
    },
    iconsDivider: {
        marginHorizontal: 15,
        width: 2,
        height: 20,
        backgroundColor: 'rgba(196, 196, 196, 0.24)'
    },
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      marginRight: 10,
      paddingVertical: 1,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    }
  })