import logo from './logo.svg';
import './App.css';
import { useRef, useState } from 'react';

import Reservation from './Reservation';

// PDF 7.4
function NameForm(props) {
  const [value, setValue] = useState('');
  const handleChange = (event) => {
    // setValue(event.target.value);

    // PDF 7.5
    setValue(event.target.value.toUpperCase());
  };
  const handleSubmit = (event) => {
    alert(`입력한 이름: ${value}`);
    event.preventDefault();
    // event.preventDefault()가 없다면 alert가 뜨면서 input 창에 입력한 값이 사라짐
    // event.stopPropagation(); // 연쇄작용을 막아줌 (preventDefault와 비슷)
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        이름:
        <input type="text" value={value} onChange={handleChange} />
      </label>
      <button type="submit">제출</button>
    </form>
  )
}
// function App() {
//   return (
//     <div className="App">
//       <NameForm />
//     </div>
//   );
// }

// PDF 7.7
function TextAreaForm(props) {
  const [value, setValue] = useState('요청사항을 입력하세요.');
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleSubmit = (event) => {
    alert(`입력한 요청사항: ${value}`);
    event.preventDefault();
  };
  // textarea를 클릭하면 기본 글자를 제거하도록 코드 작성
  const click = (e) => {
    e.target.value = '';
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        요청사항:
        <textarea value={value} onChange={handleChange}
          onClick={click} />
      </label>
      <button type="submit">제출</button>
    </form>
  );
}
// function App() {
//   return (
//     <div className="App">
//       <NameForm />
//       <TextAreaForm />
//     </div>
//   );
// }

// PDF 7.9
function SelectForm(props) {
  const [value, setValue] = useState('grape');
  const handleChange = (event) => setValue(event.target.value);
  const handleSubmit = (event) => {
    alert(`선택한 과일: ${value}`);
    event.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        과일을 선택하세요:
        <select value={value} onChange={handleChange}>
          <option value="apple">사과</option> <option value="banana">바나나</option>
          <option value="grape">포도</option> <option value="watermelon">수박</option>
        </select>
      </label>
      <button type="submit">제출</button>
    </form>
  );
}
// function App() {
//   return (
//     <div className="App">
//       <NameForm />
//       <TextAreaForm />
//       <SelectForm />
//     </div>
//   );
// }

// PDF 7.10 / 7.11
// function App() {
//   return (
//     <div className="App">
//       <Reservation />
//       <NameForm />
//       <TextAreaForm />
//       <SelectForm />
//     </div>
//   );
// }

// PDF 7.15 연습문제
const App = () => {
  const [agree, setAgree] = useState(false);
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');

  const [formData, setFormData] = useState({
    userId: '', password: '', confirmPassword: '', email: '', phoneNumber: '', address: ''
  });

  const pw1 = useRef();
  const pw2 = useRef();
  const pwMatch = useRef();

  // const handlePw = (e) => {
  //   setConfirmPassword(e.target.value)
  //   if (pw1.current.value == pw2.current.value) {
  //     pwMatch.current.classList.add("hidden")
  //   } else {
  //     pwMatch.current.classList.remove("hidden")
  //   }
  // }

  const handleInput = (e) => {
    // console.dir(e.target);
    // const name = e.target.name;
    // const value = e.target.value;
    // 중괄호를 쓰면서 뽑아낼 속성명을 써주면 알아서 그 내용들만 뽑아와줌
    const { name, value } = e.target;
    // 기존의 데이터를 가져오고싶을때 : ...formData / 새로 넣고싶은 데이터 : name: value
    const newFormData = { ...formData, [name]: value };
    // 모든 input을 handleInput 함수 하나로 처리하기 위해 이렇게 하는중
    setFormData(newFormData);

    if (pw1.current.value == pw2.current.value) {
      pwMatch.current.classList.add("hidden")
    } else {
      pwMatch.current.classList.remove("hidden")
    }
  }

  return (
    <div className="container">
      <h2>회원 가입</h2>
      <form onSubmit={() => {
        alert(
          `[입력된 내용]
아이디 : ${formData.userId}
비밀번호 : ${formData.password}
이메일 : ${formData.email}
전화번호 : ${formData.phoneNumber}
주소 : ${formData.address}`
        ); // `를 사용하면 들여쓰기도 다 적용되기 때문에 들여쓰기 없이 적어줌
      }}>
        <div className="form-group">
          <input type="checkbox" id="agree"
            onChange={() => {
              setAgree(prev => !prev)
            }} />
          <label className='agree' htmlFor="agree">이용약관에 모두 동의합니다</label>
        </div>
        {
          agree &&
          <div>
            <div className="form-group">
              <label htmlFor="userId">사용자 아이디</label>
              <input type="text" id="userId" name="userId"
                value={formData.userId}
                onChange={handleInput}
                required />
            </div>

            {/* <div className="form-group">
              <label htmlFor="password">비밀번호</label>
              <input type="password" id="password" name="password"
                ref={pw1}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                required />
            </div> */}
            <div className="form-group">
              <label htmlFor="password">비밀번호</label>
              <input type="password" id="password" name="password"
                ref={pw1}
                value={formData.password}
                onChange={handleInput}
                required />
            </div>

            {/* <div className="form-group">
              <label htmlFor="confirmPassword">비밀번호 확인</label>
              <input type="password" id="confirmPassword" name="confirmPassword"
                ref={pw2}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  // css로 태그를 보일지 말지 설정해주는것보다 css를 모두 만들어놓고 class를 넣었다 뺐다 하는게 더 좋은 방법임
                  if (pw1.current.value == pw2.current.value) {
                    pwMatch.current.classList.add("hidden")
                  } else {
                    pwMatch.current.classList.remove("hidden")
                  }
                  // App.css에 .hidden css 작성
                  // 비밀번호 확인부분에만 hidden 관련 조건문을 작성해놨기 때문에 pw1=pw2가 확인된 후 pw1를 바꿔도 pwMatch가 다시 출력되지 않음
                  // ===> handlePw 함수로 만들어서 적용해주기
                }}
                required />
              <label id="pw-match" className="pw-match" ref={pwMatch}>비밀번호가 일치해야 됩니다.</label>
            </div> */}
            {/* <div className="form-group">
              <label htmlFor="confirmPassword">비밀번호 확인</label>
              <input type="password" id="confirmPassword" name="confirmPassword"
                ref={pw2}
                value={confirmPassword}
                onChange={handlePw}
                required />
              <label id="pw-match" className="pw-match" ref={pwMatch}>비밀번호가 일치해야 됩니다.</label>
            </div> */}
            <div className="form-group">
              <label htmlFor="confirmPassword">비밀번호 확인</label>
              <input type="password" id="confirmPassword" name="confirmPassword"
                ref={pw2}
                value={formData.confirmPassword}
                onChange={handleInput}
                required />
              <label id="pw-match" className="pw-match" ref={pwMatch}>비밀번호가 일치해야 됩니다.</label>
            </div>

            <div className="form-group">
              <label htmlFor="email">이메일</label>
              <input type="email" id="email" name="email"
                value={formData.email}
                onChange={handleInput}
                required />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">전화번호</label>
              <input type="tel" id="phoneNumber" name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInput}
                required />
            </div>

            <div className="form-group">
              <label htmlFor="address">주소</label>
              <input type="text" id="address" name="address"
                value={formData.address}
                onChange={handleInput}
                required />
            </div>

            <button type="submit">제출</button>
          </div>
        }
      </form>
    </div>
  );
};

export default App;
