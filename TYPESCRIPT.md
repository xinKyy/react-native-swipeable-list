# TypeScript 支持

这个库现在完全支持 TypeScript！我们提供了完整的类型定义，让你可以在 TypeScript 项目中获得更好的开发体验。

## 安装

确保你的项目已经安装了 TypeScript 和 React Native 的类型定义：

```bash
npm install --save-dev typescript @types/react @types/react-native
```

## 基本用法

### SwipeableFlatList

```typescript
import React from 'react';
import { SwipeableFlatList } from 'react-native-swipeable-list';

interface Item {
  id: string;
  title: string;
  description: string;
}

const MyComponent: React.FC = () => {
  const data: Item[] = [
    { id: '1', title: '项目 1', description: '这是第一个项目' },
    { id: '2', title: '项目 2', description: '这是第二个项目' },
  ];

  const renderItem = ({ item }: { item: Item }) => (
    <View style={{ padding: 20, backgroundColor: 'white' }}>
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
    </View>
  );

  const renderQuickActions = ({ item }: { item: Item }) => (
    <View style={{ backgroundColor: 'red', justifyContent: 'center', padding: 20 }}>
      <Text style={{ color: 'white' }}>删除</Text>
    </View>
  );

  return (
    <SwipeableFlatList<Item>
      data={data}
      renderItem={renderItem}
      renderQuickActions={renderQuickActions}
      keyExtractor={(item) => item.id}
      maxSwipeDistance={100}
      bounceFirstRowOnMount={true}
    />
  );
};
```

### SwipeableRow

```typescript
import React from 'react';
import { SwipeableRow } from 'react-native-swipeable-list';

const MyRow: React.FC = () => {
  const handleOpen = () => {
    console.log('行被打开了');
  };

  const handleClose = () => {
    console.log('行被关闭了');
  };

  return (
    <SwipeableRow
      maxSwipeDistance={100}
      onOpen={handleOpen}
      onClose={handleClose}
      slideoutView={
        <View style={{ backgroundColor: 'blue', justifyContent: 'center', padding: 20 }}>
          <Text style={{ color: 'white' }}>操作</Text>
        </View>
      }
    >
      <View style={{ padding: 20, backgroundColor: 'white' }}>
        <Text>这是可滑动的行</Text>
      </View>
    </SwipeableRow>
  );
};
```

## 类型定义

### SwipeableFlatListProps<ItemT>

继承自 React Native 的 `FlatListProps<ItemT>`，并添加了以下特有属性：

- `bounceFirstRowOnMount?: boolean` - 是否在挂载时弹跳第一行
- `maxSwipeDistance?: number | ((info: ListRenderItemInfo<ItemT>) => number)` - 最大滑动距离
- `renderQuickActions: (info: ListRenderItemInfo<ItemT>) => React.ReactNode | null` - 渲染快速操作视图
- `renderItemStyle?: ViewStyle` - 渲染项目的样式

### SwipeableRowProps

- `children?: React.ReactNode` - 子组件
- `isOpen?: boolean` - 行是否处于打开状态
- `maxSwipeDistance?: number` - 最大滑动距离
- `onClose?: () => void` - 关闭时的回调函数
- `onOpen?: () => void` - 打开时的回调函数
- `onSwipeEnd?: () => void` - 滑动结束时的回调函数
- `onSwipeStart?: () => void` - 滑动开始时的回调函数
- `preventSwipeRight?: boolean` - 是否阻止向右滑动
- `shouldBounceOnMount?: boolean` - 是否在挂载时弹跳
- `slideoutView?: React.ReactNode` - 滑动时显示的视图
- `swipeThreshold?: number` - 滑动阈值
- `renderItemStyle?: ViewStyle` - 渲染项目的样式

## 泛型支持

`SwipeableFlatList` 支持泛型，你可以指定列表项的类型：

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

const userList = (
  <SwipeableFlatList<User>
    data={users}
    renderItem={({ item }) => <UserRow user={item} />}
    renderQuickActions={({ item }) => <UserActions user={item} />}
    keyExtractor={(user) => user.id}
  />
);
```

## 事件处理

你可以监听各种滑动事件：

```typescript
const handleSwipeStart = () => {
  console.log('滑动开始');
};

const handleSwipeEnd = () => {
  console.log('滑动结束');
};

const handleOpen = (key: string) => {
  console.log(`行 ${key} 被打开`);
};

const handleClose = (key: string) => {
  console.log(`行 ${key} 被关闭`);
};
```

## 样式定制

你可以通过 `renderItemStyle` 属性自定义行的样式：

```typescript
<SwipeableFlatList
  data={data}
  renderItem={renderItem}
  renderQuickActions={renderQuickActions}
  renderItemStyle={{
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  }}
/>
```

## 注意事项

1. 确保你的 TypeScript 配置中启用了 `strict` 模式以获得最佳的类型检查
2. 如果你遇到类型错误，请检查是否正确导入了类型
3. 所有的回调函数都是可选的，你可以根据需要选择实现

## 贡献

如果你发现类型定义中的问题或有改进建议，欢迎提交 Issue 或 Pull Request！
