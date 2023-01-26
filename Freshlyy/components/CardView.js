import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { H6, H3, H4, P, Pr } from '../components/Texts';
import { Button } from '../components/Buttons';
import Theme from '../constants/theme';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import ListItem from './ListItem';

export default function (props) {
  const card = props.card;
  let icon;
  switch (card.cardType) {
    case 'Master':
      icon = require('../assets/master.png');
      break;
    case 'Visa':
      icon = require('../assets/visa.png');
      break;
    case 'Amex':
      icon = require('../assets/amex.png');
      break;
  }
  return (
    <ListItem>
      <View style={styles.imageContainer}>
        <Image source={icon} style={styles.image} />
      </View>
      <View style={styles.descContainer}>
        <H6 style={{ fontFamily: 'Poppins' }}>{card.cardName}</H6>
        <P>{card.cardNo}</P>
        <P>
          {new Date(card.cardExp).getMonth()}/
          {new Date(card.cardExp).getFullYear() % 2000}
        </P>
      </View>
      <View style={styles.actionContainer}>
        <Button
          type='icon'
          icon={
            <MaterialIcons name='mode-edit' size={24} color={Theme.secondary} />
          }
          size='small'
          color='shadedSecondary'
          title='Edit'
        />
        <Button
          type='icon'
          icon={<FontAwesome name='trash-o' size={24} color={Theme.danger} />}
          size='small'
          color='shadedDanger'
          title='Remove'
        />
      </View>
    </ListItem>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    marginHorizontal: 5,
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: 70,
    height: 70,
  },
  descContainer: {
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
    height: '100%',
  },
  actionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
  },
});