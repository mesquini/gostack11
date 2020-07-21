import React, { useEffect, useCallback, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useRoute, useNavigation } from '@react-navigation/native';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
} from './styles';

import { useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';
import { IProvider } from '../Dashboard';

interface IRouteParams {
  providerId: string;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();
  const { goBack } = useNavigation();
  const routesParams = route.params as IRouteParams;

  const [providers, setProviders] = useState<IProvider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(
    routesParams.providerId,
  );

  useEffect(() => {
    api.get('/providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <ProvidersListContainer
        data={providers}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(provider) => provider.id}
        renderItem={({ item: provider }) => (
          <ProviderContainer
            onPress={() => handleSelectProvider(provider.id)}
            selected={provider.id === selectedProvider}
          >
            <ProviderAvatar
              source={{
                uri:
                  provider.avatar_url ||
                  `https://api.adorable.io/avatars/180/${provider.name}`,
              }}
            />
            <ProviderName selected={provider.id === selectedProvider}>
              {provider.name}
            </ProviderName>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default CreateAppointment;
