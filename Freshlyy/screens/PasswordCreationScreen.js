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
import { FilledBigButton,ShadedBigButton  } from '../components/Buttons';
import { TextInputBox, DropDownPicker } from '../components/Inputs';


export default function (){
    return(
        <View style={styles.screen}> 
          <View>
             <Image source={require('../assets/logo.png')} style={styles.logo} />
          </View>
          <Image source={require('../assets/passwordvec.png')} style={styles.loginpic}/>
          <View style={styles.inputcont}>
          <TextInputBox inputlabel="Password" type="new-password" />
          <TextInputBox inputlabel="Confirm Password" type="new-password" />
          </View>
          <View>
          
          </View>
        
          <TouchableOpacity>
              <ShadedBigButton  title="Log In" style={styles.loginbutton}/>
          </TouchableOpacity>
        </View>
        
    )
}
const styles=StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        fontFamily: 'Poppins',
      },
      logo:{
        height:50,
        resizeMode:'contain',
        marginTop:50
      },
      loginpic:{
        width: 300,
        height: 200,
        marginTop:50,
        marginBottom:0

      },
      logintext:{
        margin:0,
        color:Theme.primary
      },
      inputcont:{
         width:'80%',
         justifyContent:'center',
         alignItems:'center',
         marginBottom:30
         
      },
    

});