import { React, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Theme from '../constants/theme';
import { Button } from '../components/Buttons';
import { TextInputBox, DropDownPicker, DatePicker } from '../components/Inputs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { H4, P } from '../components/Texts';
import { AntDesign,Ionicons } from '@expo/vector-icons';
import {LocationCard} from '../components/LocationCard';
import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api';


export default function () {
    return (
        <SafeAreaView>
            <Header back={true} />
            <ScrollView>
            <View style={styles.screen}>
              <h3>Select your Address</h3>
              const{}= useLoadScript({
                //googleMapsApiKey:;
              })
            </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    fontFamily: 'Poppins',
  },
  
});