import TYPES from '../actions/type';

const initialState = {
  senderIds: [],
  smsParts: 0,
  smsLength: 0,
  errors: {},
  campaignForm: {
    campaign_name: '',
    sms_type: 'sms-blast',
    campaign_message: '',
    campaign_status: 'ongoing',
    schedule: '',
    custom_no: '',
    directory_id: 0,
    directory_name: '',
    apicode_id: 0,
    apicode_name: '',
    senderid_id: 0,
    senderid_name: '',
  },
};

export default campaignFormReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case TYPES.RESET_CAMPAIGN_FORM:
      return {
        ...state,
        senderIds: [],
        smsParts: 0,
        smsLength: 0,
        errors: {},
        campaignForm: {
          campaign_name: '',
          sms_type: 'sms-blast',
          campaign_message: '',
          campaign_status: 'ongoing',
          schedule: '',
          custom_no: '',
          directory_id: 0,
          directory_name: '',
          apicode_id: 0,
          apicode_name: '',
          senderid_id: 0,
          senderid_name: '',
        },
      };
    case TYPES.UPDATE_CAMPAIGN_FORM:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
