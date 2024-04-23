import './AddJob.css'
import Button from './Button';
import { useState } from 'react';
import { useAppContext } from './AppContext';


function AddJob() {
    const { addJob } = useAppContext();
    const [formData, setFormData] = useState({
        position: '',
        company: '',
        location: 'Seattle',
        status: '0',
        type: '0',
    });

    const handleAddJob = (e) => {
        e.preventDefault();

        const buttonElement = e.target;
        const messageElement = buttonElement.nextElementSibling;

        if (!formData.position || !formData.company) {
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

        const newJob = {
            position: formData.position,
            company: formData.company,
            location: formData.location,
            status: getStatusText(formData.status),
            type: getTypeText(formData.type),
            date: new Date().toISOString().split('T')[0],
        };

        setFormData({
            position: '',
            company: '',
            location: 'Seattle',
            status: '0',
            type: '0',
        })

        addJob(newJob);

        if (messageElement) {
            messageElement.classList.add('show-message');
        }

        setTimeout(() => {
            if (messageElement) {
                messageElement.classList.remove('show-message');
            }
        }, 2000);

    }

    const getStatusText = (statusValue) => {
        switch (statusValue) {
            case '0':
                return 'Pending';
            case '1':
                return 'Interview';
            case '2':
                return 'Declined';
            default:
                return 'Unknown';
        }
    };

    const getTypeText = (typeValue) => {
        switch (typeValue) {
            case '0':
                return 'Full-time';
            case '1':
                return 'Part-time';
            case '2':
                return 'Internship';
            default:
                return 'Unknown';
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    return (
        <>
            <a className="skip-to-content-link" href="#main">Skip to content</a>
            <form action="/submit" className="form" method="post">
                <h2 className='form__header'>Add Job</h2>
                <div className='form__element'>
                    <div className="form__block">
                        <label htmlFor="Position" className="form__label">Position</label>
                        <div className="input-container">
                            <input
                                name="position"
                                id="Position"
                                className="form__input"
                                value={formData.position}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form__block">
                        <label htmlFor="company" className="form__label">Company</label>
                        <div className="input-container">
                            <input
                                name="company"
                                id="company"
                                className="form__input"
                                value={formData.company}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form__block">
                        <label htmlFor="location" className="form__label">Job Location</label>
                        <div className="input-container">
                            <input
                                name="location"
                                id="location"
                                className="form__input"
                                value={formData.location}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className='form__block'>
                        <label htmlFor="status" className="form__label">Job Status</label>
                        <select name="status" id="status" className="form__input"
                            value={formData.status}
                            onChange={handleInputChange}
                            required >
                            <option value="0">pending</option>
                            <option value="1">interview</option>
                            <option value="2">declined</option>
                        </select>
                    </div>

                    <div className='form__block'>
                        <label htmlFor="type" className="form__label">Job Type</label>
                        <select name="type" id="type" className="form__input"
                            value={formData.type}
                            onChange={handleInputChange}
                            required >
                            <option value="0">full-time</option>
                            <option value="1">part-time</option>
                            <option value="2">internship</option>
                        </select>
                    </div>

                    <Button className="form__submit" type="submit" onClick={handleAddJob}>Submit</Button>

                    <p className='job-indicator'>Job submitted successfully! Check "All Jobs"</p>
                    <p className='job-indicator'>Please fill in all required fields</p>
                </div>
            </form>
        </>
    );
}

export default AddJob;