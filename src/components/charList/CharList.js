import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import './charList.scss';

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
    }

    componentDidMount() {
        this.updateCharList();
    }

    marvelService = new MarvelService();

    updateCharList = () => {
        this.setState({
            loading: true,
        })
        this.marvelService
            .getAllCharacters()
            .then(res => {
                this.setState({
                    chars: res.map(char => [char.name, char.thumbnail]),
                    loading: false
                })
            })
    }

    renderChars = (chars) => {
        chars.map(char => {
            return (
                < li className="char__item" >
                    <img src={char[1]} alt="abyss" />
                    <div className="char__name">{char[0]}</div>
                </li >
            )
        })
    }

    render() {
        let { chars, loading } = this.state;

        if (!loading) {
            chars = chars.map(char => {
                return (
                    < li className="char__item" >
                        <img src={char[1]} style={{ objectFit: char[1] === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? 'contain' : 'cover' }} alt="abyss" />
                        <div className="char__name">{char[0]}</div>
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
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div >
        )
    }
}

export default CharList;