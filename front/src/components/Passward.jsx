import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../LoginProvider";
import { UserIdContext } from "../UserIdProvider"; // UserIdContextをインポート
import "./Passward.css";

const Passward = () => {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [apiMessage, setApiMessage] = useState(""); // APIレスポンスメッセージ
  const [isLoading, setIsLoading] = useState(false); // ローディング状態
  const [shouldCheck, setShouldCheck] = useState(false); // API呼び出しフラグ

  const navigate = useNavigate();
  const { setLogininfo } = useContext(LoginContext);
  const { setUserId } = useContext(UserIdContext); // UserIdContextからsetUserIdを取得

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      setShouldCheck(true); // フラグを立てる
    }
  };

  const extractUserId = (email) => {
    const match = email.match(/^([a-zA-Z0-9]+)@ms\.dendai\.ac\.jp$/);
    return match ? match[1] : null; // 正規表現で22fi000を抽出
  };

  useEffect(() => {
    if (!shouldCheck) return;

    const checkEmailAndPassword = async () => {
      try {
        // メールアドレスの存在確認APIを呼び出す
        const checkEmailResponse = await fetch(
          "http://localhost:8080/wsp-example/api/check-emailapi",
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ email: formValues.email }),
          }
        );

        const checkEmailData = await checkEmailResponse.json();

        if (checkEmailResponse.ok && checkEmailData.exists) {
          // パスワード検証APIを呼び出す
          const checkPasswordResponse = await fetch(
            "http://localhost:8080/wsp-example/api/check-passwordapi",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formValues),
            }
          );

          const checkPasswordData = await checkPasswordResponse.json();

          if (checkPasswordResponse.ok && checkPasswordData.status === "success") {
            setApiMessage("ログイン成功！リダイレクト中...");
            setLogininfo(true);

            // メールアドレスからユーザーIDを抽出して保存
            const userId = extractUserId(formValues.email);
            if (userId) {
              setUserId(userId);
            }

            alert("ログイン成功！");
            navigate("/"); // リダイレクト処理
          } else {
            setApiMessage(checkPasswordData.message || "パスワードが間違っています。");
            alert("パスワードが間違っています。");
          }
        } else {
          setApiMessage(checkEmailData.message || "メールアドレスが存在しません。");
          alert("メールアドレスが存在しません。");
        }
      } catch (error) {
        setApiMessage("サーバーに接続できませんでした。");
        console.error("An error occurred:", error);
      } finally {
        setIsLoading(false);
        setShouldCheck(false); // フラグをリセット
      }
    };

    checkEmailAndPassword();
  }, [shouldCheck, formValues]);

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
        <form onSubmit={handleSubmit}>
          <h1>ログイン</h1>
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
              <p className="errorMsg">{formErrors.email}</p>
            </div>
            <div className="FormField">
              <input
                type="password"
                placeholder="パスワード"
                name="password"
                value={formValues.password}
                onChange={handleChange}
              />
              <p className="errorMsg">{formErrors.password}</p>
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "確認中..." : "確定"}
            </button>
            <p className="apiMsg">{apiMessage}</p>
            <Link to="/NewPassward">
              <p className="inputnewpassward">新規登録・パスワードを忘れた</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Passward;
