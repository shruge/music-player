import cls from './card.module.scss';

const Card = ({ src, available, genre, editor, artist }) => {
    return (
        <div className={cls["card"]}>
            <img className={cls["card__img"]} src={src} alt={artist} />
            <section className={cls["card__content"]}>
                <h4 className={cls["card__available"]}>Available: {available} tracks</h4>
                <a href='#!' className={`${cls["card__link"]} ${cls["card__genre"]}`}>Genre: {genre}</a>
                <a href='#!' className={cls["card__editor"]}>Added by {editor}</a>
                <a href='#!' className={`${cls["card__link"]} ${cls["card__artist"]}`}>{artist}</a>
            </section>
        </div>
    )
}

export default Card;