import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Surface,
  Text,
  TouchableRipple,
  Menu,
  IconButton,
} from 'react-native-paper';
import { BackendPlant } from '../../schemas/plants';
import { useDeletePlant } from '../../services/plants/mutations';
import { useNavigation } from '@react-navigation/native';

interface PlantItemProps {
  plant: BackendPlant;
}

export const PlantItem = ({ plant }: PlantItemProps) => {
  const navigation = useNavigation();
  const { id, name } = plant;
  const [visible, setVisible] = React.useState(false);
  const { mutate: deletePlant } = useDeletePlant();

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <TouchableRipple
      onPress={() =>
        navigation.navigate('EditPlant', {
          plantId: id,
        })
      }
      style={styles.container}
      borderless={true}
    >
      <Surface mode="flat" style={styles.item}>
        <Text>{name}</Text>
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
      </Surface>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  item: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
