import React, { useCallback, useRef, useState } from 'react';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import { Form } from '@unform/web';

import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background, AnimationContainer } from './styles';
import Input from '../../components/Input';
import { useToast } from '../../hooks/Toast';
import Button from '../../components/Button';
import api from '../../services/api';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logo = require('../../assets/logo.svg');

interface ForgotPasswordFormData {
    email: string;
}

const ForgotPassword: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();
    const { addToast } = useToast();
    const handleSubmit = useCallback(
        async (data: ForgotPasswordFormData) => {
            try {
                setLoading(true);
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('Digite um e-mail válido'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await api.post('/password/forgot', {
                    email: data.email,
                });

                addToast({
                    type: 'success',
                    title: 'E-mail de recuperação enviado!',
                    description:
                        'Enviamos um email para confirmar a recuperação de senha, cheque sua caixa de entrada!',
                });

                // history.push('/dashboard');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);

                    return;
                }

                addToast({
                    type: 'error',
                    title: 'Erro na recuperação de senha',
                    description:
                        'Ocorreu um erro ao tentar recuperar sua senha, tente novamente!',
                });
            } finally {
                setLoading(false);
            }
        },
        [addToast, history],
    );
    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logo} alt="GoBarber" />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Recuperar Senha</h1>

                        <Input
                            name="email"
                            icon={FiMail}
                            placeholder="E-mail"
                        />

                        <Button loading={loading} type="submit">
                            Recuperar
                        </Button>
                    </Form>

                    <Link to="/signin">
                        <FiLogIn />
                        Voltar ao login
                    </Link>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    );
};

export default ForgotPassword;
