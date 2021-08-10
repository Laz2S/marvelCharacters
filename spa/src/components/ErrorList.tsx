import React from 'react';
import Styled from 'styled-components/native';
import {fontFamily, fontColors, fontsSize} from '../styles/fonts';
import {vh, vw} from '../styles/metrics';

export type Props = {
  onPress: () => void;
};

const ErrorList: React.FC<Props> = (props) => {
  return (
    <Container>
      <Title>There has been some error with marvel api, sorry about that. </Title>
      <ButtonContainer>
        <Button label="Refresh" onPress={props.onPress} />
      </ButtonContainer>
    </Container>
  );
};

export default ErrorList;

const ButtonContainer = Styled.View`
  width: ${vw(0.3)};
  marginTop: ${vw(0.1)}
`;

const Button = Styled.TouchableOpacity`
  padding: ${vh(0.005)};
`;

const Container = Styled.View`
  alignItems: center;
  justifyContent: center;
`;

const Title = Styled.Text`
  fontSize: ${fontsSize.h3};
  color: ${fontColors.grey};
  marginTop: ${vh(0.05)}
`;

const Subtitle = Styled.Text`
  fontSize: ${fontsSize.regular};
  color: ${fontColors.grey};
  marginTop: ${vh(0.001)}
`;
