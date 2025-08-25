import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SwipeableFlatList, SwipeableRow } from 'react-native-swipeable-list';

// 定义数据项的类型
interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

// 定义优先级颜色映射
const priorityColors = {
  low: '#4CAF50',
  medium: '#FF9800',
  high: '#F44336',
};

const TypeScriptExample: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: '1', title: '学习 TypeScript', completed: false, priority: 'high' },
    { id: '2', title: '构建 React Native 应用', completed: false, priority: 'medium' },
    { id: '3', title: '阅读文档', completed: true, priority: 'low' },
    { id: '4', title: '写测试用例', completed: false, priority: 'high' },
  ]);

  // 渲染列表项
  const renderItem = ({ item }: { item: TodoItem }) => (
    <View style={[styles.todoItem, { borderLeftColor: priorityColors[item.priority] }]}>
      <Text style={[styles.todoTitle, item.completed && styles.completedText]}>
        {item.title}
      </Text>
      <Text style={styles.priorityText}>
        优先级: {item.priority}
      </Text>
      <Text style={styles.statusText}>
        {item.completed ? '已完成' : '未完成'}
      </Text>
    </View>
  );

  // 渲染快速操作
  const renderQuickActions = ({ item }: { item: TodoItem }) => (
    <View style={styles.quickActions}>
      <View style={[styles.actionButton, styles.completeButton]}>
        <Text style={styles.actionText}>
          {item.completed ? '取消完成' : '标记完成'}
        </Text>
      </View>
      <View style={[styles.actionButton, styles.deleteButton]}>
        <Text style={styles.actionText}>删除</Text>
      </View>
    </View>
  );

  // 处理完成状态切换
  const handleToggleComplete = (item: TodoItem) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === item.id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 处理删除
  const handleDelete = (item: TodoItem) => {
    Alert.alert(
      '确认删除',
      `确定要删除 "${item.title}" 吗？`,
      [
        { text: '取消', style: 'cancel' },
        {
          text: '删除',
          style: 'destructive',
          onPress: () => {
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== item.id));
          },
        },
      ]
    );
  };

  // 处理快速操作点击
  const handleQuickAction = (item: TodoItem, action: 'complete' | 'delete') => {
    if (action === 'complete') {
      handleToggleComplete(item);
    } else if (action === 'delete') {
      handleDelete(item);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TypeScript 示例 - 待办事项</Text>
      <SwipeableFlatList<TodoItem>
        data={todos}
        renderItem={renderItem}
        renderQuickActions={renderQuickActions}
        keyExtractor={(item) => item.id}
        maxSwipeDistance={150}
        bounceFirstRowOnMount={true}
        renderItemStyle={styles.listItemContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  listItemContainer: {
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  todoItem: {
    backgroundColor: 'white',
    padding: 16,
    borderLeftWidth: 4,
    borderRadius: 8,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  priorityText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  statusText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  quickActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: '100%',
  },
  completeButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  actionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default TypeScriptExample;
