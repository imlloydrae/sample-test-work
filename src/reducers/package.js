import TYPES from '../actions/type';

const initialState = {
  packagePlans: [],
};

export default packageReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case TYPES.LIST_PACKAGES_LOAD:
      return {
        ...state,
        packagePlans: [],
      };
    case TYPES.LIST_PACKAGES_OK:
      return {
        ...state,
        packagePlans: payload,
      };
    case TYPES.LIST_PACKAGES_FAILED:
      return {
        ...state,
        packagePlans: [],
      };
    case TYPES.INCREASE_API_COUNT:
      return {
        ...state,
        packagePlans: state.packagePlans.map(plan => {
          if (plan.package_id !== action.payload) {
            return plan;
          }

          return {
            ...plan,
            count: plan.count + 1,
          };
        }),
      };
    case TYPES.DECREASE_API_COUNT:
      return {
        ...state,
        packagePlans: state.packagePlans.map(plan => {
          if (plan.package_id !== action.payload) {
            return plan;
          }

          return {
            ...plan,
            count: plan.count > 0 ? plan.count - 1 : 0,
          };
        }),
      };
    default:
      return state;
  }
};
