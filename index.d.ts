import * as React from 'react';
import { FlatListProps } from 'react-native';

export interface SwipeableRowProps {
    children?: React.ReactNode;
    isOpen?: boolean;
    maxSwipeDistance?: number;
    onClose?: () => void;
    onOpen?: () => void;
    onSwipeEnd?: () => void;
    onSwipeStart?: () => void;
    preventSwipeRight?: boolean;
    shouldBounceOnMount?: boolean;
    slideoutView?: React.ReactNode;
    swipeThreshold?: number;
}

export class SwipeableRow extends React.Component<SwipeableRowProps> {
    close(): void;
}

export interface SwipeableFlatListProps<ItemT> extends FlatListProps<ItemT> {
    bounceFirstRowOnMount?: boolean;
    maxSwipeDistance?: number | ((info: { item: ItemT; index: number }) => number);
    renderQuickActions?: (info: { item: ItemT; index: number }) => React.ReactNode;
}

export default class SwipeableFlatList<ItemT> extends React.Component<SwipeableFlatListProps<ItemT>> {}
