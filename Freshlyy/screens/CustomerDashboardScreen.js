import React, { useCallback, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FadeComponent from '../components/FadeComponent';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import DashBoardCard from '../components/DashBoardCard';
import ServicesCardDB from '../components/ServicesCardDB';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../constants/theme';
import ENV from '../constants/env';
import InfoCardDBCust from '../components/InfoCardDBCust';

export default function ({ navigation, route }) {
  const [loaded, setLoaded] = React.useState(false);
  const [userData, setUserData] = useState({});
  function viewOrders(type) {
    navigation.navigate('Orders List', {
      initialTab: type,
    });
  }
  React.useEffect(() => {
    fetch(ENV.backend + '/customer/dashboard', {
      method: 'GET',
      headers: {
        useremail: route.params.userEmail,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message != 'Success') {
          throw new Error('Something went wrong');
        }
        setUserData(res);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header customer={true} />
        {!loaded ? (
          <Loading />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.pageContent}
          >
            <FadeComponent>
              <InfoCardDBCust user={userData.user} />
              <View style={styles.cardContainer}>
                <DashBoardCard
                  imageUri={require('../assets/topay.png')}
                  number={userData.toPay}
                  text='To Pay'
                  onPress={() => viewOrders('To Pay')}
                />
                <DashBoardCard
                  imageUri={require('../assets/processing.png')}
                  number={userData.toProcess + userData.toShip || null}
                  text='Processing'
                  onPress={() => viewOrders('Processing')}
                />
                <DashBoardCard
                  imageUri={require('../assets/topickup.png')}
                  number={userData.toPickup}
                  text='To Pick Up'
                  onPress={() => viewOrders('To Pickup')}
                />
                <DashBoardCard
                  imageUri={require('../assets/shipped.png')}
                  number={userData.toReceive}
                  text='Shipped'
                  onPress={() => viewOrders('Shipped')}
                />
                <DashBoardCard
                  imageUri={require('../assets/toreview.png')}
                  number={userData.toReview}
                  text='To Review'
                  onPress={() => viewOrders('To Review')}
                />
                <DashBoardCard
                  imageUri={require('../assets/all.png')}
                  number={userData.all}
                  text='All Orders'
                  onPress={() => viewOrders('All')}
                />
              </View>
              <ServicesCardDB />
              <View style={styles.lastChild}></View>
            </FadeComponent>
          </ScrollView>
        )}
        <Navbar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    fontFamily: 'Poppins',
  },

  headings: {
    margin: 15,
    paddingHorizontal: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
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
