import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import './charList.scss';

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        newListLoading: false,
        offset: 210,
        ended: false,
    }

    componentDidMount() {
        this.updateCharList();
    }

    marvelService = new MarvelService();

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
    }

    onCharListLoading = () => {
        this.setState({
            newListLoading: true,
        })
    }

    onCharListLoaded = (newCharList) => {
        if (newCharList.length < 9) {
            this.setState({
                ended: true
            })
        }

        this.setState(({ chars, offset }) => ({
            chars: [...chars, ...newCharList],
            loading: false,
            newListLoading: false,
            offset: offset + 9,
        }))
    }

    updateCharList = () => {
        this.setState({
            loading: true,
        })
        this.onRequest();
    }

    render() {
        let { chars, loading, newListLoading, offset, ended } = this.state;
        if (!loading) {
            chars = chars.map(char => {
                return (
                    < li key={char.id}
                        className="char__item"
                        onClick={() => this.props.onCharSelected(char.id)}>
                        <img src={char.thumbnail} style={{ objectFit: char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? 'unset' : 'cover' }} alt="abyss" />
                        <div className="char__name">{char.name}</div>
                    </li >
                )
            })
        } else {
            chars = <Spinner />
        }

        return (
            <div className="char__list">
                <ul className="char__grid" style={{ display: loading ? 'flex' : 'grid', justifyContent: 'center' }}>
                    {chars}
                </ul>
                {ended === false ? <button
                    className="button button__main button__long"
                    disabled={newListLoading}
                    onClick={() => this.onRequest(offset)}
                >
                    <div className="inner">load more</div>
                </button> : 'Персонажи закончились'}
            </div >
        )
    }
}

export default CharList;