import React from 'react';
import {
  FlatListProps,
  ListRenderItemInfo,
  ViewStyle,
  Animated
} from 'react-native';

// 滑动方向枚举
export type SwipeDirection = 'left' | 'right';

// 滑动状态枚举
export type SwipeState = 'closed' | 'opening' | 'open' | 'closing';

// SwipeableRow 组件的 Props 类型
export interface SwipeableRowProps {
  /** 子组件 */
  children?: React.ReactNode;
  /** 行是否处于打开状态 */
  isOpen?: boolean;
  /** 最大滑动距离 */
  maxSwipeDistance?: number;
  /** 关闭时的回调函数 */
  onClose?: () => void;
  /** 打开时的回调函数 */
  onOpen?: () => void;
  /** 滑动结束时的回调函数 */
  onSwipeEnd?: () => void;
  /** 滑动开始时的回调函数 */
  onSwipeStart?: () => void;
  /** 是否阻止向右滑动 */
  preventSwipeRight?: boolean;
  /** 是否在挂载时弹跳 */
  shouldBounceOnMount?: boolean;
  /** 滑动时显示的视图 */
  slideoutView?: React.ReactNode;
  /** 滑动阈值 */
  swipeThreshold?: number;
  /** 渲染项目的样式 */
  renderItemStyle?: ViewStyle;
}

// SwipeableRow 组件的 State 类型
export interface SwipeableRowState {
  currentLeft: Animated.Value;
  isSwipeableViewRendered: boolean;
  rowHeight: number | null;
}

// SwipeableFlatList 特有的 Props 类型
export interface SwipeableFlatListProps<ItemT> extends Omit<FlatListProps<ItemT>, 'renderItem'> {
  /** 是否在挂载时弹跳第一行 */
  bounceFirstRowOnMount?: boolean;
  /** 最大滑动距离，可以是数字或函数 */
  maxSwipeDistance?: number | ((info: ListRenderItemInfo<ItemT>) => number);
  /** 渲染快速操作视图的回调函数 */
  renderQuickActions: (info: ListRenderItemInfo<ItemT>) => React.ReactNode | null;
  /** 渲染列表项的回调函数 */
  renderItem: (info: ListRenderItemInfo<ItemT>) => React.ReactElement;
  /** 渲染项目的样式 */
  renderItemStyle?: ViewStyle;
  /** 向右滑动的最大距离 */
  maxRightSwipeDistance?: number;
}

// SwipeableFlatList 组件的 State 类型
export interface SwipeableFlatListState {
  openRowKey: string | null;
}

// 滑动事件信息
export interface SwipeEventInfo {
  /** 滑动的方向 */
  direction: SwipeDirection;
  /** 滑动的距离 */
  distance: number;
  /** 滑动的速度 */
  velocity: number;
  /** 滑动的状态 */
  state: SwipeState;
}

// SwipeableFlatList 组件类
export declare class SwipeableFlatList<ItemT> extends React.Component<
  SwipeableFlatListProps<ItemT>,
  SwipeableFlatListState
> {
  static defaultProps: {
    bounceFirstRowOnMount: boolean;
    renderQuickActions: () => null;
  };

  /** 关闭当前打开的行 */
  close(): void;

  /** 关闭指定键的行 */
  closeRow(key: string): void;

  /** 打开指定键的行 */
  openRow(key: string): void;

  /** 获取当前打开行的键 */
  getOpenRowKey(): string | null;
}

// SwipeableRow 组件类
export declare class SwipeableRow extends React.Component<
  SwipeableRowProps,
  SwipeableRowState
> {
  /** 关闭行 */
  close(): void;

  /** 打开行 */
  open(): void;

  /** 检查行是否打开 */
  isOpen(): boolean;
}

// 导出默认组件
declare const SwipeableFlatList: typeof SwipeableFlatList;
declare const SwipeableRow: typeof SwipeableRow;

export { SwipeableFlatList, SwipeableRow };
export default SwipeableFlatList;
