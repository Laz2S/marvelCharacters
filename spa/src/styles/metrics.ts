import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const vw = (value: number) => {
  return `${Math.round(width * value)}px`;
};

const vh = (value: number) => {
  return `${Math.round(height * value)}px`;
};

const padding = {
  small: vw(0.05),
  normal: vw(0.09),
};

const borderRadius = {
  default: vw(0.03),
  large: vw(0.1),
};

export {padding, borderRadius, vw, vh};
