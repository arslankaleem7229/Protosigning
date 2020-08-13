import { auth, db, storage } from '@/services/firebase'
import Cookie from 'js-cookie'

export const state = () => ({
    message: null,
    uid: null,
    info: null
})

export const mutations = {
    message: (state, msg) => {
        state.message = msg
    },
    uid: (state, uid) => {
        state.uid = uid
    },
    info: (state, info) => {
        state.info = info
    }
}
export const getters = {
}

export const actions = {
    get_test() {
        try {
            let ref = storage.ref("prototypes/abcd.txt")
            ref.getDownloadURL().then(function(url) {
                console.log(url)
                var rawFile = new XMLHttpRequest();
                rawFile.open("GET", url, false);
                rawFile.onreadystatechange = function ()
                {
                    if(rawFile.readyState === 4)
                    {
                        if(rawFile.status === 200 || rawFile.status == 0)
                        {
                            var allText = rawFile.responseText;
                            alert(allText);
                        }
                    }
                }
                rawFile.send(null);

              }).catch(function(error) { })
        }catch(err) {

        }
    },
    insert_test({commit}, { file, result}) {
        try {
            console.log(file.type, result)
            storage.ref("prototypes/"+file.name).put(file).then(function(snapshot) {
                console.log('uploaded a blob', snapshot)
            })
        } catch(err) {
            console.log(err)
        }
    },
    async info({ commit }, uid) {
        try {
            await db.ref('users/'+uid).once('value')
            .then((data) =>
            {
                const obj = data.val()
                let user_info = null
                for(let key in obj) {
                    user_info = {
                        uname: obj[key]["uname"],
                        email: obj[key]["email"],
                        password: obj[key]["password"]
                    }
                }
                commit("info", user_info)
            })
            .catch((error) =>{ console.log(error) })

        } catch(err) {
            console.log("info err: ", err)
        }
    },
    async signup({ commit, dispatch, rootState }, { uname, email, password }) {
        try {            
            commit("message", "")
            await auth.createUserWithEmailAndPassword(email, password).then(user => {
                db.ref("users/"+user.user.uid).push({
                    uname, email, password
                })
                .then(() => 
                {
                    commit("message", "")
                    // dispatch('user/signin', { email, password } , { root: true })
                })
                .catch((error) => { 
                })
            })
        } catch(err) {
            commit("message", err.message)
            console.log('signup failed: ', err)
        }
    },
    async signin({commit}, {email, password}) {
        try {
            commit("message", "")
            await auth.signInWithEmailAndPassword(email, password)
            const token = await auth.currentUser.getIdToken()
            Cookie.set('access_token', token)
            commit("uid", auth.currentUser.uid)
        }
        catch(err) {
            commit("message", err.code)
        }
    },
    signupWithGoogle() {

    },
    signupWithFacebook() {
    }
}