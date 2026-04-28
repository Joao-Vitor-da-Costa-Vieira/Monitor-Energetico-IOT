import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SafeView = ({style, safe = false, ...props}) => {
  const insets = useSafeAreaInsets()

  return (
    <View style={[{paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right,},style]}
    {...props}
    />
  )
}

export default SafeView

const styles = StyleSheet.create({})