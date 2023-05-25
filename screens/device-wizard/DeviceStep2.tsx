import { StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { Button } from 'react-native-paper';

import { Layout } from 'components/Layout';
import { ImageSelector } from 'components/ImageSelector';
import { TextField } from 'components/TextField';

export const DeviceStep2 = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: '',
    },
  });

  return (
    <Layout style={styles.container}>
      <ImageSelector />
      <TextField
        style={styles.field}
        mode="outlined"
        control={control}
        name="name"
        label="Name"
      />
      <Button mode="contained">Add</Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  field: {
    marginTop: 16,
  },
});
