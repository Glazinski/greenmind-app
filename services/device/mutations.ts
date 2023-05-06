import { useMutation } from '@tanstack/react-query';

import axios from 'axios';

export const useDeviceWater = () =>
  useMutation({
    mutationFn: (newTask) =>
      axios.post('http://growbox.atthost24.pl/tasks', {
        device: 1,
        task_number: 0,
        status: 0,
      }),
  });
