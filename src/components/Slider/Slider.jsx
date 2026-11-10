import { useEffect, useRef, useState } from 'react';
import cls from './slider.module.scss';

const Slider = () => {
   const [translateValue, setTranslateValue] = useState(0);
   const slideRef = useRef(null);
   const circlesRef = useRef(null);
   const bannersSrc = [
   './src/assets/banners/banner1.jpeg',
   './src/assets/banners/banner1.jpeg',
   './src/assets/banners/banner1.jpeg'
   ];

   const prevSlide = () => {
      const slideWidth = slideRef.current.offsetWidth;
      const max = (bannersSrc.length - 1) * slideWidth;

      if (translateValue < 0)
         setTranslateValue(state => state + slideWidth);
      else
         setTranslateValue(-max);
   }

   const nextSlide = () => {
      const slideWidth = slideRef.current.offsetWidth;
      const max = (bannersSrc.length - 1) * slideWidth;

      if ((translateValue * -1) < max)
         setTranslateValue(state => state - slideWidth);
      else
         setTranslateValue(() => 0);
   }

   const activeCircle = () => {
      const slideWidth = slideRef.current.offsetWidth;

      circlesRef.current.querySelectorAll(`.${cls["slider__circle"]}`).forEach((circle, i) => {            
         slideWidth * i === (translateValue * -1) ? circle.classList.add(`${cls['slider__circle_active']}`)
         : circle.classList.remove(`${cls['slider__circle_active']}`)
      });
   }

   useEffect(() => {
      const timer = setTimeout(() => nextSlide(), 3000);
      activeCircle()

      return () => clearTimeout(timer);
   });
   
   return (
      <div className={cls["slider"]}>
         <div className={cls["slider__btn"]} onClick={prevSlide}>
               <svg className={cls["slider__icon"]} width="40" height="35" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <path d="M0 30C0 32.75 2.56 35 5.71 35L34.28 35C37.43 35 40 32.75 40 30L40 5C40 2.24 37.43 0 34.28 0L5.71 0C2.56 0 0 2.24 0 5L0 30ZM11.42 17.5C11.42 16.97 11.67 16.48 12.11 16.12L22.11 8C22.74 7.49 23.65 7.35 24.42 7.65C25.2 7.95 25.71 8.63 25.71 9.37L25.71 25.62C25.71 26.36 25.2 27.04 24.42 27.34C23.65 27.64 22.74 27.5 22.11 27L12.11 18.87C11.67 18.52 11.42 18.02 11.42 17.5Z" fill="#FFFFFF" fillOpacity="1.000000" fillRule="nonzero"/>
               </svg>
         </div>
         <div className={cls["slider__content"]}>
               <ul ref={slideRef} className={cls["slider__slides"]}>
                  {bannersSrc.map((src, i) => (
                     <li key={i} className={cls["slider__slide"]} style={translateValue ? {transform: `translate(${translateValue}px, 0)`} : null}>
                        <img src={src} alt={`banner${i + 1}`} />
                     </li>
                  ))}
               </ul>
               <ul ref={circlesRef} className={cls["slider__circles"]}>
                  {bannersSrc.map((src, i) => (
                     <li key={i} className={ cls["slider__circle"]}></li>
                  ))}
               </ul>
         </div>
         <div className={cls["slider__btn"]} onClick={nextSlide}>
               <svg className={cls["slider__icon"]} width="40" height="35" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <path d="M0 30C0 32.75 2.56 35 5.71 35L34.28 35C37.43 35 40 32.75 40 30L40 5C40 2.24 37.43 0 34.28 0L5.71 0C2.56 0 0 2.24 0 5L0 30ZM11.42 17.5C11.42 16.97 11.67 16.48 12.11 16.12L22.11 8C22.74 7.49 23.65 7.35 24.42 7.65C25.2 7.95 25.71 8.63 25.71 9.37L25.71 25.62C25.71 26.36 25.2 27.04 24.42 27.34C23.65 27.64 22.74 27.5 22.11 27L12.11 18.87C11.67 18.52 11.42 18.02 11.42 17.5Z" fill="#FFFFFF" fillOpacity="1.000000" fillRule="nonzero"/>
               </svg>
         </div>
      </div>
   )
}

export default Slider;