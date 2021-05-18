import Vue from 'vue'
import Vuex from 'vuex'
if(process.env.NODE_ENV === "development"){
    Vue.use(Vuex) 
} 

import command from "@/store/modules/command";
import menu from "@/store/modules/menu";
import permission from "@/store/modules/permission";

export default new Vuex.Store({
    modules: {
        command,
        menu,
        permission
    }
});

