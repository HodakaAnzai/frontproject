import { useState } from 'react';

const NewPassword = () => {
  const initialValues = { email: "", newpass: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.email) {
      errors.email = "メールアドレスを入力してください";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "有効なメールアドレスを入力してください";
    }

    if (!values.newpass) {
      errors.newpass = "新規パスワードを入力してください";
    }

    return errors;
  };

  return (
    <div className="formContainer">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>新規パスワード登録</h1>
        <hr />
        <div className="uiForm">
          <div className="FormField">
            <input
              type="text"
              placeholder="メールアドレス"
              name="email"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <p className="errorMsg">{formErrors.email}</p>

          <div className="FormField">
            <input
              type="password"
              placeholder="新規パスワード"
              name="newpass"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <p className="errorMsg">{formErrors.newpass}</p>

          <button>確定</button>
          {Object.keys(formErrors).length === 0 && isSubmit && (
            <div className="msgok">新しいパスワードが登録されました</div>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewPassword;
