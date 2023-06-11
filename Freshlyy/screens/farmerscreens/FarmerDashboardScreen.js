import React, { useCallback, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Button } from '../../components/Buttons';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import SwipeOverlay from '../../components/SwipeOverlay';
import InfoCardDB from '../../components/InfoCardDB';
import DashBoardCard from '../../components/DashBoardCard';
import ServicesCardDB from '../../components/ServicesCardDB';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../../constants/theme';
import ENV from '../../constants/env';
import { H4 } from '../../components/Texts';
import RefreshView from '../../components/RefreshView';

export default function ({ navigation, route }) {
  const [loaded, setLoaded] = React.useState(false);
  const [userData, setUserData] = useState([]);
  const [sellingProducts, setSellingProducts] = useState('');
  const [pendingProducts, setPendingProducts] = useState('');
  const [newOrders, setNewOrders] = useState('');
  const [pastOrders, setPastOrders] = useState('');
  const sheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const snapPoints = ['60%', '100%'];

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);
  const getData = React.useCallback(async () => {
    return fetch(ENV.backend + '/farmer/dashboard', {
      method: 'GET',
      headers: {
        Authorization: route.params.auth,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message != 'Success') {
          throw new Error('Something went wrong');
        }
        setUserData(res.user);
        setSellingProducts(res.liveProducts);
        setPendingProducts(res.pendingProducts);
        setNewOrders(res.newOrders);
        setPastOrders(res.pastOrders);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [route]);
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header
          farmer={true}
          notification={true}
          notifMode={'farmer'}
          hasNotifications={userData?.notifications}
        />
        <RefreshView getData={getData} route={route}>
          <InfoCardDB
            user={userData}
            goToBalances={() => navigation.navigate('Farmer Balance')}
          />
          <H4 style={styles.headings}>My Orders</H4>
          <View style={styles.cardContainer}>
            <DashBoardCard
              imageUri={require('../../assets/gift.png')}
              number={newOrders}
              text='New Orders'
              onPress={() => handleSnapPress(0)}
            />
            <DashBoardCard
              imageUri={require('../../assets/box.png')}
              number={pastOrders}
              text='Past Orders'
              onPress={() => handleSnapPress(0)}
            />
          </View>
          <H4 style={styles.headings}>My Listings</H4>
          <View style={styles.cardContainer}>
            <DashBoardCard
              imageUri={require('../../assets/trade.png')}
              number={sellingProducts}
              text='Selling'
              onPress={() => handleSnapPress(0)}
            />
            <DashBoardCard
              imageUri={require('../../assets/pending.png')}
              number={pendingProducts}
              text='Pending'
              onPress={() => handleSnapPress(0)}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              size='big'
              color='shadedPrimary'
              title='Add new produce listing'
              onPress={() => navigation.navigate('Insert Product')}
              // backgroundstyle={styles.button}
            />
          </View>
          <ServicesCardDB farmer={true} />
          <View style={styles.lastChild}></View>
        </RefreshView>
        <BottomSheet
          ref={sheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backgroundStyle={{
            borderTopRightRadius: 60,
            borderTopLeftRadius: 60,
          }}
          onClose={() => setIsOpen(false)}
        >
          <BottomSheetView>
            <SwipeOverlay />
          </BottomSheetView>
        </BottomSheet>
        <Navbar screenName='Cart' />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    fontFamily: 'Poppins',
  },
  container: {
    alignItems: 'center',
    // backgroundColor: Theme.overlay,
    width: '30%',
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
  },
  headings: {
    margin: 15,
    paddingHorizontal: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  buttonContainer: {
    margin: 20,
    alignItems: 'center',
  },
  lastChild: {
    height: 80,
  },
});
