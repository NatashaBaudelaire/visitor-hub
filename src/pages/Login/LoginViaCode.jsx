import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/user-context';
import { fakeValidateCode } from '../../services/authService';
import Icon from '../../components/Icon';
import './styles.css';
import logo from '../../assets/logo-accenture.png';

function LoginViaCode() {
  const [code, setCode] = useState(Array(6).fill(''));
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const { userData } = useUser();

  const handleChange = (index, value) => {
    if (/^\d$/.test(value) || value === '') {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length === 6) {
      const isValid = await fakeValidateCode(userData.email, fullCode);
      if (isValid) {
        navigate('/loading');
      } else {
        alert('Incorrect code. Please try again.');
      }
    } else {
      alert('Enter the complete code.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-shell">
        <header className="login-header">
          <img src={logo} alt="Accenture" className="accenture-logo" />
          <div className="login-status"><span></span>Secure sign-in</div>
        </header>

        <main className="login-main">
          <form className="login-card" onSubmit={handleSubmit}>
            <div className="login-title-row">
              <div className="login-symbol"><Icon name="arrowRight" size={26} /></div>
              <p className="login-eyebrow">Verification</p>
              <h1 className="login-title">Confirm your<br />access code.</h1>
            </div>
            <p className="login-subtitle">Enter the six-digit code sent to your work email.</p>

            <div className="code-input-container" aria-label="Six-digit verification code">
              {code.map((digit, index) => (
                <input key={index} type="text" inputMode="numeric" aria-label={`Digit ${index + 1}`} maxLength="1" className="code-input" value={digit} onChange={(e) => handleChange(index, e.target.value)} onKeyDown={(e) => handleKeyDown(e, index)} ref={(el) => (inputsRef.current[index] = el)} />
              ))}
            </div>

            <button className="login-button" type="submit">
              Confirm code <Icon name="arrowRight" size={18} />
            </button>
          </form>
        </main>
        <p className="login-note">Your access is protected by corporate verification.</p>
      </div>
    </div>
  );
}

export default LoginViaCode;
