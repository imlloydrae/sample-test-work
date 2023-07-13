import {sha1} from 'react-native-sha1';
import CONFIG from './payment.config';
import {CommonActions} from '@react-navigation/native';

export const getEncodingDetails = msg => {
  let message = msg;
  let isGSM = true;
  let singleMax = 160;
  let concatMax = 153;
  let totalSegment = 0;

  let gsm7BitCharacters =
    '\\@£$¥èéùìòÇ\nØø\rÅå?_?????????ÆæßÉ !"#¤%&\'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà^{}[~]|€';
  let messageLength = message.length;

  for (let i = 0; i < messageLength; i++) {
    if (gsm7BitCharacters.indexOf(message[i]) == -1 && message[i] != '\\') {
      isGSM = false;
    }
  }

  if (isGSM == false) {
    singleMax = 70;
    concatMax = 67;
  }

  if (messageLength <= singleMax) {
    totalSegment = 1;
  } else {
    totalSegment = Math.ceil(messageLength / concatMax);
  }

  let data = {
    isGSM: isGSM,
    singleMax: singleMax,
    concatMax: concatMax,
    totalSegment: totalSegment,
    messageLength: messageLength,
    maxLimit: 9,
  };

  return data;
};

export const generatePaymentSecureHash = async (amount, orderRef) => {
  let buffer = `${CONFIG.MERCHANT_ID}|${orderRef}|${CONFIG.CURRENCY_CODE}|${amount}|${CONFIG.PAYMENT_TYPE}|${CONFIG.SECRET_KEY}`;
  let key = '';

  key = await sha1(buffer).then(hash => {
    return hash;
  });

  return key;
};

export const generatePaymentUrl = async (amount, orderRef) => {
  let data = {
    merchantId: CONFIG.MERCHANT_ID,
    amount: amount,
    orderRef: orderRef,
    currCode: CONFIG.CURRENCY_CODE,
    successUrl: CONFIG.SUCCESS_URL,
    failUrl: CONFIG.FAILED_URL,
    cancelUrl: CONFIG.CANCEL_URL,
    payType: CONFIG.PAYMENT_TYPE,
    lang: 'E',
    mpsMode: CONFIG.MPS_MODE,
    payMethod: CONFIG.PAYMENT_METHOD,
    secureHash: await generatePaymentSecureHash(amount, orderRef),
  };

  let formData = Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
  let url = `https://www.pesopay.com/b2c2/eng/payment/payForm.jsp?${formData}`;

  return url;
};

export const resetScreenState = (navigation, routeName) => {
  navigation.dispatch(state => {
    const routes = state.routes.filter(r => r.name !== routeName);

    routes.push({
      name: routeName,
    });

    return CommonActions.reset({
      ...state,
      routes,
      index: routes.length - 1,
    });
  });
};

export const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return '0 MB';

  const k = 1024;
  const totalMB = bytes / k ** 2;

  return parseFloat(totalMB).toFixed(decimals);
};

export const textLimiter = string => {
  let text = string.split('.');
  let name = text[0].substring(0, 10);
  let type = text[1];

  return `${name}${text[0].length > 10 ? '...' : ''}.${type}`;
};

export const stringLimiter = string => {
  let name = string.substring(0, 20);

  return `${name}${string.length > 20 ? '...' : ''}`;
};

export const obfuscateText = (type, text) => {
  if (text != undefined) {
    if (type == 1) {
      //number
      return text.substr(text.length - 4);
    } else {
      // email
      const [name, domain] = text.split('@');
      return `${name[0]}${new Array(name.length).join('*')}@${domain}`;
    }
  }
};
