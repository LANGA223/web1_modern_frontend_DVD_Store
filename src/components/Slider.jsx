import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import { bannerImage } from '../utils/images';
import { MEDIA } from '../data/media';

const slides = [
    {
        title: 'Buy your movies on DVD',
        text: 'The best way to watch your favorite movies and TV shows.',
        cta: 'Shop DVDs',
        to: '/products?category=DVD',
        category: 'DVD',
        img: MEDIA.bannerDVD,
    },
    {
        title: 'Special Editions DVDs',
        text: 'Limited editions and collector\'s items for your movie collection.',
        cta: 'Shop Special Editions',
        to: '/products?category=SE',
        category: 'Special Edition',
        img: MEDIA.bannerSE,
    },
    {
        title: '4K & UHD DVDs',
        text: 'Experience your movies like never before with our 4K and UHD selection.',
        cta: 'Shop 4K & UHD',
        to: '/products?category=4K+UHD',
        category: '4K & UHD',
        img: MEDIA.banner4KUHD,
    },
        {
        title: 'Merchandise & Collectibles',
        text: 'Show your love for your favorite movies and TV shows with  merchandise and collectibles.',
        cta: 'Shop Merchandise',
        to: '/products?category=Merchandise',
        category: 'Merchandise',
        img: MEDIA.bannerMerch,
    },
            {
        title: 'Hardware & Accessories',
        text: 'Enhance your viewing experience with our range of hardware and accessories.',
        cta: 'Shop Hardware',
        to: '/products?category=Hardware',
        category: 'Hardware',
        img: MEDIA.bannerHardware,
    },
];

function Slider() {
    return (
        <Carousel fade>
            {slides.map((slide) => (
                <Carousel.Item key={slide.title}>
                    <img
                        src={
                            slide.img ||
                            bannerImage({
                                title: slide.title,
                                subtitle: slide.text,
                                category: slide.category,
                            })
                        }
                        className="d-block w-100 slider-img"
                        alt={slide.title}
                    />
                    <Carousel.Caption>
                        <h3 className="fw-bold">{slide.title}</h3>
                        <p className="d-none d-sm-block">{slide.text}</p>
                        <Button as={Link} to={slide.to} variant="light" size="lg">
                            {slide.cta}
                        </Button>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default Slider;
