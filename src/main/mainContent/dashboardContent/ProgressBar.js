import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import palette from '../../../lib/styles/palette';


function ProgressBar({ ProgressName, totalStep, nowStep }) {
  const loaderValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const load = (count) => {
      Animated.timing(loaderValue, {
        toValue: (count / totalStep) * 100,
        duration: 500,
        useNativeDriver: false, // Native driver doesn't support "backgroundColor" changes
      }).start();
    };

    load(nowStep);
  }, [nowStep, totalStep]);

  const width = loaderValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Animated.View
          style={{
            backgroundColor: palette.cyan[4],
            width,
            height: 5,
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
          }}
        />
      </View>
      <Text style={styles.step}>
        {ProgressName} {nowStep}/{totalStep}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
  },
  bar: {
    width: "100%",
    height: 6,
    backgroundColor: palette.gray[3],
  },
  step: {
    color: "#AAC9CE",
    fontWeight: "400",
    fontSize: 16,
    padding: 16,
    lineHeight: 10,
    textAlign: "center",
  },
});

export default ProgressBar;
