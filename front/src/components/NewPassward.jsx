import { useState } from "react";

const NewPassword = () => {
  const initialValues = { email: "", newpass: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [apiMessage, setApiMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false); // フォームが送信されたかどうか

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmit(true); // フォーム送信を開始
      try {
        const response = await fetch("http://localhost:8080/wsp-example/RegisterApi", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            email: formValues.email,
            password: formValues.newpass,
          }),
        });

        if (response.ok) {
          setApiMessage("新しいパスワードが登録されました！");
        } else {
          const errorText = await response.text();
          setApiMessage(`エラー: ${errorText}`);
        }
      } catch (error) {
        setApiMessage("サーバーに接続できませんでした。");
        console.error("エラー:", error);
      } finally {
        setIsSubmit(false); // フォーム送信終了
      }
    }
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
      <form onSubmit={handleSubmit}>
        <h1>新規パスワード登録</h1>
        <hr />
        <div className="uiForm">
          <div className="FormField">
            <input
              type="text"
              placeholder="メールアドレス"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p className="errorMsg">{formErrors.email}</p>

          <div className="FormField">
            <input
              type="password"
              placeholder="新規パスワード"
              name="newpass"
              value={formValues.newpass}
              onChange={handleChange}
            />
          </div>
          <p className="errorMsg">{formErrors.newpass}</p>

          <button type="submit" disabled={isSubmit}>
            {isSubmit ? "送信中..." : "確定"}
          </button>
          {apiMessage && <div className="apiMessage">{apiMessage}</div>}
        </div>
      </form>
    </div>
  );
};

export default NewPassword;
