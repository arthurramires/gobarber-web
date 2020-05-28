import React from 'react';
import { FiPower, FiClock } from 'react-icons/fi';
import {
    Container,
    Header,
    HeaderContent,
    Profile,
    Content,
    Schedule,
    Calendar,
    NextAppointment,
} from './styles';
import { useAuth } from '../../hooks/Auth';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logo = require('../../assets/logo.svg');

const Dashboard: React.FC = () => {
    const { signOut, user } = useAuth();
    return (
        <Container>
            <Header>
                <HeaderContent>
                    <img src={logo} alt="GoBarber" />

                    <Profile>
                        <img src={user.avatar_url} alt="Avatar" />
                        <div>
                            <span>Bem vindo!</span>
                            <strong>{user.name}</strong>
                        </div>
                    </Profile>

                    <button type="button" onClick={signOut}>
                        <FiPower />
                    </button>
                </HeaderContent>
            </Header>

            <Content>
                <Schedule>
                    <h1>Horários Agendados</h1>
                    <p>
                        <span>Hoje</span>
                        <span>Dia 06</span>
                        <span>Segunda-feira</span>
                    </p>

                    <NextAppointment>
                        <strong>Atendimento a seguir</strong>
                        <div>
                            <img
                                src="https://avatars3.githubusercontent.com/u/52502727?s=460&u=20d8fd7c0856631cbd5ba7c2876bb726a49cce02&v=4"
                                alt="Arthur Ramires"
                            />
                            <strong>Arthur Ramires</strong>
                            <span>
                                <FiClock />
                                08:00
                            </span>
                        </div>
                    </NextAppointment>
                </Schedule>
                <Calendar></Calendar>
            </Content>
        </Container>
    );
};

export default Dashboard;
