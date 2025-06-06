import { StyleSheet, Text, ScrollView,View } from 'react-native'
import React from 'react'
import PageTitle from '@/components/PageTitle'



export default function ReportScreen() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <PageTitle title='Signalement' />
      </View>
      <View>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#E1E1E1",
  },
  
})