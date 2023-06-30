import { globalDrawer } from 'packages/components/Drawer';

const onSwipeRight = (gestureState) => {
    console.log(gestureState);
    globalDrawer.open()
}

export {
    onSwipeRight,
}
