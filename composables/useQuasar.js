import { Notify } from 'quasar';

export const ShowSnack = (message, type) => {
  Notify.create({
    message: message,
    type: type
  });
};

