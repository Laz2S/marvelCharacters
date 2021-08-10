import React from 'react';
import Styled from 'styled-components/native';
import Character from '../Models/Character';
import colors from '../styles/colors';
import {borderRadius} from '../styles/metrics';
import {fontFamily, fontsSize} from '../styles/fonts';
import {vh, vw} from '../styles/metrics';
import Icon from 'react-native-vector-icons/FontAwesome';

export interface Item extends Character {
  flexDirection: string;
  onPress: () => void;
}

const CharacterDetail: React.FC<Item> = (props) => {

  return (
    <Container
      style={[
        {
          flexDirection: 'row',
          backgroundColor: '#BEBEBE',
        },
      ]}>
      <Description>
      <TitleContainer>
        <TextTitle>Details</TextTitle>
        <TextCopyright>#{props.copyright}</TextCopyright>
        <TextId>#{props.id.toString()}</TextId>
      </TitleContainer>
      <FilterContainer>
        <Button onPress={() => props.onPress(props)}>
          <Icon name="star" size={30} color={props.color} />
        </Button>
      </FilterContainer>
      <TextNameLabel>Name:</TextNameLabel>
      <TextNameValue>{props.name}</TextNameValue>
      </Description>
      <CharacterImage
        source={{
          uri: props.image,
        }}
      />
      <TextDescriptionLabel>About:</TextDescriptionLabel>
      <TextDescriptionValue>{props.description}</TextDescriptionValue>
      <FooterContainer>
        <TextFooter>{props.attributionText}</TextFooter>
      </FooterContainer>
    </Container>
  );
};

const Button = Styled.TouchableOpacity`
  padding: ${vh(0.005)};
`;

const FilterContainer = Styled.View`
  top: 20px;
  right: 20px;
  flexDirection: row;
  justifyContent: flex-end;
  paddingBottom: ${vh(0.02)};
`;

const HeaderButtonIcon = Styled(Icon)`
  fontSize: ${fontsSize.h3};
  marginLeft: ${vh(0.04)};
`;

const TextDescriptionLabel = Styled.Text`
  position: absolute;
  top: 130px;
  left: 20px;
  color: 'rgba(23, 23, 27, 0.6)';
`;

const TextDescriptionValue = Styled.Text`
  flexWrap: nowrap;
  width: 300px;
  position: absolute;
  top: 130px;
  left: 20px;
  color: black;
  textTransform: capitalize;
  fontFamily: ${fontFamily.bold};
  fontWeight: bold;
  fontSize: ${fontsSize.regular};
`;

const FooterContainer = Styled.View`
  position: absolute;
  top: 585px;
  width: 100%;
  borderRadius: ${borderRadius.default};
`;

const TextFooter = Styled.Text`
  textAlign: center;
  color: black;
  textTransform: capitalize;
  fontFamily: ${fontFamily.bold};
  fontWeight: bold;
  fontSize: ${fontsSize.small};
`;

const TitleContainer = Styled.View`
  position: absolute;
  left: 120px;
  width: 100%;
`;

const TextTitle = Styled.Text`
  left: 120px;
  color: black;
  fontFamily: ${fontFamily.bold};
  fontWeight: bold;
  textTransform: capitalize;
  fontSize: ${fontsSize.h3};
`;

const TextCopyright = Styled.Text`
  position: absolute;
  top: 13px;
  left: 3px;
  color: black;
  fontFamily: ${fontFamily.bold};
  fontWeight: bold;
  fontSize: ${fontsSize.small};
`;

const TextId = Styled.Text`
  position: absolute;
  left: 3px;
  color: black;
  fontFamily: ${fontFamily.bold};
  fontWeight: bold;
  fontSize: ${fontsSize.small};
`;

const TextNameLabel = Styled.Text`
  position: absolute;
  top: 45px;
  left: 120px;
  color: 'rgba(23, 23, 27, 0.6)';
`;

const TextNameValue = Styled.Text`
  flexWrap: wrap;
  width: 109px;
  position: absolute;
  top: 40px;
  left: 170px;
  color: black;
  fontFamily: ${fontFamily.bold};
  fontWeight: bold;
  textTransform: capitalize;
  fontSize: ${fontsSize.h3};
`;

const Container = Styled.View`
  borderRadius: ${borderRadius.default};
  overflow: visible;
  marginTop: 30px;
  height: 600px;
  border: 1px solid black;
`;

const CharacterImage = Styled.Image`
  position: absolute;
  right: 210px;
  top: 10px;
  width: 100px;
  height: 100px;
  resizeMode: contain;
  border: 5px solid blue;
`;

const Description = Styled.View`
  flex: 1;
  paddingVertical: 15px;
`;

//#endregion

export default CharacterDetail;
