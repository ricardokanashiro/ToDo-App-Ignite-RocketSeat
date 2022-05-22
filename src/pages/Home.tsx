import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface editTaskAtributes{
  taskId: number,
  taskNewTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
      const taskExist = tasks.find(taskTitle => taskTitle.title === newTaskTitle);

      if(!taskExist){
        const task = {
          id: new Date().getTime(),
          title: newTaskTitle,
          done: false
        }
    
        setTasks(oldState => [...oldState, task]);
      } else{
        Alert.alert("Todo Existente", "Já existe um todo com o mesmo titulo!", [
          {
            text: "Ok"
          }
        ])
      }
  }

  function handleToggleTaskDone(id: number) {

    const updatedTasks = tasks.map(tasks => ({ ...tasks }))

    const foundTask = updatedTasks.find(task => task.id === id)

    if(foundTask){
      foundTask.done === false ? foundTask.done = true : foundTask.done = false
    }

    setTasks(updatedTasks)

    //TODO - toggle task done if exists
  }

  function handleEditTask({taskId, taskNewTitle}: editTaskAtributes) {
    const updatedTasks = tasks.map(task => ({...task}))
    let foundTask = updatedTasks.find(task => task.id === taskId)
    console.log(foundTask)

    if(foundTask){
      foundTask.title = taskNewTitle

      setTasks(updatedTasks)
      console.log(updatedTasks)
    }
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Excluir ToDo", "Você realmente deseja excluir este ToDo da sua lista?", [
      {
        text: "Não"
      },

      {
        text: "Sim",
        onPress: () => setTasks(oldState => oldState.filter(tasks => tasks.id != id))
      }
    ])
    //TODO - remove task from state
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})