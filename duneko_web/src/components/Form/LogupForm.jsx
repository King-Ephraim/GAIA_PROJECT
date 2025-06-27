import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nom: "",
    nomDomaine: "",
    extension: "tg",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [touched, setTouched] = useState({
    nom: false,
    nomDomaine: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const navigate = useNavigate();
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const fileInputRef = useRef(null);

  // Options pour les extensions de domaine
  const domainExtensions = [
    { value: "tg", label: ".tg (Togo)" },
    { value: "fr", label: ".fr (France)" },
    { value: "com", label: ".com (Commercial)" },
    { value: "org", label: ".org (Organisation)" },
    { value: "net", label: ".net (Réseau)" },
    { value: "eu", label: ".eu (Europe)" },
    { value: "io", label: ".io (Technologie)" },
    { value: "other", label: "Autre extension" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (!touched[name]) {
      setTouched(prev => ({ ...prev, [name]: true }));
    }

    validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    if (!touched[name]) {
      setTouched(prev => ({ ...prev, [name]: true }));
    }
    validateField(name, e.target.value);
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "nom":
        if (!value.trim()) {
          newErrors.nom = "Le nom de l'entreprise est requis";
        } else {
          delete newErrors.nom;
        }
        break;

      case "nomDomaine":
        if (!value.trim()) {
          newErrors.nomDomaine = "Le nom de domaine est requis";
        } else if (!/^[a-zA-Z0-9-]+$/.test(value)) {
          newErrors.nomDomaine = "Caractères invalides (utilisez lettres, chiffres et tirets)";
        } else {
          delete newErrors.nomDomaine;
        }
        break;

      case "email":
        if (!value.trim()) {
          newErrors.email = "L'email est requis";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Format d'email invalide";
        } else {
          delete newErrors.email;
        }
        break;

      case "password":
        if (!value) {
          newErrors.password = "Le mot de passe est requis";
        } else if (value.length < 8) {
          newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
        } else {
          delete newErrors.password;
        }
        break;

      case "confirmPassword":
        if (value !== formData.password) {
          newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoClick = () => {
    fileInputRef.current.click();
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.nom.trim()) {
        newErrors.nom = "Le nom de l'entreprise est requis";
      }

      if (!formData.nomDomaine.trim()) {
        newErrors.nomDomaine = "Le nom de domaine est requis";
      } else if (!/^[a-zA-Z0-9-]+$/.test(formData.nomDomaine)) {
        newErrors.nomDomaine = "Caractères invalides (utilisez lettres, chiffres et tirets)";
      }

      if (formData.extension === "other" && !formData.extensionCustom) {
        newErrors.extensionCustom = "Veuillez spécifier l'extension";
      }
    }

    if (step === 2) {
      if (!formData.email.trim()) {
        newErrors.email = "L'email est requis";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Format d'email invalide";
      }

      if (!formData.password) {
        newErrors.password = "Le mot de passe est requis";
      } else if (formData.password.length < 8) {
        newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
      }
    }

    if (step === 3 && !termsAccepted) {
      newErrors.terms = "Vous devez accepter les conditions d'utilisation";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateStep(3)) {
      const extension = formData.extension === "other"
        ? formData.extensionCustom
        : formData.extension;

      const domaineComplet = `${formData.nomDomaine}.${extension}`;

      const formPayload = new FormData();
      formPayload.append("nom", formData.nom);
      formPayload.append("domaine", domaineComplet);
      formPayload.append("email", formData.email);
      formPayload.append("password", formData.password);

      if (logoFile) {
        formPayload.append("logo", logoFile);
      }

      try {
        const response = await fetch('/api/logup', {
          method: 'POST',
          body: formPayload
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Inscription réussie:", data);
          navigate('/login');
        } else {
          const errorData = await response.json();
          setErrors({ submit: errorData.error || "Erreur lors de l'inscription" });
        }
      } catch {
        setErrors({ submit: "Erreur de connexion au serveur" });
      }
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormSection>
            <SectionTitle>Étape 1: Informations de l'entreprise</SectionTitle>

            <InputGroup>
              <InputWrapper>
                <Input
                  placeholder="Nom de l'entreprise *"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  $hasError={touched.nom && !!errors.nom}
                />
                {touched.nom && errors.nom && <ErrorText>{errors.nom}</ErrorText>}
              </InputWrapper>
            </InputGroup>

            <DomainGroup>
              <DomainInputWrapper>
                <DomainInput
                  placeholder="Nom de domaine *"
                  name="nomDomaine"
                  value={formData.nomDomaine}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  $hasError={touched.nomDomaine && !!errors.nomDomaine}
                />
                {touched.nomDomaine && errors.nomDomaine && <ErrorText>{errors.nomDomaine}</ErrorText>}
              </DomainInputWrapper>

              <DomainSelectWrapper>
                <DomainSelect
                  name="extension"
                  value={formData.extension}
                  onChange={handleChange}
                >
                  {domainExtensions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </DomainSelect>
              </DomainSelectWrapper>
            </DomainGroup>

            {formData.extension === "other" && (
              <InputGroup>
                <InputWrapper>
                  <Input
                    placeholder="Votre extension personnalisée *"
                    name="extensionCustom"
                    value={formData.extensionCustom || ""}
                    onChange={handleChange}
                    $hasError={!!errors.extensionCustom}
                  />
                  {errors.extensionCustom && <ErrorText>{errors.extensionCustom}</ErrorText>}
                </InputWrapper>
              </InputGroup>
            )}

            <LogoUploadContainer onClick={handleLogoClick}>
              <UploadIcon viewBox="0 0 24 24">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
              </UploadIcon>
              <UploadText>
                {logoFile ? "Modifier le logo" : "Télécharger votre logo"}
              </UploadText>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: "none" }}
              />
            </LogoUploadContainer>

            {logoPreview && (
              <LogoPreview>
                <p>Aperçu du logo:</p>
                <img src={logoPreview} alt="Aperçu du logo" />
              </LogoPreview>
            )}

            <DomainPreview>
              Votre domaine complet sera : <strong>{formData.nomDomaine}.{formData.extension === "other" ? (formData.extensionCustom || "[extension]") : formData.extension}</strong>
            </DomainPreview>
          </FormSection>
        );

      case 2:
        return (
          <FormSection>
            <SectionTitle>Étape 2: Informations du compte</SectionTitle>

            <Input
              placeholder="Email professionnel *"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              $hasError={touched.email && !!errors.email}
            />
            {touched.email && errors.email && <ErrorText>{errors.email}</ErrorText>}

            <Input
              placeholder="Mot de passe *"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              $hasError={touched.password && !!errors.password}
            />
            {touched.password && errors.password && <ErrorText>{errors.password}</ErrorText>}

            <Input
              placeholder="Confirmer le mot de passe *"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              $hasError={touched.confirmPassword && !!errors.confirmPassword}
            />
            {touched.confirmPassword && errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
          </FormSection>
        );

      case 3:
        return (
          <FormSection>
            <SectionTitle>Étape 3: Conditions d'utilisation</SectionTitle>

            <TermsContainer>
              <Checkbox
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <TermsLabel htmlFor="terms">
                J'accepte les <TermsLink href="#">conditions d'utilisation</TermsLink>
              </TermsLabel>
              {errors.terms && <ErrorText>{errors.terms}</ErrorText>}
            </TermsContainer>

            {errors.submit && <SubmitError>{errors.submit}</SubmitError>}
          </FormSection>
        );

      default:
        return null;
    }
  };

  return (
    <StyledWrapper>
      <Container>
        <Stepper>
          <Step $active={currentStep === 1}>
            <StepNumber $active={currentStep === 1}>1</StepNumber>
            <StepLabel>Entreprise</StepLabel>
          </Step>
          <Step $active={currentStep === 2}>
            <StepNumber $active={currentStep === 2}>2</StepNumber>
            <StepLabel>Compte</StepLabel>
          </Step>
          <Step $active={currentStep === 3}>
            <StepNumber $active={currentStep === 3}>3</StepNumber>
            <StepLabel>Validation</StepLabel>
          </Step>
        </Stepper>

        <Form onSubmit={handleSubmit}>
          <FormHeader>
            <Heading>Créer votre entreprise</Heading>
            <StepIndicator>Étape {currentStep} sur 3</StepIndicator>
          </FormHeader>

          {renderStepContent()}

          <ButtonContainer>
            {currentStep > 1 && (
              <PrevButton type="button" onClick={prevStep}>
                Précédent
              </PrevButton>
            )}

            {currentStep < 3 ? (
              <NextButton type="button" onClick={nextStep}>
                Suivant
              </NextButton>
            ) : (
              <SignUpButton type="submit">
                Créer mon entreprise
              </SignUpButton>
            )}
          </ButtonContainer>
        </Form>

        <SignInContainer>
          <SignInText>Vous avez déjà une entreprise enregistrée?</SignInText>
          <SignInLink to="/login">Se connecter</SignInLink>
        </SignInContainer>
      </Container>
    </StyledWrapper>
  );
};

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styles
const StyledWrapper = styled.div`
  max-width: 700px;
  width: 100%;
  background: #ffffff;
  border-radius: 16px;
  padding: 35px 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin: 40px auto;
  animation: ${fadeIn} 0.6s ease-out;
  border: 1px solid #e0f0e0;
`;

const Container = styled.div``;

const Stepper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 40px;
  
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    height: 4px;
    background: #e0f0e0;
    z-index: 1;
    border-radius: 2px;
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  flex: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.$active ? '#268826' : 'transparent'};
    z-index: 2;
    border-radius: 2px;
    transition: all 0.3s ease;
  }
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.$active ? '#268826' : '#e0f0e0'};
  color: ${props => props.$active ? '#fff' : '#888'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
  border: 2px solid #fff;
  box-shadow: 0 0 0 2px ${props => props.$active ? '#268826' : '#e0f0e0'};
  transition: all 0.3s ease;
`;

const StepLabel = styled.div`
  font-size: 14px;
  color: #555;
  font-weight: 500;
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const Heading = styled.div`
  font-weight: 700;
  font-size: 32px;
  letter-spacing: 0.5px;
  color: #268826;
  margin-bottom: 10px;
`;

const StepIndicator = styled.div`
  font-size: 16px;
  color: #666;
  font-weight: 500;
  background: #e8f5e9;
  display: inline-block;
  padding: 5px 15px;
  border-radius: 20px;
`;

const Form = styled.form`
  margin-top: 15px;
`;

const FormSection = styled.div`
  margin-bottom: 25px;
  padding-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 22px;
  color: #268826;
  margin-bottom: 25px;
  font-weight: 600;
  position: relative;
  padding-bottom: 10px;
  
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: #268826;
    border-radius: 3px;
  }
`;

const InputGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0;
  }
`;

const DomainGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const InputWrapper = styled.div`
  flex: 1;
`;

const DomainInputWrapper = styled.div`
  flex: 2;
`;

const DomainSelectWrapper = styled.div`
  flex: 1;
`;

const Input = styled.input`
  width: 100%;
  background: #f9fdf9;
  border: 1px solid #e0f0e0;
  padding: 14px 18px;
  border-radius: 8px;
  margin-top: 12px;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
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

  ${props => props.$hasError && `
    border-color: #e53935;
    background: rgba(229, 57, 53, 0.05);
  `}
`;

const DomainInput = styled(Input)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none;
  
  @media (max-width: 480px) {
    border-radius: 8px;
    border-right: 1px solid ${props => props.$hasError ? '#e53e3e' : '#e0f0e0'};
  }
`;

const DomainSelect = styled.select`
  width: 100%;
  background: #f9fdf9;
  border: 1px solid #e0f0e0;
  padding: 14px 18px;
  border-radius: 8px;
  margin-top: 12px;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23268826' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  
  &:focus {
    outline: none;
    border-color: #268826;
    box-shadow: 0 0 0 2px rgba(38, 136, 38, 0.2);
  }
  
  @media (max-width: 480px) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-top: none;
  }
`;

const DomainPreview = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #e8f5e9;
  border-radius: 8px;
  border-left: 4px solid #268826;
  font-size: 16px;
  color: #2e7d32;
  
  strong {
    color: #1b5e20;
    font-weight: 600;
  }
`;

const ErrorText = styled.div`
  color: #e53935;
  font-size: 14px;
  margin-top: 8px;
  padding-left: 5px;
  animation: ${fadeIn} 0.3s ease-out;
`;

const SubmitError = styled.div`
  color: #e53935;
  font-size: 16px;
  padding: 15px;
  margin: 20px 0;
  border-radius: 8px;
  background-color: #ffebee;
  text-align: center;
  border: 1px solid #ffcdd2;
`;

const LogoUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #c8e6c9;
  border-radius: 8px;
  padding: 30px 20px;
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #f1f8e9;
  
  &:hover {
    border-color: #268826;
    background-color: #e8f5e9;
  }
`;

const UploadIcon = styled.svg`
  width: 50px;
  height: 50px;
  fill: #268826;
  margin-bottom: 15px;
`;

const UploadText = styled.p`
  color: #268826;
  font-weight: 500;
  text-align: center;
  margin: 0;
  font-size: 18px;
`;

const LogoPreview = styled.div`
  margin-top: 20px;
  text-align: center;
  
  p {
    font-size: 16px;
    color: #388e3c;
    margin-bottom: 10px;
  }
  
  img {
    max-width: 150px;
    max-height: 150px;
    border-radius: 8px;
    border: 1px solid #c8e6c9;
    padding: 5px;
    background: white;
  }
`;

const TermsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 30px 0;
`;

const Checkbox = styled.input`
  margin-right: 15px;
  margin-top: 5px;
  accent-color: #268826;
  width: 20px;
  height: 20px;
`;

const TermsLabel = styled.label`
  font-size: 16px;
  color: #555;
  line-height: 1.6;
  flex: 1;
`;

const TermsLink = styled.a`
  color: #268826;
  text-decoration: none;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-top: 30px;
`;

const NavigationButton = styled.button`
  flex: 1;
  font-weight: 600;
  font-size: 16px;
  padding: 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Roboto', sans-serif;
  border: none;
`;

const NextButton = styled(NavigationButton)`
  background: #268826;
  color: white;
  
  &:hover {
    background: #1f7a1f;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(38, 136, 38, 0.3);
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const PrevButton = styled(NavigationButton)`
  background: #f5f5f5;
  color: #555;
  
  &:hover {
    background: #e0e0e0;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const SignUpButton = styled(NavigationButton)`
  background: #268826;
  color: white;
  font-weight: 700;
  animation: ${pulse} 2s infinite;
  
  &:hover {
    background: #1f7a1f;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(38, 136, 38, 0.4);
    animation: none;
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const SignInContainer = styled.div`
  text-align: center;
  margin-top: 35px;
  padding-top: 25px;
  border-top: 1px solid #e0f0e0;
`;

const SignInText = styled.span`
  font-size: 16px;
  color: #666;
`;

const SignInLink = styled(Link)`
  color: #268826;
  text-decoration: none;
  font-weight: 600;
  margin-left: 5px;
  transition: all 0.2s ease;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default SignUpForm;