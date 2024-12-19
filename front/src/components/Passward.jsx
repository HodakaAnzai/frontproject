import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Passward.css';

const Passward = () => {
    const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        console.log(formValues);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
    };

    const validate = (values) => {
        const errors = {};
        if (!values.email) {
            errors.email = "メールアドレスを入力してください";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            errors.email = "有効なメールアドレスを入力してください";
        }
        if (!values.password) {
            errors.password = "パスワードを入力してください";
        }
        return errors;
    };

    return (
        <div>
            <div className="formContainer">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <h1>ログイン</h1>
                    <hr />
                    <div className="uiForm">
                        <div className="FormField">
                            <input
                                type="text"
                                placeholder="メールアドレス"
                                name="email"
                                onChange={(e) => handleChange(e)}
                            />
                            <p className="errorMsg">{formErrors.email}</p>
                        </div>
                        <div className="FormField">
                            <input
                                type="password"
                                placeholder="パスワード"
                                name="password"
                                onChange={(e) => handleChange(e)}
                            />
                            <p className="errorMsg">{formErrors.password}</p>
                        </div>
                        <button>確定</button>
                        <Link to="/NewPassward"><p className="inputnewpassward">新規登録・パスワードを忘れた</p></Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Passward;
