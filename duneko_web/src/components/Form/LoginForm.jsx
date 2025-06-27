import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Effacer l'erreur quand l'utilisateur modifie le champ
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (validateForm()) {
      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();

        if (response.ok) {
          // Stocker le token dans le localStorage
          localStorage.setItem('authToken', data.token);

          // Stocker les informations utilisateur
          localStorage.setItem('userData', JSON.stringify(data.user));

          // Rediriger vers le dashboard
          navigate('/dashboard');
        } else {
          setErrors({ submit: data.error || "Erreur lors de la connexion" });
        }
      } catch {
        setErrors({ submit: "Erreur de connexion au serveur" });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <Container>
        <Heading>Connexion</Heading>
        <Form onSubmit={handleSubmit}>
          <FormSection>
            <Input
              placeholder="Adresse e-mail"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              $hasError={!!errors.email}
              required
            />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}

            <Input
              placeholder="Mot de passe"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              $hasError={!!errors.password}
              required
            />
            {errors.password && <ErrorText>{errors.password}</ErrorText>}

            <ForgotPassword>
              <Link to="/forgot-password">Mot de passe oublié ?</Link>
            </ForgotPassword>
          </FormSection>

          {errors.submit && <SubmitError>{errors.submit}</SubmitError>}

          <LoginButton type="submit" disabled={loading}>
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </LoginButton>

          <SignUpLink>
            Vous n'avez pas de compte ? <Link to="/logup">Inscrivez-vous</Link>
          </SignUpLink>

          <SocialSection>
            <SocialTitle>Ou se connecter avec</SocialTitle>
            <SocialAccounts>
              <SocialButton className="google">
                <svg viewBox="0 0 488 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
              </SocialButton>

              <SocialButton className="apple">
                <svg viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                </svg>
              </SocialButton>

              <SocialButton className="twitter">
                <svg viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                </svg>
              </SocialButton>
            </SocialAccounts>
          </SocialSection>

          <Agreement>
            <Link to="/terms">Consulter le contrat d'utilisation</Link>
          </Agreement>
        </Form>
      </Container>
    </StyledWrapper>
  );
}

// Styles
const StyledWrapper = styled.div`
  max-width: 450px;
  width: 100%;
  background: #ffffff;
  border-radius: 15px;
  padding: 35px 40px;
  border: 5px solid rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.3) 0px 30px 60px -10px;
`;

const Container = styled.div``;

const Heading = styled.div`
  text-align: center;
  font-weight: 700;
  font-size: 32px;
  letter-spacing: 0.5px;
  color: #1a2a6c;
  margin-bottom: 25px;
`;

const Form = styled.form`
  margin-top: 15px;
`;

const FormSection = styled.div`
  margin-bottom: 25px;
`;

const Input = styled.input`
  width: 100%;
  background: white;
  border: none;
  padding: 14px 18px;
  border-radius: 8px;
  margin-top: 12px;
  box-sizing: border-box;
  box-shadow: rgba(133, 189, 215, 0.3) 0px 8px 8px -5px;
  border: 1px solid ${props => props.$hasError ? '#e53935' : '#e0e0e0'};
  font-family: 'Roboto', sans-serif;
  font-size: 15px;
  font-weight: 400;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #268826;
    box-shadow: 0 0 0 2px rgba(38, 136, 38, 0.2);
  }

  &::placeholder {
    color: #a0aec0;
    font-weight: 400;
  }
`;

const ErrorText = styled.div`
  color: #e53935;
  font-size: 13px;
  margin-top: 5px;
  margin-left: 10px;
`;

const SubmitError = styled.div`
  color: #e53935;
  font-size: 14px;
  padding: 10px;
  margin: 10px 0;
  border-radius: 8px;
  background-color: #ffebee;
  text-align: center;
  border: 1px solid #ffcdd2;
`;

const ForgotPassword = styled.div`
  display: block;
  margin-top: 12px;
  margin-left: 8px;
  
  a {
    font-size: 13px;
    color: #1a2a6c;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
    
    &:hover {
      color: #268826;
      text-decoration: underline;
    }
  }
`;

const LoginButton = styled.button`
  display: block;
  width: 100%;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.5px;
  background: linear-gradient(45deg, #1a2a6c, #163f25);
  color: white;
  padding: 14px;
  border-radius: 10px;
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(26, 42, 108, 0.3);
  font-family: 'Roboto', sans-serif;
  margin: 25px 0 15px;
  opacity: ${props => props.disabled ? 0.7 : 1};
  
  &:hover:not(:disabled) {
    background: linear-gradient(45deg, #163f25, #268826);
    transform: translateY(-2px);
    box-shadow: 0 7px 20px rgba(22, 63, 37, 0.4);
  }
  
  &:active:not(:disabled) {
    transform: translateY(1px);
  }
`;

const SocialSection = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

const SocialTitle = styled.span`
  display: block;
  text-align: center;
  font-size: 15px;
  color: #4a5568;
  margin-bottom: 15px;
`;

const SocialAccounts = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 18px;
`;

const SocialButton = styled.button`
  background: linear-gradient(45deg, #1a2a6c, #163f25);
  border: 3px solid white;
  padding: 8px;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  svg {
    fill: white;
    width: 20px;
    height: 20px;
  }
  
  &:hover {
    background: linear-gradient(45deg, #163f25, #268826);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  &.google {
    background: linear-gradient(45deg, #DB4437, #EA4335);
  }
  
  &.apple {
    background: linear-gradient(45deg, #000000, #333333);
  }
  
  &.twitter {
    background: linear-gradient(45deg, #1DA1F2, #1DA1F2);
  }
`;

const Agreement = styled.div`
  display: block;
  text-align: center;
  margin-top: 25px;
  
  a {
    font-size: 13px;
    color: #1a2a6c;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
    
    &:hover {
      color: #268826;
      text-decoration: underline;
    }
  }
`;

const SignUpLink = styled.p`
  text-align: center;
  font-size: 14px;
  color: #4a5568;
  margin-top: 15px;

  a {
    color: #1a2a6c;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;

    &:hover {
      color: #268826;
      text-decoration: underline;
    }
  }
`;

export default LoginForm;