import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { useSelector } from 'react-redux'
import { selectDestination, selectOrigin } from '../slices/navSlice'
import { useRef } from 'react'

const Map = () => {
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  const mapRef = useRef(null)

  useEffect(() => {
    if (!origin || !destination) return
    // @ts-ignore: Object is possibly 'null'
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }
    })
  }, [origin, destination])

  return (
    <View
      ref={mapRef}
      style={tw`flex-1`}
    >
    <Text>Inside Map</Text>
    </View>
  )
}

export default Map

const styles = StyleSheet.create({})