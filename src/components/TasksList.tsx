import React from 'react';
import { FlatList, StyleSheet, FlatListProps } from 'react-native';

import { ItemWrapper } from './ItemWrapper';

import { TaskItem } from './TaskItem';

import { editTaskAtributes } from "../pages/Home";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({taskId, taskNewTitle}: editTaskAtributes) => void
}

export function TasksList({ tasks, toggleTaskDone, removeTask, editTask }: TasksListProps) {

  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem
              index={index}
              item={item}
              toggleTaskDone={toggleTaskDone}
              removeTask={removeTask}
              editTask={editTask}
            />
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}