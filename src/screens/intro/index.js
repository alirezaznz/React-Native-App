import React from 'react';
import {View, Dimensions, StyleSheet, Text, Image} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {MText, Box, DropDown, Picker} from '@Components';
import {useTranslation} from 'react-i18next';
import {Images} from '@Constants';

const {width, height} = Dimensions.get('window');
const paddingBottom = height / 4;
const dotSize = 9;

const AppIntor = ({navigation}) => {
  const {t: translate} = useTranslation();

  const slides = [
    {
      key: 1,
      image: Images.Intro2,
    },
    {
      key: 2,
      image: Images.Intro2,
    },
    {
      key: 3,
      image: Images.Intro3,
    },
    {
      key: 4,
      image: Images.Intro4,
    },
  ];

  const selectLang = value => {};

  const _renderItem = ({item}) => {
    return (
      <Box>
        <Image source={item.image} style={styles.slideImage} />
        <MText type="heading1">
          {translate(`IntroPage.Intro${item.key}.title`)}
        </MText>
        <Picker
          backgroundColor={'danger'}
          style={{width: 100, height: 50}}
          items={[
            {label: 'English', value: 'en'},
            {label: 'Persian', value: 'per'},
          ]}
          onChange={selectLang}
        />

        <MText style={styles.slideDesc}>
          {translate(`IntroPage.Intro${item.key}.text`)}
        </MText>
      </Box>
    );
  };
  const _renderNextButton = () => {
    return <Text>{translate('Common.next')}</Text>;
  };

  const _renderDoneButton = () => {
    return <Text>{translate('Common.done')}</Text>;
  };

  return (
    <AppIntroSlider
      renderItem={_renderItem}
      data={slides}
      renderNextButton={_renderNextButton}
      renderDoneButton={_renderDoneButton}
      onDone={() => {
        navigation.replace('AuthNav');
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: paddingBottom,
  },
  slideImage: {
    width: (width * 9) / 10,
    height: (width * 9) / 10,
  },
  slideDesc: {
    textAlign: 'center',
    maxWidth: '75%',
    marginTop: 15,
    lineHeight: 25,
  },
  arrow: {
    padding: 7,
  },
  disabled: {
    opacity: 0.5,
  },
  button: {
    marginVertical: 20,
  },
});

export default AppIntor;
