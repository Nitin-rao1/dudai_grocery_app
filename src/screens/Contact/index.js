import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MapView, {AnimatedRegion, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {ThemeContext} from '../../theming/ThemeContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from '../../components/buttons/Button';
import {IndependentColors} from '../../config/Colors';
import Header from '../../components/Header';
import {
  getCurrentLocation,
  locationPermission,
} from '../../constants/helperFunction';
import Icons from '../../components/cards/Icons/Icons';
import {Image} from 'react-native-animatable';
import {scale} from 'react-native-size-matters';
import { FONT_SIZE_XXS, OPEN_SANS_REGULAR } from '../../config/Constants';
import { Indicators } from '../../components/apploader';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slices/SessionUser';
import Colors from '../../constants/Colors';

const GOOGLE_MAPS_API_KEY = 'AIzaSyA-JYTuTNzkY3mFtUQdfYA4agtWXrpatSk';

Geocoder.init(GOOGLE_MAPS_API_KEY);

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Contact = ({navigation, route}) => {
  const mapRef = useRef();
  const markerRef = useRef();
  const dispatch = useDispatch();

  const details = route?.params?.details; // lat ,lnd in details
  // console.log('details----------------->', details);

  const fulladdress = route?.params?.data;
  // console.log('fulladdress----------------->', fulladdress); // address in fulladdress

  const selectedLocation = route?.params?.location;
  console.log('selectedLocation----------------->', selectedLocation);

  // Using context
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;
  const [loading, setLoading] = useState(true);
  const [initialRegion, setInitialRegion] = useState(null);
  const [marker, setMarker] = useState(null);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [sublocality, setSublocality] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [landmark, setLandmark] = useState('');

  const [state, setState] = useState({
    coordinate: new AnimatedRegion({
      latitude: 30.7046,
      longitude: 77.1025,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    time: 0,
    distance: 0,
    heading: 0,
  });

  const {coordinate} = state;
  const updateState = data => setState(state => ({...state, ...data}));

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied == 'granted') {
      const {latitude, longitude, heading} = await getCurrentLocation();
      console.log('get live location after 4 seconds', heading);
      setTimeout(()=>{


        animate(latitude, longitude);
        updateState({
          coordinate: new AnimatedRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }),
        });
        // // Update initialRegion and marker with current location
        const newInitialRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.0169,
          longitudeDelta: 0.0154,
        };
        setInitialRegion(newInitialRegion);
        setMarker(newInitialRegion);
        getAddress(latitude, longitude);
        // setLoading(false)
      },2000)
    }else{
      navigation.goBack()
    }
  };

  useEffect(() => {
    getLiveLocation();
  }, []);

  const animate = (latitude, longitude) => {
    mapRef?.current?.animateToRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0169,
      longitudeDelta: 0.0154,
    });
   
    // const newCoordinate = {latitude, longitude};
    // if (Platform.OS == 'android') {
    //   if (markerRef.current) {
    //     markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
    //   }
    // } else {
    //   coordinate.timing(newCoordinate).start();
    // }
  };

  const getAddress = async (latitude, longitude) => {
    try {
      const response = await Geocoder.from(latitude, longitude);
      const address = response.results[0].formatted_address;
      console.log('formattedAddressComponent==========>>>>>>>', address);
      const formattedAddressComponent = response.results[0].address_components;
      let landmark, neighborhood, sublocality, postalCode;

      // Loop through the address components to find specific types
      formattedAddressComponent.forEach(component => {
        if (component.types.includes('landmark')) {
          landmark = component?.long_name;
        }
        if (component.types.includes('neighborhood')) {
          neighborhood = component?.long_name;
        }
        if (
          component.types.includes('sublocality') &&
          component.types.includes('sublocality_level_1')
        ) {
          sublocality = component?.long_name;
        }
        // if (component.types.includes("postal_code")) {
        //   postalCode = component.long_name;
        // }
      });
      // console.log('Sublocality:', sublocality);
      // console.log('Neighborhood:', neighborhood);
      // console.log('Landmark:', landmark);
      // console.log('Postal Code:', postalCode);
      const citi = response?.results[0]?.address_components[5]?.long_name;
      const text = address;
const values = text.split(',').map(item => item.trim());


  const cityValue = values[values?.length - 3] || citi;


      setAddress(address);
      setCity(cityValue);
      setSublocality(sublocality);
      setNeighborhood(neighborhood || address);
      setLandmark(landmark || address);
      setLoading(false)
      // console.log('formattedAddressComponent==========>>>>>>>', formattedAddressComponent);
      // console.log('response==========>>>>>>>', response);
      // console.log('address==========>>>>>>>', address);
      // console.log('citi==========>>>>>>>', citi);
    } catch (error) {
      console.log(error);
    }
  };

  const onRegionChange = newRegion => {
    console.log('New Region:', newRegion);
    const latitude = newRegion.latitude;
    const longitude = newRegion.longitude;
    setMarker({latitude, longitude});
    setInitialRegion(newRegion);
    getAddress(latitude, longitude);
    console.log('onRegionChange', newRegion);
  };

  useEffect(() => {
    if (details) {
      setMarker({latitude: details.lat, longitude: details.lon});
      getAddress(details.lat, details.lon);
    }
  }, [details]);
  // console.log('details..../////====>', details);

  useEffect(() => {
    if (selectedLocation) {
        const newInitialRegion = {
        longitude:selectedLocation.long,
        latitude:selectedLocation.lat,
        latitudeDelta: 0.0169,
        longitudeDelta: 0.0154,
      };
      setMarker(newInitialRegion);
      setInitialRegion(newInitialRegion);
      updateState({
        coordinate: new AnimatedRegion({
          longitude:selectedLocation.long,
        latitude:selectedLocation.lat,
        latitudeDelta: 0.0169,
        longitudeDelta: 0.0154,
        }),
      });
      mapRef?.current?.animateToRegion(newInitialRegion);
      getAddress(newInitialRegion.latitude, newInitialRegion.longitude);
    }
  }, [selectedLocation]);

  // console.log('markerrrrrrrrrrcheck===========>', marker);
  // console.log('initialregion============>', initialRegion);

  const onPressLocation = () => {
    navigation.navigate('Location', {getCordinates: fatchValues});
  };

  const fatchValues = data => {
    const {latitude, longitude} = data.pickupCords;
    setMarker({latitude, longitude});
    animate(latitude, longitude);
    // ... other code
    // console.log('data=========>', data);
  };

  //  const fatchValues = data => {
  //   setMarker(data.pickupCords);
  //   // setAddress(data.pickupCords);
  //   setState({
  //     StartingCords: {
  //       latitude: data.pickupCords.latitude,
  //       longitude: data.pickupCords.longitude,
  //     },
  //   });
  //   console.log('data=========>', data);
  // };

  const zoomIn = () => {
    if (mapRef?.current) {
      mapRef?.current?.animateToRegion({
        latitude: initialRegion.latitude,
        longitude: initialRegion.longitude,
        latitudeDelta: initialRegion.latitudeDelta / 2,
        longitudeDelta: initialRegion.longitudeDelta / 2,
      });
    }
  };

  const zoomOut = () => {
    if (mapRef?.current) {
      mapRef?.current?.animateToRegion({
        latitude: initialRegion.latitude,
        longitude: initialRegion.longitude,
        latitudeDelta: initialRegion.latitudeDelta * 2,
        longitudeDelta: initialRegion.longitudeDelta * 2,
      });
    }
  };

  const customMapStyle = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: IndependentColors.greyLightest,
          // color: '#ffffff' // Change the text color to white
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: IndependentColors.white, // Change road color to black
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: IndependentColors.white, // Change highway color to red
        },
      ],
    },
    {
      featureType: 'all',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: theme.textHighContrast,
          // color: '#ffffff' // Change the text color to white
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#00aaff', // Change water color to blue
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: IndependentColors.greyDark, // Change administrative border color to red
        },
        {
          weight: 1, // Increase border width
        },
      ],
    },
    // Add more style rules as needed
  ];

  const handleButtonPress = () => {
    if (address || fulladdress) {
      // If address or fulladdress is available, navigate to 'FillAddress' screen
      // console.log('address', address);
      // console.log('city', city);
      // console.log('marker', marker);
      // console.log('sublocality', sublocality);
      // console.log('neighborhood', neighborhood);
      // console.log('landmark', landmark);
      // return;
      const fillAddress = {
        address: address,
        city: city,
        marker: {
          latitude: marker.latitude,
          longitude: marker.longitude,
          latitudeDelta: 0.0169,
        longitudeDelta: 0.0154,
        },
        sublocality: sublocality,
        neighborhood: neighborhood,
        landmark: landmark,
      }
      navigation.navigate('FillAddress');
      dispatch(updateUser({selectedStoreDataEdit:fillAddress}));
    } else {
      // If neither address nor fulladdress is available, show an alert message
      Alert.alert('Address Not select', 'Please search & location');
    }
  };

  return (
  

    <View style={styles.container}>
      <Header
        back
        onLeftPress={() => navigation.goBack()}
        onRightPress={onPressLocation}
        title={"Add Address"}
        right="search"
        headerBg={Colors.primary}
        iconColor={IndependentColors.white}
        titleAlight={'center'}
        style={styles.header}
      />
      <View style={{flex: 1}}>
        {initialRegion && (
          <MapView
            ref={mapRef}
            style={{...styles.map, backgroundColor: 'white'}}
            initialRegion={initialRegion}
            moveOnMarkerPress={false}
            onRegionChangeComplete={onRegionChange}
            showsUserLocation={true}
            customMapStyle={customMapStyle}></MapView>
        )}
        {marker && (
          <View style={styles.overlayMarker}>
            <Image
              source={require('../../assets/images/placeholder/mappin.png')}
              style={styles.markerImage}
            />
            {/* <Icons
              name={'location-pin'}
              iconType={'MaterialIcons'}
              size={80}
              color={Colors.primary}
              style={styles.markerImage}
            /> */}
          </View>
        )}
        <View style={styles.zoomButtons}>
          <TouchableOpacity onPress={zoomIn} style={styles.zoomButton}>
            <Icons
              name={'plus'}
              iconType={'Entypo'}
              color={'black'}
              size={25}
            />
            {/* <Text style={styles.zoomButtonText}>+</Text> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={zoomOut} style={styles.zoomButton}>
            <Icons
              name={'minus'}
              iconType={'Entypo'}
              color={'black'}
              size={25}
            />
            {/* <Text style={styles.zoomButtonText}>-</Text> */}
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
          backgroundColor: IndependentColors.white,
          width: wp('100'),
          // height:hp('20%')
        }}>
        <View style={{marginHorizontal: scale(10), height: scale(74.5), marginVertical: scale(5)}}>
          <View style={{height: scale(10)}} />
          <Text
            numberOfLines={3}
            style={{
              fontFamily: OPEN_SANS_REGULAR,
              fontSize: FONT_SIZE_XXS,
              marginHorizontal: wp('4'),
              paddingBottom: 10,
              color: '#000000',
            }}>
            {address || fulladdress}
          </Text>
          <View style={{height: 5}} />
        </View>

        <View
          style={{
            marginHorizontal: scale(12),
            bottom: scale(8),
            marginVertical: scale(2),
          }}>
          <Button
            label={'Send'}
            labelColor={theme.primary}
            backgroundColor={theme.accent}
            onPress={() => {
              handleButtonPress();
            }}
          />
        </View>
      </View>
      {loading && <Indicators />}
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: wp('100'),
    height: hp('75%'),
    position:'absolute',
  },
  overlayMarker: {
    zIndex: 3,
    position: 'absolute',
    top: '36%',
    left: '46%',
    marginLeft: -25,
    marginTop: -50,
  },
  markerImage: {
    tintColor: Colors.primary,
    width: scale(80),
    height: scale(80),
  },
  zoomButtons: {
    position: 'absolute',
    bottom: scale(150),
    right: scale(18),
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  zoomButton: {
    width: 40,
    height: 40,
    backgroundColor: IndependentColors.greyLightest,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  zoomButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: IndependentColors.black,
  },
});

export default Contact;
