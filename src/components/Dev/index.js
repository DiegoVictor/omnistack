import React, { useCallback } from 'react';
import { Marker, Callout } from 'react-native-maps';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import { Avatar, User, Name, Bio, Techs } from './styles';

function Dev({ dev, navigation }) {
  const handleCalloutPress = useCallback(() => {
    navigation.navigate('Profile', { github_username: dev.github_username });
  }, []);

  return (
    <Marker
      coordinate={{
        latitude: dev.location.coordinates[1],
        longitude: dev.location.coordinates[0],
      }}
    >
      <Avatar
        source={{
          uri: dev.avatar_url,
        }}
      />
      <Callout onPress={handleCalloutPress}>
        <User>
          <Name>{dev.name}</Name>
          <Bio>{dev.bio}</Bio>
          <Techs>{dev.techs.join(', ')}</Techs>
        </User>
      </Callout>
    </Marker>
  );
}

Dev.propTypes = {
  dev: PropTypes.shape({
    github_username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    techs: PropTypes.arrayOf(PropTypes.string).isRequired,
    avatar_url: PropTypes.string.isRequired,
    location: PropTypes.shape({
      coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(Dev);