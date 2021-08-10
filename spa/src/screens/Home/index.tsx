import * as React from 'react';
import {useEffect, useState, useRef} from 'react';
import { TouchableOpacity, AsyncStorage } from 'react-native';
import Styled from 'styled-components/native';
import {ActivityIndicator, View, Text} from 'react-native';

import IPage from '../../Models/IPage';
import Search from '../../components/Search';
import {fontFamily, fontColors, fontsSize} from '../../styles/fonts';
import {padding, borderRadius, vh} from '../../styles/metrics';
import CharacterService from '../../service/CharacterService';
import Character from '../../Models/Character';
import {vw} from '../../styles/metrics';
import NotFound from '../../components/NotFound';
import ErrorList from '../../components/ErrorList';
import CharacterCard from '../../components/CharacterCard';

import { DataTable } from 'react-native-paper';

const container = {
  backgroundColor: 'transparent',
};

const draggableIcon = {
  backgroundColor: 'white',
};

const HomePage: React.FC<IPage> = (props) => {

  const [data, setData] = useState<Array<Character>>([]);
  const [isLoading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [hasError, setError] = useState(false);

  const [page, setPage] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(20);
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, total);


  function restartListMessages() {
    setNotFound(false);
    setError(false);
    setLoading(false);
  }

  function defineColor(result: any) {
    return result ? 'yellow' : 'white'
  }

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
            loadItem(page, storeItem)
       }
    } catch (e) {
    }
  }

  async function loadItem(page: int, storeItem: string) {
    if (storeItem) {
        storageFavorite = storeItem
    } else {
        storageFavorite = await AsyncStorage.getItem('FavoriteCharacterList');
    }
    arr = []
    if (storageFavorite != null) {
        arr = JSON.parse(storageFavorite)
    }

    setLoading(true);
    try {
      let newData = null;
      const res = await CharacterService.Find(page, numberOfItemsPerPage);
      newData = res.data.results.map((x: any) => Character.fromJson(x, res.copyright, res.attributionText, defineColor(arr.find(o => o.id == x.id))));

      if (!page) page = 0;
      setPage(page);
      setTotal(res.data.total);
      restartListMessages();
      setData(newData);
    } catch {
      setData([]);
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    loadItem()
  }, []);

  async function searchCharacter(name: string) {
    setLoading(true);
    if (name) {
      try {
        const res = await CharacterService.FindOne(name);
        const data = Character.fromJson(res.data.results[0], res.copyright, res.attributionText);

        setTotal(res.data.total);
        restartListMessages();
        setData([data]);
      } catch (e) {
        setData([]);
        setLoading(false);
        setNotFound(true);
      }
    }
  }

  const pusToDetail = (character: Character) =>
    props.navigation.navigate('Details', {character: character});

  function renderHeader() {
    return (
      <>
        <Title>Marvel Characters</Title>
        <Search
          placeholder="Enter with the Character's Name"
          onSubmitEditing={event => searchCharacter(event.nativeEvent.text)}
          debounce={500}
        />
      </>
    );
  }

  function renderItem({item}: any) {
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => pusToDetail(item)}>
        <CharacterCard {...item} flexDirection={'row'} onPress={modifyFavoriteCharacterList} />
      </TouchableOpacity>
    );
  }

  function renderEmpty() {
    if (notFound) return <NotFound onPress={() => loadItem()} />;
    if (hasError) return <ErrorList onPress={() => loadItem()} />;
    return null;
  }

  function renderFooter() {
    if (!isLoading) return (
    <DataTable>
      <ButtonContainer>
        <Button label="Refresh" onPress={() => loadItem()}>
            <Label>
                Refresh
            </Label>
        </Button>
      </ButtonContainer>
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(total / numberOfItemsPerPage)}
        onPageChange={page => loadItem(page)}
        label={`${from + 1}-${to} of ${total}`}
        showFastPaginationControls
        numberOfItemsPerPageList={[20]}
        numberOfItemsPerPage={numberOfItemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
    );

    return (
      <View
        style={{
          justifyContent: 'center',
          marginTop: 30,
          marginBottom: 80,
        }}>
        <ActivityIndicator size="large" color="#EA5D60" />
      </View>
    );
  }

  return (
    <View>
      <List
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: Item) => item.id}
      />
    </View>
  );
};

const Label = Styled.Text`
  fontFamily: ${fontFamily.regular};
  fontSize: ${fontsSize.regular};
  color: ${fontColors.grey};
`;

const ButtonContainer = Styled.View`
  borderRadius: ${borderRadius.default};
  height: 60px;
  alignItems: center;
  justifyContent: center;
`;

const Button = Styled.TouchableOpacity`
  padding: ${vh(0.005)};
`;

const Sheet = Styled.View`
  background-color: white;
  padding-horizontal: ${padding.normal};
  padding-vertical: ${padding.small};
  border-top-left-radius: ${borderRadius.large};
  border-top-right-radius: ${borderRadius.large};
`;

const Title = Styled.Text`
    margin-top: ${vw(0.1)};
    fontFamily: ${fontFamily.bold};
    fontSize: ${fontsSize.h2};
    fontWeight: bold;
    color: ${fontColors.dark};
`;

const List = Styled.FlatList`
    padding: 0 40px 0 40px;
    paddingBottom: 0;
`;

export default HomePage;
