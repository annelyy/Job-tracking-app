import { useState } from "react";
import Button from "./Button";
import './Modal.css';
import { useAppContext } from './AppContext';

function Modal({ dialogRef }) {
    const { setUsername } = useAppContext();
    const [currentName, setCurrentName] = useState('');

    const handleInputChange = (e) => {
        setCurrentName(e.target.value);
    };

    return (
        <dialog className="modal-form" ref={dialogRef}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setUsername(currentName)
                    setCurrentName('')
                    dialogRef.current.close()
                }}>

                <p className="modal-text">Set Username</p>

                <div className="form__block">
                    <label htmlFor="position" className="form__label">Username</label>
                    <div className="input-container">
                        <input
                            name="position"
                            id="position"
                            className="form__input"
                            onInput={handleInputChange}
                            value={currentName}
                            required
                        />
                    </div>
                </div>

                <Button type="submit" visual="button">
                    Submit
                </Button>
            </form>
        </dialog>
    );
}

export default Modal;