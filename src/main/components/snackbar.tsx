import Snackbar from 'react-native-snackbar';

const BottomSnackbar = {

  successSnackbar: (msg: string, duration?: number) => {
    setTimeout(() => {
      Snackbar.show({
        text: msg,
        duration: duration ? duration : 5000,
        backgroundColor: '#3F51B5',
        textColor: '#FFFFFF',
        numberOfLines: 5,
        action: {
          text: 'Dismiss',
          textColor: '#CCCCCC',
          onPress: () => { },
        },
      });
    }, 500)

  },

  errorSnackbar: (msg: string, duration?: number) => {
    setTimeout(() => {
      Snackbar.show({
        text: msg,
        duration: duration ? duration : 5000,
        backgroundColor: '#FAEBEB',
        textColor: '#CE4141',
        numberOfLines: 5,
        action: {
          text: 'Dismiss',
          textColor: '#8898AD',
          onPress: () => { },
        },
      });
    }, 500)

  },

}

export default BottomSnackbar;
