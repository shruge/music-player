import { useRef } from "react";
import Card from "./Card/Card";
import cls from './cards.module.scss';

const Cards = () => {
    const filterRef = useRef(null);
    const artists = [
        {
            tracksCount: 10,
            genre: 'Post-Hardcore',
            name: '9mm parabellum bullet',
            editor: 'USER123',
            img: './src/assets/authors/author1.jpeg',
        },
        {
            tracksCount: 10,
            genre: 'Post-Hardcore',
            name: '9mm parabellum bullet',
            editor: 'USER123',
            img: './src/assets/authors/author1.jpeg',
        },
        {
            tracksCount: 10,
            genre: 'Post-Hardcore',
            name: '9mm parabellum bullet',
            editor: 'USER123',
            img: './src/assets/authors/author1.jpeg',
        },
        {
            tracksCount: 10,
            genre: 'Post-Hardcore',
            name: '9mm parabellum bullet',
            editor: 'USER123',
            img: './src/assets/authors/author1.jpeg',
        }
    ]

    const showFiltr = () => {
        filterRef.current.classList.toggle(cls['cards__filter_active']);
    }

    return (
        <section className={cls["cards"]}>
            <h2 className={`title ${cls["cards__title"]}`}>Most viewed artists</h2>
            <nav className={cls["cards__nav"]}>
                <ul className={cls["cards__list"]}>
                    <li onClick={showFiltr} className={cls["cards__li"]}>
                        Filter
                        <svg className={cls["cards__icon"]} width="12" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <path className={cls["cards__icon_fill"]} d="M2 0.5C2 0.22 1.78 0 1.5 0C1.21 0 1 0.22 1 0.5L1 3.5L2 3.5L2 0.5Z" fill="#B4B4B4" fillOpacity="1.000000" fillRule="evenodd"/>
                            <path className={cls["cards__icon_stroke"]} d="M0.75 6.5L2.25 6.5" stroke="#B4B4B4" strokeOpacity="1.000000" strokeWidth="1.000000"/>
                            <path className={cls["cards__icon_stroke"]} d="M1.5 3.5L0.75 3.5L2.25 3.5" stroke="#B4B4B4" strokeOpacity="1.000000" strokeWidth="1.000000"/>
                            <path className={cls["cards__icon_fill"]} d="M2 18.5L2 6.5L1 6.5L1 18.5C1 18.78 1.21 19 1.5 19C1.78 19 2 18.78 2 18.5Z" fill="#B4B4B4" fillOpacity="1.000000" fillRule="evenodd"/>
                            <circle cx="1.500000" cy="5.000000" r="1.500000" fill="#FFFFFF" fillOpacity="0"/>
                            <circle className={cls["cards__icon_stroke"]} cx="1.500000" cy="5.000000" r="1.250000" stroke="#B4B4B4" strokeOpacity="1.000000" strokeWidth="0.500000"/>
                            <path className={cls["cards__icon_fill"]} d="M5.5 18.5C5.5 18.78 5.71 19 6 19C6.28 19 6.5 18.78 6.5 18.5L6.5 15.5L5.5 15.5L5.5 18.5Z" fill="#B4B4B4" fillOpacity="1.000000" fillRule="evenodd"/>
                            <path className={cls["cards__icon_stroke"]} d="M6.75 12.5L5.25 12.5" stroke="#B4B4B4" strokeOpacity="1.000000" strokeWidth="1.000000"/>
                            <path className={cls["cards__icon_stroke"]} d="M6 15.5L6.75 15.5L5.25 15.5" stroke="#B4B4B4" strokeOpacity="1.000000" strokeWidth="1.000000"/>
                            <path className={cls["cards__icon_fill"]} d="M5.5 0.5L5.5 12.5L6.5 12.5L6.5 0.5C6.5 0.22 6.28 0 6 0C5.71 0 5.5 0.22 5.5 0.5Z" fill="#B4B4B4" fillOpacity="1.000000" fillRule="evenodd"/>
                            <circle r="1.500000" transform="matrix(-1 0 0 -1 6 14)" fill="#FFFFFF" fillOpacity="0"/>
                            <circle className={cls["cards__icon_stroke"]} r="1.250000" transform="matrix(-1 0 0 -1 6 14)" stroke="#B4B4B4" strokeOpacity="1.000000" strokeWidth="0.500000"/>
                            <path className={cls["cards__icon_fill"]} d="M11 0.5C11 0.22 10.78 0 10.5 0C10.22 0 10 0.22 10 0.5L10 3.5L11 3.5L11 0.5Z" fill="#B4B4B4" fillOpacity="1.000000" fillRule="evenodd"/>
                            <path className={cls["cards__icon_stroke"]} d="M9.75 6.5L11.25 6.5" stroke="#B4B4B4" strokeOpacity="1.000000" strokeWidth="1.000000"/>
                            <path className={cls["cards__icon_stroke"]} d="M10.5 3.5L9.75 3.5L11.25 3.5" stroke="#B4B4B4" strokeOpacity="1.000000" strokeWidth="1.000000"/>
                            <path className={cls["cards__icon_fill"]} d="M11 18.5L11 6.5L10 6.5L10 18.5C10 18.78 10.22 19 10.5 19C10.78 19 11 18.78 11 18.5Z" fill="#B4B4B4" fillOpacity="1.000000" fillRule="evenodd"/>
                            <circle cx="10.500000" cy="5.000000" r="1.500000" fill="#FFFFFF" fillOpacity="0"/>
                            <circle className={cls["cards__icon_stroke"]} cx="10.500000" cy="5.000000" r="1.250000" stroke="#B4B4B4" strokeOpacity="1.000000" strokeWidth="0.500000"/>
                        </svg>
                    </li>
                    <li className={cls["cards__li"]}>
                        Random
                        <svg
                            fill="none"
                            width="14.713623"
                            height="13.713440"
                            viewBox="0 0 14.7136 10.7134"
                            xmlns="http://www.w3.org/2000/svg" 
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            className={`${cls["cards__icon"]} ${cls["cards__icon_shuffle"]}`}
                        >
                            <path className={cls["cards__icon_stroke"]}
                                d="M0 2.23L2.54 2.23L3.96 2.23C4.66 2.23 5.31 2.59 5.67 3.18L8.32 7.52C8.68 8.11 9.33 8.48 10.03 8.48L11.45 8.48L14 8.48M0 8.48L2.54 8.48L3.96 8.48C4.66 8.48 5.31 8.11 5.67 7.52L8.32 
                                3.18C8.68 2.59 9.33 2.23 10.03 2.23L11.45 2.23L14 2.23M12.09 4.1L14 2.23L12.09 0.35M12.09 10.35L14 8.48L12.09 6.6" stroke="#B4B4B4" strokeOpacity="1.000000" strokeWidth="1.000000"
                            />
                        </svg>
                    </li>
                    <li className={cls["cards__li"]}>
                        Add artist
                        <svg className={cls["cards__icon"]} width="13.000000" height="13.000000" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <circle className={cls["cards__icon_stroke"]} cx="6.500000" cy="6.500000" r="6.250000" stroke="#B4B4B4" strokeOpacity="1.000000" strokeWidth="0.500000"/>
                            <line className={cls["cards__icon_stroke"]} x1="6.500000" y1="3.000000" x2="6.500000" y2="10.000000" stroke="#B4B4B4" strokeOpacity="1.000000" strokeWidth="1.000000"/>
                            <line className={cls["cards__icon_stroke"]} x1="3.000000" y1="6.500000" x2="10.000000" y2="6.500000" stroke="#B4B4B4" strokeOpacity="1.000000" strokeWidth="1.000000"/>
                        </svg>
                    </li>
                    <li className={cls["cards__li"]}>
                        Create playlist
                        <svg className={cls["cards__icon"]} width="9.000000" height="12.309021" viewBox="0 0 9 12.309" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <path className={cls["cards__icon_fill"]} d="M8.5 2.8L4.5 0.8L4.5 11.8L8.5 11.8L8.5 2.8Z" fill="#B4B4B4" fillOpacity="1.000000" fillRule="nonzero"/>
                            <path className={cls["cards__icon_stroke"]} d="M0.5 0.8L0.5 12.3M2.5 0.8L2.5 12.3M8.5 2.8L8.5 11.8L4.5 11.8L4.5 0.8L8.5 2.8Z" stroke="#B4B4B4" strokeOpacity="1.000000" strokeWidth="1.000000"/>
                        </svg>
                    </li>
                </ul>
                <ul ref={filterRef} className={`${cls["cards__list"]} ${cls["cards__filter"]}`}>
                    <li className={cls["cards__li"]}>Genre</li>
                    <li className={cls["cards__li"]}>Available tracks</li>
                    <li className={cls["cards__li"]}>Only my subscriptions</li>
                </ul>
                <div className={cls["burger"]}>
                    <span className={cls["burger__line"]}></span>
                    <span className={cls["burger__line"]}></span>
                    <span className={cls["burger__line"]}></span>
                </div>
            </nav>
            <div className={cls["cards__content"]}>
                {artists.map((obj, i) => (
                    <Card
                        key={i}
                        src={obj['img']}
                        genre={obj['genre']}
                        artist={obj['name']}
                        editor={obj['editor']}
                        available={obj['tracksCount']}
                    />
                ))}
            </div>
        </section>
    )
}

export default Cards;