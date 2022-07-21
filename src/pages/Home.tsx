import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask: Task = {
      id: (tasks[tasks.length - 1]?.id || 0) + 1,
      title: newTaskTitle,
      done: false,
    };

    setTasks((oldTasks) => [...oldTasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedList = tasks.map((it) => {
      if (id === it.id) {
        const updatedTask = {
          ...it,
          done: !it.done,
        };
        return updatedTask;
      }

      return it;
    });

    setTasks(updatedList);
  }

  function handleRemoveTask(id: number) {
    const filteredList = tasks.filter((it) => it.id !== id);
    setTasks(filteredList);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
