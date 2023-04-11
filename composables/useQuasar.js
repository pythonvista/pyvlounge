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
      success()
    })
    .onOk(() => {
      // console.log('>>>> second OK catcher')
      console.log('working om 2');
    })
    .onCancel(() => {
      ShowSnack("Process Aborted", 'negative')
    })
    .onDismiss(() => {
    });
};
