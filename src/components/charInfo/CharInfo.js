import './charInfo.scss';
import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'
class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    onCharLoaded = (char) => {
        this.setState({ char, loading: false })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true,
        })
    }

    updateChar = () => {
        const { charId } = this.props;
        if (!charId) {
            return;
        }

        this.onCharLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {

        const { char, loading, error } = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error || !char) ? <View char={char} /> : null;
        const skeleton = char || loading || error ? null : <Skeleton />


        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }

}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;
    console.log(comics)
    const imgStyle = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? 'contain' : 'cover';

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} style={{ objectFit: imgStyle }} alt={name} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.map((item, i) => {

                    return (
                        <li key={i} className="char__comics-item">
                            <a href={item.resourceURI}>{item.name}</a>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default CharInfo;