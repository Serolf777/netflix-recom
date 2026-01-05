import React, { useRef, FC } from 'react';
import { Easing } from 'react-native';
import { View, Animated, type ViewStyle, type ColorValue } from 'react-native';

interface LoaderProps {
    name?: string,
    color?: ColorValue,

}
const height = 50;

const Loader: FC<LoaderProps> = ({ name = "2-curves", color }) => {
    let containerStyle: ViewStyle = {};
    let backgroundStyle: ViewStyle = {};
    let loaderStyle: ViewStyle = {};
    const rotation = useRef(new Animated.Value(0)).current

    switch (name) {
        case '2-curves':
            containerStyle = {
                ...containerStyle,
                height: 48,
                width: 48,
            }
            backgroundStyle = {
                ...backgroundStyle,
                height: '100%',
                width: '100%',
                borderRadius: height,
                backgroundColor: 'transparent',
            }
            loaderStyle = {
                ...loaderStyle,
                position: 'absolute',
                height: '100%',
                width: '100%',
                borderRadius: height,
                borderWidth: 5,
                backgroundColor: 'transparent',
                borderTopColor: color ? color : 'dodgerblue',
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: color ? color : 'dodgerblue',
            }
            Animated.loop(Animated.parallel([
                Animated.timing(
                    rotation,
                    {
                        toValue: 360,
                        duration: 1000,
                        easing: Easing.linear,
                        useNativeDriver: true
                    }
                )
            ])).start()
            break;
        default:
            break;
    }

    if (name == '2-curves') {
        return (
            <View style={[containerStyle]}>
                <View style={[backgroundStyle]} ></View>
                <Animated.View style={[loaderStyle, {
                    transform: [{
                        rotateZ: rotation.interpolate({
                            inputRange: [0,360],
                            outputRange: ['0deg','360deg'],
                        })
                    }]
                }]} ></Animated.View>
            </View>
        )
    }
    else {
        return <></>
    }
}
export default Loader;