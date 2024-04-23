import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className='contact__info'>
                <span>Contact Yiyun Lyu</span>
                <span>Email: yiyunanne@gmail.com</span>
                <span>Phone: +1 (206) 538-4520</span>
                <span>Address: 123 Main Street, City, State ZIP</span>
            </div>

            <div className='connect__info'>
                Connect with me:
                <a href="https://www.linkedin.com/in/lyu-yiyun/">
                    <img className='connect__img' src="linkedin.png" alt="LinkedIn-icon" aria-label="'Visit Yiyun Lyu's LinkedIn Profile" />
                </a>

                <a href="https://github.com/annelyy">
                    <img className='connect__img' src="github.png" alt="Github-icon" aria-label="'Visit Yiyun Lyu's Github Profile" />
                </a>
            </div>
        </footer>
    );
}

export default Footer;