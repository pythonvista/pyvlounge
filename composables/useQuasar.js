import {
  Dialog,
  Notify,
} from 'quasar';

export const ShowSnack = (message, type) => {
  Notify.create({
    message: message,
    type: type,
  });
};

export const ShowPrompt = (message, success) => {
  Dialog.create({
    title: 'Confirm Delete',
    message: `Would you like to delete ${message} `,
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      success();
    })
    .onOk(() => {
      // console.log('>>>> second OK catcher')
      console.log('working om 2');
    })
    .onCancel(() => {
      ShowSnack('Process Aborted', 'negative');
    })
    .onDismiss(() => {});
};

export const OpenPrompt = (message, type, success) => {
  Dialog.create({
    title: 'Prompt',
    message: message,
    prompt: {
      model: '',
      type: 'text', // optional
    },
    cancel: true,
    persistent: true,
  })
    .onOk((data) => {
      console.log(data)
      success(data, type)
      // console.log('>>>> OK, received', data)
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
      ShowSnack('Process Aborted', 'negative');

    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};
