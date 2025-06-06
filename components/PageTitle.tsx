import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

interface PageTitleProps {
  title: string;
}
const PageTitle: React.FC<PageTitleProps> = function PageTitle({title}) {
  return (
    <View style={styles.pageTitleContainer}>
      <Text style={styles.pageTitleText}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  pageTitleContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  pageTitleText: {
    fontFamily: "calibri",
    fontSize: 30,
    fontWeight: "bold",
  }
})

export default PageTitle;