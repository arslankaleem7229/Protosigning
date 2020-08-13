import { auth, db } from '@/services/firebase'
import uuid from 'uuid'
import { stat } from 'fs'
export const state = () => ({
    DASHBOARD: {
        new_tab_popup_open: {
            state: false,
            coords: {x: 0, y: 0}
        },
        left_side_state: null,
        item_info_props: {
            title: "Title (coming from store...)",
        }
    },
    WORKSPACE: {
        pages: [],
        active_page: {
            i: 0,
            fb: 0
        },
        hidden: {
            left_nav: false,
            right_nav: false,
            top_navigation: false
        },
        project_key: null,
        loading: false
    },
})

export const mutations = {
    DASHBOARD_new_tab_popup_state: (state, mystate) => {
        state.DASHBOARD.new_tab_popup_open.state = mystate
    },
    DASHBOARD_new_tab_popup_coords: (state, mycoords) => {
        state.DASHBOARD.new_tab_popup_open.coords = mycoords
    },
    DASHBOARD_left_side_state: (state, menu_item) => {
        state.DASHBOARD.left_side_state = menu_item
    },
    CHANGE_ITEM_INFO_STATE: (state, payload) => {
        state.DASHBOARD.item_info_props = payload
    },
    $w_new_page: (state, payload) => {
        !state.WORKSPACE.loading ? state.WORKSPACE.pages.push(payload) : ""
    },
    $w_active_page: (state, payload) => {
        state.WORKSPACE.active_page = payload
    },
    $w_update_page: (state, { nodes, raw, title } ) => {
        let active = state.WORKSPACE.active_page.i
        state.WORKSPACE.pages[active] = { nodes, raw, title }
        // console.log(state.WORKSPACE.pages[active], active, 'HELLO THERE')
        // state.WORKSPACE.pages[active].nodes = nodes
        // state.WORKSPACE.pages[active].raw = raw
    },
    $pages: (state, payload) => {
        state.WORKSPACE.pages = payload
    },
    $project_key: (state, payload) => {
        state.WORKSPACE.project_key = payload
    },
    $loading: (state, bool) => {
        state.WORKSPACE.loading = bool
    },

    WORKSPACE_preview: (state, payload) => {
        state.WORKSPACE.hidden.left_nav = 
        state.WORKSPACE.hidden.right_nav = 
        state.WORKSPACE.hidden.top_navigation = payload
    }
}
export const getters = {
    DASHBOARD_new_tab_popup_state: (state) => {
        return state.DASHBOARD.new_tab_popup_open.state
    },
    DASHBOARD_new_tab_popup_coords: (state) => {
        return state.DASHBOARD.new_tab_popup_open.coords
    },
    DASHBOARD_left_side_state: (state) => {
        return state.DASHBOARD.left_side_state
    },
    $w_pages: (state) => {
        return state.WORKSPACE.pages
    },
    $w_active_page: (state) => {
        return state.WORKSPACE.active_page
    },
    $w_project_key: (state) => {
        return state.WORKSPACE.project_key
    }
}

export const actions = {
    update_page({commit}, {nodes, raw}) {
        commit("$w_update_page", { nodes, raw })

    },
    DASHBOARD_ITEM_INFO({commit}, payload) {
        console.log(payload, 'changing.state....')
        commit('CHANGE_ITEM_INFO_STATE', payload)
    },
    DASHBOARD_change_new_popup_state({commit}, mystate) {
        commit("DASHBOARD_new_tab_popup_state", mystate)
    },
    DASHBOARD_change_new_popup_coords({commit}, coords) {
        commit("DASHBOARD_new_tab_popup_coords", coords)
    },
    DASHBOARD_update_left_side_state({commit}, menu_item) {
        commit("DASHBOARD_left_side_state", menu_item)
    },
    WORKSPACE_insert_blank_page({ commit }, workspace_data) {
        commit("WORKSPACE_insert_blank_page", workspace_data)
    },



    async $w_new_page({ commit }, payload) {
        let { data, key, uid } = payload
        let { title, workspace } = data
        let nodes = $get_children(workspace)
        let default_text = "<div id='navigation-container'></div><div id='header-container'></div><p component='true' class='col-md-12 text-center mt-5 small'>This Page is Empty - page-id <b>"+uuid()+"</b></p>"
        try {
            db.ref('projects/web/'+uid+'/'+key+"/pages").push({ title, raw_1: default_text })
            .then((ev) => 
            {
                commit("$w_new_page", { title, nodes, raw: default_text, key: ev.key })
            })
            .catch((error) => { console.log( error)})
        } 
        catch(err) {
            console.log(err, 'new project creation error')
        }
    },
    async $w_active_page( { commit }, payload) {
        try {
            await commit('$w_active_page', payload)
        } catch(err) {
            console.log(err)
        }
    },
    $w_update_page( { commit }, { workspace, active, key, uid, db_data }) {
        if(active.fb === 0) return

        let nodes = $get_children(workspace)
        console.log(nodes, 'nodes.')
        try {
            db.ref("projects/web/"+uid+"/"+key+"/pages/"+active.fb).set(db_data)
            .then(() => {
                console.log(db_data, 'db-data')
                commit("$w_update_page", { nodes, raw: db_data.raw, title: "TEST" })
            })    
        }
        catch(err) {
            console.log('err')
        }        
    },
    async $pages({ commit }, {key, uid}) {
        try {
            commit("$loading", true)
            commit("$project_key", key)
            await db.ref("projects/web/"+uid+"/"+key+"/pages").once('value')
            .then((data) =>
            {
                const obj = data.val()
                let pages = []
                for(let key in obj) {
                    pages.push({...obj[key], key})
                }
                console.log(pages, 'pages')
                commit('$pages', pages)
                commit("$loading", false)
            })
            .catch((error) =>{ console.log(error) })
        }
        catch(err) {
            console.log(err)
        }
    },




    WORKSPACE_rename_page({ commit }, payload) {
        commit('WORKSPACE_rename_page', payload)
    },
    WORKSPACE_update_page_data({commit}, payload) {
        commit('WORKSPACE_update_page_data', payload)
    },
    WORKSPACE_remove_page({commit}, index) {
        commit('WORKSPACE_remove_page', index)
    },
    WORKSPACE_preview({commit}, payload) {
        console.log('preview started')
        commit('WORKSPACE_preview', payload)
    }
}