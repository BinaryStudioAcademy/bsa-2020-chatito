interface actionIS {
  type:string;
}

export default (state = {}, action:actionIS) => {
  switch (action.type) {
    default:
      return state;
  }
};
