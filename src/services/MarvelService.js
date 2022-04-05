
class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'apikey=bd93315d1945c9e1ea66d6f2a4854116';
  _offset = 210;
  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  getAllCharacters = async (offset = this._offset) => {
    const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
    return res.data.results.map(this._transformCharacter);
  }

  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    return this._transformCharacter(res.data.results[0])
  }

  _transformCharacter = (char) => {

    return {
      name: char.name,
      description: char.description ? char.description.split(' ', 24).join(' ') + '...' : 'Нет данных о персонаже',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      id: char.id,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    }
  }
}

export default MarvelService;