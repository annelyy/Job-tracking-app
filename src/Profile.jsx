import './Profile.css'
import Button from "./Button";
import { useState } from 'react';

function Profile() {
    const [selectedStatus, setSelectedStatus] = useState('');
    const [otherText, setOtherText] = useState('');

    const handleStatusChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));

        setSelectedStatus(value);

        if (value !== '3') {
            setOtherText('');
        }
    };

    const handleOtherTextChange = (event) => {
        setOtherText(event.target.value);
    };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        add_status: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleProfileSaved = (e) => {
        e.preventDefault();

        const isFormValid = Object.values(formData).every((value) => value.trim() !== '');
        const buttonElement = e.target;

        if (isFormValid) {
            const messageElement = buttonElement.nextElementSibling;
            if (messageElement) {
                messageElement.classList.add('show-message');
            }

            setTimeout(() => {
                if (messageElement) {
                    messageElement.classList.remove('show-message');
                }
            }, 2000);

        } else {
            const messageElement = buttonElement.nextElementSibling.nextElementSibling;
            if (messageElement) {
                messageElement.classList.add('show-error');
            }

            setTimeout(() => {
                if (messageElement) {
                    messageElement.classList.remove('show-error');
                }
            }, 2000);

            return;
        }
    }


    return (
        <>
            <a className="skip-to-content-link" href="#main">Skip to content</a>
            <form action="" className="form" method="post">
                <h2 className='form__header'>Profile</h2>
                <div className='form__element'>
                    <div className="form__block">
                        <label htmlFor="firstName" className="form__label">First Name</label>
                        <div className="input-container">
                            <input
                                name="firstName"
                                id="firstName"
                                className="form__input"
                                required
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="form__block">
                        <label htmlFor="lastName" className="form__label">Last Name</label>
                        <div className="input-container">
                            <input
                                name="lastName"
                                id="lastName"
                                className="form__input"
                                required
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="form__block">
                        <label htmlFor="email" className="form__label">Email</label>
                        <input name="email" id="email" required className="form__input"
                            onChange={handleInputChange}
                            type="email" />
                    </div>

                    <div className="form__block">
                        <label htmlFor="location" className="form__label">Location</label>
                        <div className="input-container">
                            <input
                                name="location"
                                id="location"
                                className="form__input"
                            />
                        </div>
                    </div>

                    <div className='form__block'>
                        <label htmlFor="add_status" className="form__label">Employment Status ("Complex" form interaction)</label>
                        <select name="add_status" id="add_status" className="form__input"
                            value={selectedStatus}
                            onChange={handleStatusChange}
                            required
                        >
                            <option disabled value="">-Please select "Other"-</option>
                            <option value="0">student</option>
                            <option value="1">Employed</option>
                            <option value="2">Unemployed</option>
                            <option value="3">Other</option>
                        </select>

                        {selectedStatus === '3' && (
                            <div className="form__block">
                                <label htmlFor="otherText" className="form__label">Other (Please specify):</label>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        id="otherText"
                                        value={otherText}
                                        className="form__input"
                                        onChange={handleOtherTextChange}
                                    />
                                </div>
                            </div>
                        )}
                    </div>



                    <Button className="form__submit"
                        type="submit"
                        onClick={handleProfileSaved}
                    >Submit</Button>

                    <p className='job-indicator'>Profile saved!</p>
                    <p className='job-indicator'>Please fill in all required fields</p>

                </div>
            </form>
        </>
    );
}

export default Profile;