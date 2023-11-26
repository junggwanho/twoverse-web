import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import palette from '../../../lib/styles/palette';


function ProgressBar({ totalStep, nowStep }) {
  const loaderValue = useRef(new Animated.Value(1)).current;

  const load = (count) => {
    Animated.timing(loaderValue, {
      toValue: (count / totalStep) * 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const width = loaderValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp"
  });

  useEffect(() => {
    load(nowStep);
  }, [nowStep]);

  return (
    <View>
      <View style={styles.bar}>
        <Animated.View
          style={{
            backgroundColor: palette.cyan[4],
            width,
            height: 5,
            borderTopRightRadius:8,
            borderBottomRightRadius:8
          }}
        />
      </View> 
      <Text style={styles.step}>1공정 {nowStep}/{totalStep}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    marginTop: '6px',
    width: '100%',
    height: 6,
    backgroundColor: palette.gray[3]
  },
  step: {
    color: '#AAC9CE',
    fontWeight: '400',
    fontSize: 16,
    padding: 16,
    lineHeight: 10,
    textAlign: 'center'
  }
});

export default ProgressBar;
