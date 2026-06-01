// components/safeView.js
import { StyleSheet, ScrollView, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SafeView = ({ style, safe = false, scrollable = true, children, ...props }) => {
  const insets = useSafeAreaInsets()

  const containerStyle = [
    {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      flex: 1,
    },
    style,
  ]

  if (scrollable) {
    return (
      <ScrollView 
        style={containerStyle}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent, { paddingBottom: 100 }}
        {...props}
      >
        {children}
      </ScrollView>
    )
  }

  return (
    <View style={containerStyle} {...props}>
      {children}
    </View>
  )
}

export default SafeView

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
})