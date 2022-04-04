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
                    chars: res,
                    loading: false
                })
            })
    }

    render() {
        let { chars, loading } = this.state;
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
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div >
        )
    }
}

export default CharList;