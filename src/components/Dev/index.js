import React, { useCallback } from 'react';
import { Marker, Callout } from 'react-native-maps';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import { Avatar, User, Name, Bio, Techs } from './styles';

export function Dev({ dev, navigation, ...props }) {
  const handleCalloutPress = useCallback(() => {
    navigation.navigate('Profile', { githubUsername: dev.github_username });
  }, []);

  return (
    <Marker
      coordinate={{
        latitude: dev.location.coordinates[1],
        longitude: dev.location.coordinates[0],
      }}
      {...props}
    >
      <Avatar
        testID="avatar"
        source={{
          uri: dev.avatar_url,
        }}
      />
      <Callout onPress={handleCalloutPress} testID="profile">
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
    name: PropTypes.string,
    bio: PropTypes.string,
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

Dev.defaulProp = {
  dev: {
    name: '',
    bio: '',
  },
};

export default withNavigation(Dev);
