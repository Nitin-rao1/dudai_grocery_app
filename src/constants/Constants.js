import {Platform} from 'react-native';
export default {
  phoneRegExp:
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
  regexEmail: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  notSpace: /^$|.*\S+.*/,

  ssss: /^(.*)?\S+(.*)?$/,
  keyboards: Platform.OS == 'android' ? 'height' : 'padding',
  appName: 'R Rich Supermarket',
  provideDate:
    'Please enter your next available date to provide your Photo Identity Document?',
  date: 'dd/mm/yyyy',
  dateFormate: 'DD/MM/YYYY',
  dateFormateY: 'YYYY-MM-DD',
  pleaseWait: 'Please wait a moment and try again.',
  msgTypeDanger: 'danger',
  msgTypeWarning: 'warning',
  msgTypeInfo: 'info',
  msgTypeSuccess: 'success',
  imageNotFound:'https://static.thenounproject.com/png/4693713-200.png',
  policyURL:'https://www.westzone.com/',
  myFavouriteJson:['0mVOfAY09h','Lz1EUga0aX','Owj2z4xqOh','yslmllbx5p','H0iJQxizvK'],
  deleteAccountDes:'Your account has been deactivated by you. To restore your account, contact the administrator.'
};
