import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, TextInput, Image, StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'

import { Task } from './TasksList';

interface TasksItemProps {
  index: number;
  item: Task;
  removeTask: (id: number) => void;
  toggleTaskDone: (id: number) => void;
  editTask: (id: number, title: string) => void;
}

export function TaskItem({ index, item, removeTask, toggleTaskDone, editTask}: TasksItemProps){
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(item.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setUpdatedTitle(item.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask(item.id, updatedTitle);
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <View style={{ flex:1, flexDirection:'row', alignItems: 'center', justifyContent: 'space-between' }} >
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View 
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
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
            style={item.done ? styles.taskTextDone : styles.taskText}
            value={updatedTitle}
            onChangeText={setUpdatedTitle}
            editable={isEditing}
            ref={textInputRef}
            onSubmitEditing={handleSubmitEditing}
          />
        </TouchableOpacity>

      </View>
      <View style={styles.iconsContainer}>
        {isEditing ? (
          <TouchableOpacity
          onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#FFF" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
          testID={`trash-${index}`}
          onPress={handleStartEditing}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )
        }
        
        <View style={ styles.iconsDivider }>
        </View>

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{paddingRight: 24}}
          onPress={() => removeTask(item.id)}
          >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: 'row',
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
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
  },
  iconsDivider: {
    width: 1,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    height: 24,
    marginHorizontal: 12,
  }
})