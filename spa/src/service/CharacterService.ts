import api from './instance';
import md5 from 'crypto-js/md5';

const publicKey = '0decf7a7cd7747b23f91954318e01a55'
const privateKey = '4eabaac9fd8932c3824ecd7551bf908593fe03e0'
const ts = new Date().getMilliseconds()
const hash = ts+privateKey+publicKey

export default class CharacterService {
  static next: string;

  static async Find(page, numberOfItemsPerPage) {
    console.log(page)
    const params = {
      apikey: publicKey,
      ts: ts,
      hash: md5(hash).toString(),
      limit: numberOfItemsPerPage,
      offset: (page * numberOfItemsPerPage)
    }
    await api.get('characters', {params})
    .then(res => result = res.data)
    .catch(err => console.log(err.response))
    return result;
  }

  static async FindOne(data: string) {
    const params = {
      apikey: publicKey,
      ts: ts,
      hash: md5(hash).toString(),
      name: data
    }
    await api.get('characters', {params})
    .then(res => result = res.data)
    .catch(err => console.log(err.response))
    return result;
  }
}
