import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { useDispatch } from 'react-redux'
import { setDestination } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native'
import NavFavorites from './NavFavorites'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'
import HomeScreen from '../screens/HomeScreen'
const NavigateCard = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning, ZUBER User</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
         
        </View>
        <NavFavorites />
      </View>
      <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
        <TouchableOpacity style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <Icon name='car' type='font-awesome' color='white' size={16} tvParallaxProperties={undefined} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}>
          <Icon name='fast-food-outline' type='ionicon' color='black' size={16} tvParallaxProperties={undefined} />
          <Text style={tw`text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: '#DDDDDF',
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  }
})