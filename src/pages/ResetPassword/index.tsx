import React, { useCallback, useRef } from 'react';

import { FiLock } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { Form } from '@unform/web';

import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background, AnimationContainer } from './styles';
import Input from '../../components/Input';
import { useToast } from '../../hooks/Toast';
import Button from '../../components/Button';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logo = require('../../assets/logo.svg');

interface ResetPasswordFormData {
    password: string;
    password_confirmation: string;
}

const ResetPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();

    const { addToast } = useToast();

    const handleSubmit = useCallback(
        async (data: ResetPasswordFormData) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    password: Yup.string().required('Senha obrigatória'),
                    password_confirmation: Yup.string().oneOf(
                        [Yup.ref('password'), null],
                        'Senhas precisam ser iguais',
                    ),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                history.push('/signin');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);

                    return;
                }

                addToast({
                    type: 'error',
                    title: 'Erro ao resetar senha',
                    description:
                        'Ocorreu um erro ao resetar sua senha, tente novamente',
                });
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
                        <h1>Resetar senha</h1>

                        <Input
                            name="password"
                            icon={FiLock}
                            type="password"
                            placeholder="Nova senha"
                        />

                        <Input
                            name="password_confirmation"
                            icon={FiLock}
                            type="password"
                            placeholder="Confirmação de senha"
                        />

                        <Button type="submit">Alterar senha</Button>
                    </Form>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    );
};

export default ResetPassword;
