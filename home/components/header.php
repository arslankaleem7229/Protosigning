<head>
    <style>
        @media only screen and (max-width: 1170px) {
            #header #header-nav, #header .logo-name {
                display: none !important;
            }
            #header .logo {
                display: none;
            }
            #header .logo-text {
                display: block !important;
            }
            #header {
                position: fixed !important;
                top: 0px;
            }
            body {
                margin-top: 100px !important;
            }
            #header .menu {
                display: inline-block !important;
                color: white !important;
            }
            #header {
                background: #212121;  
                padding-top: 1rem;
                padding-bottom: 0.65rem;    
                z-index: 10000;
            }
        }
    </style>
</head>
<div class="container-fluid pt-2 pl-0 pr-0" id="header">
    <div class="container">
        <div class="d-flex justify-content-between align-items-center p-2 mb-4">
            <a :href="DOMAIN" class="btn text-center btn-hov logo">
                <span class="text-primary text-xl bd-bottom font-weight-bold">PROTO</span><br>
                <span class="text-lg ls-1">SIGNING</span>
            </a>
            <div class="logo-name d-flex">
                <button @click="login_func()" class="btn d-flex align-items-center btn-hov">
                    <span class="material-icons text-lg pr-2 text-primary">person</span>
                    <span>Login</span>
                </button>
                <button @click="signup_func()" class="btn btn-hov">
                    <span>Signup</span>
                </button>
            </div>
            <a href="./home.php" class="btn text-white ls-1 d-none logo-text">Dish Satellite Information</a>
            <button @click="clicked(links, $event)" class="btn material-icons menu d-none text-md font-weight-normal btn-hov dropdown-btn" id="menu-btn">menu</button>
        </div>
        <div class="links w-100 text-center transition" id="header-nav">
            <div>
                <a :href="item.list ? 'javascript:void(0)' : item.href" class="btn btn-hov pt-4 pb-4 pl-3 pr-3 dropdown-btn bd-radius-0" v-for="(item, i) in links" @click="clicked(item.list, $event)">
                    <span class="d-flex align-items-center dropdown-btn">
                        <span class="dropdown-btn" v-html="item.title"></span>
                        <span v-if="item.list" class="material-icons ml-1 text-md dropdown-btn">arrow_drop_down</span>
                    </span>
                </a>
            </div>
        </div>
    </div>
    <hr>
</div>

<script src="../js/widgets.js"></script>
<script src="../js/config.js"></script>
<script>
var v_header = new Vue({
    el: "#header",
    data: {
        links: [
            { title: "<span class='text-danger font-weight-bold'>Logo Maker</span>", value: "LOGO_MAKER", href: DOMAIN + "/pages/logo-maker.php"},
            { title: "<span class='text-warning font-weight-bold'>PNG To SVG</span>", value: "PNG_TO_SVG", href: DOMAIN + "/image-extractor-tool"},
            { title: "Design", value:"DESIGN", list: [
                { title: "Design A Logo", value: "DESIGN_A_LOGO" },
                { title: "Design A Book Cover", value: "DESIGN_A_BOOK_COVER" },
                { title: "Design An Album Art", value: "DESIGN_AN_ALBUM_ART" },
                { title: "Design A FLYER", value: "DESIGN_A_FLYER" },
            ]},
            { title: "Prototyping", value:"PROTOTYPING", list: [
                { title: "Simple Prototypes", value: "SIMPLE_PROTOTYPES" },
                { title: "Portfolio Prototypes", value: "PORTFOLIO_PROTOTYPES" }
            ]},
            { title: "About", value: "ABOUT", href: ""},
            { title: "Contact", value: "CONTACT", href: ""},
        ]
    },
    methods: {
        login_func() {
            let { login, signup, username, password, overlay } = login_form()
            login.click(() => {
                if(!username.val()) {
                    alertmsg("Username is Missing", "danger")
                    return
                } 
                else if(!password.val()) {
                    alertmsg("Password is Missing", "danger")
                    return
                }
                axios.post(DOMAIN+`/api/login.php?username=${username.val()}&password=${password.val()}`)
                .then(res => {
                    console.log(res, 'ress')
                    switch(res.data) {
                        case 0:
                            alertmsg("Signin Successfully", "success")
                            setTimeout(() => {
                                window.location.href = `./home.php?u=${username.val()}&p=${password.val()}`                            
                            }, 1000);
                            break
                        case 1:
                            alertmsg("Invalid Username or password", "danger")
                            break
                        case -1:
                            alertmsg("An Unknown Error Occured, try again", "danger")
                            break
                    }
                })

            })
        },
        signup_func() {
            let { signup, username, password, overlay } = signup_form()
            signup.click(() => {
                if(!username.val()) {
                    alertmsg("Username is Missing", "danger")
                    return
                } 
                else if(!password.val()) {
                    alertmsg("Password is Missing", "danger")
                    return
                }
                axios.post(DOMAIN+`/api/signup.php?username=${username.val()}&password=${password.val()}`)
                .then(res => {
                    switch(res.data) {
                        case -1:
                            alertmsg("User Already Exists", "danger")
                            break
                        case 0:
                            alertmsg("Signin Successfully", "success")
                            setTimeout(() => {
                                window.location.href = `./home.php?u=${username.val()}&p=${password.val()}`                            
                            }, 1000);
                            break
                        case -1:
                            alertmsg("An Unknown Error Occured, try again", "danger")
                            break
                    }
                })

            })
        },
        clicked(item, e) {
            if(item) {
                let buttons = dropdown(item, e),
                    nested_buttons = null

                for(let i=0; i<buttons.length; i++) {
                    buttons[i].click((ev) => {
                        switch(item[i].value) {
                            case "RECEIVER_SOFTWARE":
                                if(item[i].list) {
                                    buttons[i].addClass("dropdown-btn")
                                    nested_buttons = dropdown(item[i].list, ev)
                                }
                        }
                    })
                }
            }
        }
    },
    mounted() {
    },
})
$(document).ready(function(){     

})

</script>