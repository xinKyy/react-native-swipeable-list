import React, { useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Pressable,
  Alert,
} from 'react-native';

// @ts-ignore-next-line
import SwipeableFlatList from 'react-native-swipeable-list';

import {dummyData} from './data/dummyData';

const darkColors = {
  background: '#121212',
  primary: '#BB86FC',
  primary2: '#3700b3',
  secondary: '#03DAC6',
  onBackground: '#FFFFFF',
  error: '#CF6679',
};

const colorEmphasis = {
  high: 0.87,
  medium: 0.6,
  disabled: 0.38,
};

const extractItemKey = (item: Item) => {
  return item.id.toString();
};

interface RenderItemProps {
  item: {
    id: number;
    name: string;
    subject: string;
    text: string;
  };
  deleteItem: (itemId: Item['id']) => void;
}

type Item = {
  id: number;
  name: string;
  subject: string;
  text: string;
};

const RenderItem = ({item}: RenderItemProps) => {
  return (
    <>
      <View style={styles.item}>
        <View style={styles.avatar} />
        <View style={styles.messageContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.subject} numberOfLines={1}>
            Subject: {item.subject}
          </Text>
          <Text style={styles.text} numberOfLines={2}>
            {item.text}
          </Text>
        </View>
      </View>
      <View />
    </>
  );
};

interface QuickActionsProps {
  index: number;
  item: Item;
  archiveItem: (itemId: Item['id']) => void;
  snoozeItem: (itemId: Item['id']) => void;
  deleteItem: (itemId: Item['id']) => void;
}

const QuickActions = ({
  item,
  archiveItem,
  snoozeItem,
  deleteItem,
}: QuickActionsProps) => {
  return (
    <View style={styles.qaContainer}>
      <View style={[styles.button, styles.button1]}>
        <Pressable onPress={() => archiveItem(item.id)}>
          <Text style={styles.buttonText}>Archive</Text>
        </Pressable>
      </View>
      <View style={[styles.button, styles.button2]}>
        <Pressable onPress={() => snoozeItem(item.id)}>
          <Text style={styles.buttonText}>Snooze</Text>
        </Pressable>
      </View>
      <View style={[styles.button, styles.button3]}>
        <Pressable onPress={() => deleteItem(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
};

function renderItemSeparator() {
  return <View style={styles.itemSeparator} />;
}

const App = () => {
  const [data, setData] = useState(dummyData);
  // 添加 ref 用于调用关闭方法
  const swipeableListRef = useRef<any>(null);

  // 手动关闭展开的行
  const handleCloseAll = () => {
    swipeableListRef.current?.close();
  };

  const deleteItem = (itemId: Item['id']) => {
    // ! Please don't do something like this in production. Use proper state management.
    const newState = [...data];
    const filteredState = newState.filter(item => item.id !== itemId);
    setData(filteredState);
    swipeableListRef.current?.close();
  };

  const archiveItem = (itemId: Item['id']) => {
    Alert.alert(
      'DISHONESTY ALERT',
      "Not gonna Archive it. We're actually are gonna just delete it.",
      [
        {
          text: 'Just delete it?',
          onPress: () => deleteItem(itemId),
          style: 'destructive',
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
    );
  };

  const snoozeItem = (itemId: Item['id']) => {
    Alert.alert(
      'DISHONESTY ALERT',
      "Not gonna Snooze it. We're actually are gonna just delete it.",
      [
        {
          text: 'Just delete it?',
          onPress: () => deleteItem(itemId),
          style: 'destructive',
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Inbox</Text>
          {/* 添加关闭按钮，演示手动关闭功能 */}
          <Pressable onPress={handleCloseAll} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>关闭所有</Text>
          </Pressable>
        </View>
        <SwipeableFlatList
          ref={swipeableListRef}
          keyExtractor={extractItemKey}
          data={data}
          renderItem={({item}: RenderItemProps) => (
            <RenderItem item={item} deleteItem={() => deleteItem} />
          )}
          maxSwipeDistance={240}
          renderQuickActions={({index, item}: {index: number; item: Item}) =>
            QuickActions({index, item, archiveItem, snoozeItem, deleteItem})
          }
          contentContainerStyle={styles.contentContainerStyle}
          // shouldBounceOnMount={false} -- This is not working on 0.74+ React Native
          bounceFirstRowOnMount={false} // THIS IS THE WORKAROUND
          ItemSeparatorComponent={renderItemSeparator}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
  },
  headerContainer: {
    height: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 30,
    fontWeight: '800',
    color: darkColors.onBackground,
    opacity: colorEmphasis.high,
  },
  closeButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: darkColors.primary,
    borderRadius: 6,
  },
  closeButtonText: {
    color: darkColors.onBackground,
    fontSize: 14,
    fontWeight: '600',
  },
  item: {
    backgroundColor: '#121212',
    height: 80,
    flexDirection: 'row',
    padding: 10,
  },
  messageContainer: {
    backgroundColor: darkColors.background,
    maxWidth: 300,
  },
  name: {
    fontSize: 16,
    color: darkColors.primary,
    opacity: colorEmphasis.high,
    fontWeight: '800',
  },
  subject: {
    fontSize: 14,
    color: darkColors.onBackground,
    opacity: colorEmphasis.high,
    fontWeight: 'bold',
    textShadowColor: darkColors.secondary,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 4,
  },
  text: {
    fontSize: 10,
    color: darkColors.onBackground,
    opacity: colorEmphasis.medium,
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: darkColors.onBackground,
    opacity: colorEmphasis.high,
    borderColor: darkColors.primary,
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 7,
    alignSelf: 'center',
    shadowColor: darkColors.secondary,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
    shadowOpacity: colorEmphasis.high,
  },
  itemSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: darkColors.onBackground,
    opacity: colorEmphasis.medium,
  },
  qaContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button1: {
    backgroundColor: darkColors.primary,
  },
  button2: {
    backgroundColor: darkColors.secondary,
  },
  button3: {
    backgroundColor: darkColors.error,
  },
  buttonText: {
    fontWeight: 'bold',
    opacity: colorEmphasis.high,
    color: darkColors.onBackground,
    fontSize: 16,
  },
  contentContainerStyle: {
    flexGrow: 1,
    backgroundColor: darkColors.background,
  },
});

export default App;
