import { StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Surface,
  Text,
  Avatar,
  useTheme,
  TouchableRipple,
} from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { HomeDrawerScreenProps } from 'navigation/types';
import { getImageUrl } from 'services/get-image-url';
import { usePlantsAssignedToDevice } from 'services/plants/queries';
import { DEFAULT_IMAGES } from 'constants/default-images';
import { useDefaultImages } from '../../hooks/use-default-images';

export const GrowBoxAssignedPlant = () => {
  const { t } = useTranslation();
  const {
    colors: { secondary, secondaryContainer, surfaceVariant },
  } = useTheme();
  const navigation =
    useNavigation<HomeDrawerScreenProps<'Home'>['navigation']>();
  const {
    data: assignedPlants,
    isLoading,
    isError,
  } = usePlantsAssignedToDevice();
  const assignedPlant = assignedPlants?.[0];
  const image = assignedPlant?.attached_image_url ?? assignedPlant?.image_url;
  const { plantURISource } = useDefaultImages();

  const renderActivePlantName = (): string => {
    return assignedPlant?.name ?? t('no_plants_assigned');
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isError) {
    return (
      <Surface>
        <Text variant="bodyLarge">{t('fetching_assigned_plants_error')}</Text>
      </Surface>
    );
  }

  return (
    <TouchableRipple
      borderless={true}
      onPress={() => {
        navigation.navigate('Plants', {
          tab: 'assigned',
        });
      }}
      style={styles.container}
    >
      <Surface
        mode="flat"
        style={[
          styles.assignedPlant,
          {
            backgroundColor: assignedPlant
              ? secondaryContainer
              : surfaceVariant,
          },
        ]}
      >
        {assignedPlant && image && (
          <View style={styles.imageContainer}>
            <Avatar.Image
              size={60}
              source={getImageUrl(image, plantURISource)}
            />
          </View>
        )}
        <View>
          <Text style={{ color: secondary }}>{t('active_plant')}</Text>
          <Text variant="titleMedium">{renderActivePlantName()}</Text>
        </View>
      </Surface>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginTop: 10,
  },
  assignedPlant: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  imageContainer: {
    marginRight: 16,
  },
});
