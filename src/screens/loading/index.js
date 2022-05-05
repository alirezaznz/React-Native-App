
import React, { useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';
import {
  View,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Dimensions,
  I18nManager,
  Platform,
  Image,
  Button,
} from 'react-native';
import { Images, LocalStorageKeys } from '@Constants';
import { Box, Picker, RNButton, Biometics } from '@Components';
import { LocalStorage } from '@Utils';
import { ThemeContext } from '@Theme';
const { width, height } = Dimensions.get('window');

// check locale
const Loading = ({ navigation }) => {
  const [selectedLang, setSelectedLang] = useState('en');
  const [bioAuthenticated, setBioAuthenticated] = useState(false);
  const [detectLocation, setDetectLocation] = useState(false);
  const { theme, setDirection, direction: appDirection } = useContext(ThemeContext);
  const { t: translate, i18n: langi18n } = useTranslation();

  useEffect(() => {

    //todo get user location from server
    setTimeout(() => {
      setDetectLocation(true);
    }, 2000);

    (async () => {
      const lang = await LocalStorage.getItem(LocalStorageKeys.selectedLang)
      setSelectedLang(lang)
    })()
  }, []);


  // check if we should navigate to intro page
  useEffect(() => {
    (async () => {
      const introAlreadySeen = await LocalStorage.getItem(LocalStorageKeys.introAlreadySeen);
      if (introAlreadySeen !== true) {
        //await LocalStorage.setItem('introAlreadySeen', true)
        //setTimeout(() => navigation.replace('Intor'), 100);
      }
    })();
  }, []);

  useEffect(() => {
    langi18n.changeLanguage(selectedLang);
    LocalStorage.save(LocalStorageKeys.selectedLang, selectedLang);

    if (appDirection != "rtl" && selectedLang == 'fa') {
      debugger
      if (!I18nManager.isRTL) {
        I18nManager.forceRTL(true);
        I18nManager.swapLeftAndRightInRTL(true);
        RNRestart.Restart()
      }
      setDirection('rtl');
    } else if (appDirection != "ltr" && ["en", "tr"].includes(selectedLang)) {
      if (I18nManager.isRTL) {
        I18nManager.forceRTL(false);
        I18nManager.swapLeftAndRightInRTL(false);
        RNRestart.Restart()
      }
      setDirection('ltr');
    }
  }, [selectedLang]);

  const renderSelectLang = () => {
    return (
      <Box>
        <Picker
          style={styles.pickerStyle(theme)}
          pickerStyle={{
            inputIOS: { color: 'white' },
            inputAndroid: { color: 'white' },
          }}
          placeholder={{ label: 'English', value: 'en' }}
          items={[
            { label: 'Persian', value: 'fa' },
            { label: 'Turkey', value: 'tr' },
          ]}
          onChange={setSelectedLang}

          Icon={() => <Image
            source={Images.LangFlags[selectedLang]}
            style={styles.flagIcon}
          />}
        />
        <RNButton
          onPress={() => {
            if (appDirection == "rtl") {
              RNRestart.Restart();
            }
            navigation.replace('Intor')
          }}
          title={translate('lang.Enter')}
        />
      </Box>
    );
  };

  return (
    <ImageBackground
      source={Images.SplashImage}
      style={styles.container}
      resizeMode={'cover'}>

      <View style={styles.indicatorWrapper}>
      <Biometics changeAuthStatus={setBioAuthenticated} />
        {detectLocation && bioAuthenticated ? (
            renderSelectLang()
        ) : (
          <ActivityIndicator
            size="large"
          // color={STYLES.Color.success}
          />
        )}
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    transform: [{ scaleX: 1.1 }],
  },
  flagIcon: { height: 32, width: 32, marginTop: -8 },
  splash: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logo: {
    height: height / 3,
    width: width / 2,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  pickerStyle: (theme) => ({
    width: width * 0.4,
    height: height * 0.1,
    maxHeight: 72,
    minWidth: 172,
    maxWidth: 256,
    paddingHorizontal: theme.spacing.xl,
  }),
  indicatorWrapper: {
    width: '100%',
    height: height * 0.9,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default Loading;
