import * as React from 'react';
import {useState} from 'react';
import { AsyncStorage } from 'react-native';
import IPage from '../../Models/IPage';
import Styled from 'styled-components';
import Character from '../../Models/Character';
import CharacterDetail from '../../components/CharacterDetail';
import colors from '../../styles/colors';
import {padding, vh, vw} from '../../styles/metrics';
import {fontsSize, fontFamily, fontColors} from '../../styles/fonts';

const DetailPage: React.FC<IPage> = (props) => {
  const [character, setCharacter] = useState<Character>(props.route.params.character);

  const pusToHome = () =>
    props.navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });

  async function modifyFavoriteCharacterList(props: Character) {
    try {
        storageFavorite = await AsyncStorage.getItem('FavoriteCharacterList');
        arr = []
        if (storageFavorite != null) {
            arr = JSON.parse(storageFavorite)
        }

        if (arr.length > 0) {
            index = arr.findIndex(o => o.id == props.id);
            if (index != -1) {
                arr.splice(index, 1)
            } else {
                arr.push(props)
            }
        } else {
            arr.push(props)
        }

        if (arr.length > 0) {
            const storeItem = JSON.stringify(arr)
            await AsyncStorage.setItem('FavoriteCharacterList', storeItem);
            pusToHome()
       }
    } catch (e) {
    }
  }

  return (
    <>
      <Container
        style={{
          backgroundColor: colors.backgroundType[character.primaryType],
        }}>
        <ContainerCard>
          <CharacterDetail
            {...character}
            onPress={modifyFavoriteCharacterList}
          />
        </ContainerCard>
      </Container>
    </>
  );
};

const Container = Styled.View`
  flex: 1
`;

const Title = Styled.Text`
  text-align: center;
  color: white;
  font-size: ${fontsSize.h3};
  padding-bottom: ${padding.small}
`;

const ContainerCard = Styled.View`
  padding: ${padding.normal};
  padding-bottom: ${padding.small};
  
`;

export default DetailPage;
