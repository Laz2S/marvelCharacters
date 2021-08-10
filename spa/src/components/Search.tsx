import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styled from 'styled-components/native';
import {borderRadius, padding} from '../styles/metrics';
import {fontColors, fontsSize, fontFamily} from '../styles/fonts';
import _ from 'lodash';

export type Props = {
  placeholder: string;
  onSubmitEditing: (data: string) => void;
  debounce: number;
};

const Search: React.FC<Props> = (props) => {
  return (
    <Container>
      <Icon name="search" color="#747476" size={16} />
      <Input
        placeholderTextColor="#747476"
        placeholder={props.placeholder}
        onSubmitEditing={props.onSubmitEditing}
      />
    </Container>
  );
};

const Input = Styled.TextInput`
  marginLeft: 10px;
  width: 100%;
  fontSize: ${fontsSize.regular};
`;

const Container = Styled.View`
  flexDirection: row;
  alignItems: center;
  backgroundColor: #F2F2F2;
  fontFamily: ${fontFamily.regular};
  fontSize: ${fontsSize.regular};
  color: ${fontColors.grey};
  borderRadius: ${borderRadius.default};
  paddingHorizontal: ${padding.small};
  height: 60px;
`;

export default Search;
