import React from "react";
import { View,Button, StyleSheet, Text } from "react-native";

const Profile = ({navigation}) => {
  return (
    <View style={styles.center}>
      <Text>This is the Profile screen</Text>
      <Button
          title="go to Side menu"
          onPress={() => navigation.navigate("SideNav")}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default Profile;