import './Overview.css';
import { useState } from 'react';

function Overview() {
    const [currentSlide, setCurrentSlide] = useState(1);

    const changeSlide = (slideId) => {
        if (slideId < 1) {
            setCurrentSlide(4);
        } else if (slideId > 4) {
            setCurrentSlide(1);
        } else {
            setCurrentSlide(slideId);
        }
    };

    const slides = [
        { id: 1, imageUrl: 'undraw_exploring_re_grb8.svg', alt: 'A girl is hiking' },
        { id: 2, imageUrl: 'undraw_engineering_team_a7n2.svg', alt: 'Three people of a team are discussing work' },
        { id: 3, imageUrl: 'undraw_work_from_anywhere_re_s2i6.svg', alt: 'A woman is working from home' },
        { id: 4, imageUrl: 'undraw_working_re_ddwy.svg', alt: 'Two people are discussing work' }
    ];


    return (
        <div className="Overview">
            <div className="slider-container">
                <div className="slider">
                    {slides.map((slide) => (
                        <div key={slide.id} id={`slides__${slide.id}`}>
                            <img
                                className={`slide__img ${currentSlide === slide.id ? 'active' : ''}`}
                                src={slide.imageUrl}
                                alt={slide.alt}
                            />

                            <a className="slide__prev"
                                title="Prev"
                                aria-label="Visit previous slide"
                                onClick={() => {
                                    changeSlide(currentSlide - 1)
                                    console.log('currentSlide - 1', currentSlide - 1)
                                }}
                            ></a>

                            <a className="slide__next"
                                title="Next"
                                aria-label="Visit next slide"
                                onClick={() => {
                                    changeSlide(currentSlide + 1)
                                }}
                            ></a>
                        </div>
                    ))}

                    <div className="slider__nav">
                        {slides.map((slide) => (
                            <button
                                key={slide.id}
                                className={`slider__navlink ${currentSlide === slide.id ? 'active' : ''}`}
                                onClick={() => {
                                    changeSlide(slide.id)
                                }}
                                aria-label={`Visit slide ${slide.id}`}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>

            <div className='overview__block'>
                <h2 className='overview__title'><span>Jobify</span></h2>
                <h3 className='overview__subtitle'>Your Job <span>Tracking</span> Solution</h3>
                <p className='overview__text'>A powerful tool designed to help you manage your job applications seamlessly. Whether you're actively job hunting or simply keeping track of opportunities, this app offers a comprehensive solution tailored to your needs. With this app, you can easily track the status of each application, filter your job list based on keywords, status, or job type, and sort jobs according to your preferences. You can add new job opportunities to your tracker effortlessly and remove jobs that are no longer relevant. Additionally, the app allows you to customize your profile, updating your personal information and username as needed. The user-friendly interface ensures a smooth experience, enabling you to focus on your job search effectively. Explore our Job Tracking App now and take control of your job search with ease!</p>
            </div>
        </div>
    );
}

export default Overview;