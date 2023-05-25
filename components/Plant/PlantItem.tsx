import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Surface,
  Text,
  TouchableRipple,
  Menu,
  IconButton,
  Avatar,
} from 'react-native-paper';
import { BackendPlant } from '../../schemas/plants';
import { useDeletePlant } from '../../services/plants/mutations';
import { useNavigation } from '@react-navigation/native';
import { HomeDrawerScreenProps } from '../../navigation/types';

interface PlantItemProps {
  plant: BackendPlant;
}

export const PlantItem = ({ plant }: PlantItemProps) => {
  const navigation =
    useNavigation<HomeDrawerScreenProps<'Plants'>['navigation']>();
  const {
    id,
    name,
    light_min,
    light_max,
    temp_min,
    temp_max,
    soil_humidity_min,
    soil_humidity_max,
    air_humidity_min,
    air_humidity_max,
  } = plant;
  const [visible, setVisible] = React.useState(false);
  const { mutate: deletePlant, isError } = useDeletePlant();

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const renderMinMaxLabel = (
    label: string,
    min: string | number,
    max: string | number
  ) => (
    <Text>
      {label}: {min} - {max}
    </Text>
  );

  return (
    <TouchableRipple
      onPress={() =>
        navigation.navigate('PlantWizard', {
          screen: 'PlantStep1',
          params: {
            type: 'edit',
            plantId: id,
          },
        })
      }
      style={styles.container}
      borderless={true}
    >
      <Surface style={styles.item}>
        <Avatar.Image size={83} source={require('../../assets/icon.png')} />
        <View style={styles.itemInformation}>
          <Text variant="titleMedium">{name}</Text>
          {renderMinMaxLabel('Light', light_min, light_max)}
          {renderMinMaxLabel('Temperature', temp_min, temp_max)}
          {renderMinMaxLabel(
            'Soil humidity',
            soil_humidity_min,
            soil_humidity_max
          )}
          {renderMinMaxLabel(
            'Air humidity',
            air_humidity_min,
            air_humidity_max
          )}
        </View>
        <View style={styles.itemActions}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
            anchorPosition="bottom"
          >
            <Menu.Item
              onPress={() => deletePlant(id)}
              title="Delete"
              leadingIcon="delete"
            />
          </Menu>
        </View>
      </Surface>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    borderRadius: 12,
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemInformation: {
    marginLeft: 16,
  },
  itemActions: {
    alignSelf: 'flex-start',
    marginLeft: 'auto',
    justifyContent: 'space-between',
  },
});
