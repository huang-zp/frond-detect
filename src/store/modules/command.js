

const command = {
  state: {
     results:[]
  },
  getters:{
      results: state => state.results
  },
  mutations: {
    SET_RESULTS : (state, result) => {
       state.results.unshift(result);
    }
  },
  actions: {

  }
}

export default command
