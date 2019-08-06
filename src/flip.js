import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

const Flip = ({ flipped = false, front = <Front />, back = <Back /> }) => {
  let flipAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(flipAnim, {
      toValue: flipped ? 1 : 0,
      friction: 8
    }).start();
  }, [flipped]);

  const frontAnimStyle = {
    transform: [
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "180deg"]
        })
      }
    ]
  };

  const backAnimStyle = {
    transform: [
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ["180deg", "360deg"]
        })
      }
    ]
  };

  return (
    <View>
      <Animated.View style={[styles.flip, frontAnimStyle]}>
        {front}
      </Animated.View>
      <Animated.View style={[styles.flip, styles.flipBack, backAnimStyle]}>
        {back}
      </Animated.View>
    </View>
  );
};

const Front = () => <View style={styles.front} />;

const Back = () => <View style={styles.back} />;

const styles = StyleSheet.create({
  flip: {
    backfaceVisibility: "hidden"
  },
  flipBack: {
    position: "absolute"
  },
  front: {
    width: 200,
    height: 200,
    backgroundColor: "blue"
  },
  back: {
    width: 200,
    height: 200,
    backgroundColor: "red"
  }
});

export default Flip;
