import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Location from "../screens/location";
import Intro2 from "../screens/Intro2";

const screens = {
  Home: {
    screen: Location,
  },
  Intro2: {
    screen: Intro2,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
