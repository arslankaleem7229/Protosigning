function login_form() {
    let overlay = $("<div>"),
        container = $("<div>"),
        login = $("<button>"),
        login_container = $("<div>"),
        signup = $("<button>"),
        close = $("<button>"),
        username = $("<input type='text'>"),
        password = $("<input type = 'password'>")
    
    close.addClass("btn btn-block text-right mb-4 pl-0 pr-0")
    close.html("<span class='material-icons'>clear</span>")
    username.addClass("w-100 p-2 pl-4 pr-4 bd-round border bg-light mb-4")
    username.attr("placeholder", "Username")
    password.addClass("w-100 p-2 pl-4 pr-4 bd-round border bg-light mb-4")
    password.attr("placeholder", "Password")
    signup.addClass("btn btn-hov pl-4 pr-4 text-primary mr-2 bd-round")
    signup.html("Signup Instead")
    login.addClass("btn pl-4 pr-4 btn-primary box-shadow bd-round")
    login.html("Login")
    overlay.css({
        position: "fixed",
        left: "0px", top: "0px",
        width: "100%", height: "100%",
        background: "rgba(0,0,0,0.75)"
    })
    login_container.append(login)
    container.addClass("container w-50 m-auto bg-white box-shadow bd-radius-5 p-3 animate__animated  animate__zoomIn animate__faster")
    overlay.addClass("d-flex align-items-center justify-content-center flex-wrap animate__animated  animate__fadeIn animate__faster")

    login_container.addClass("w-100 text-right mt-3 mb-3")

    container.append(close, username, password, login_container)
    overlay.append(container)
    $("body").append(overlay)
    close.click(() => overlay.remove())

    return {
        login, signup, username, password, overlay
    }
}
function signup_form() {
    let overlay = $("<div>"),
        container = $("<div>"),
        login = $("<button>"),
        login_container = $("<div>"),
        signup = $("<button>"),
        close = $("<button>"),
        username = $("<input type='text'>"),
        password = $("<input type = 'password'>")
    
    close.addClass("btn btn-block text-right mb-4 pl-0 pr-0")
    close.html("<span class='material-icons'>clear</span>")
    username.addClass("w-100 p-2 pl-4 pr-4 bd-round border bg-light mb-4")
    username.attr("placeholder", "Username")
    password.addClass("w-100 p-2 pl-4 pr-4 bd-round border bg-light mb-4")
    password.attr("placeholder", "Password")
    login.addClass("btn btn-hov pl-4 pr-4 text-primary mr-2 bd-round")
    signup.html("Signup")
    signup.addClass("btn pl-4 pr-4 btn-primary box-shadow bd-round")
    login.html("Login Instead")
    overlay.css({
        position: "fixed",
        left: "0px", top: "0px",
        width: "100%", height: "100%",
        background: "rgba(0,0,0,0.75)"
    })
    login_container.append(signup)
    container.addClass("container w-50 bg-white box-shadow bd-radius-5 p-3")
    overlay.addClass("d-flex align-items-center justify-content-center flex-wrap")

    login_container.addClass("w-100 text-right mt-3 mb-3")

    container.append(close, username, password, login_container)
    overlay.append(container)
    $("body").append(overlay)
    close.click(() => overlay.remove())

    return {
        login, signup, username, password, overlay
    }
}
function dropdown(list, e) {
    let container = $("<div>"),
        timeout = null,
        buttons = []
    container.addClass("bg-white box-shadow pt-2 pb-2 animate__animated  animate__fadeIn animate__faster bd-radius-5")
    container.css({
        width: "250px",
        position:"absolute",
        left: "0px",
        top: "0px",
        zIndex: 10000
    })
    for(let i=0; i<list.length; i++) {
        let button = $("<a>")
            href = null

        button.addClass("btn btn-hov text-sm text-left pl-3 pr-2 btn-block animate__animated  animate__fadeInUp animate__faster d-flex justify-content-between")
        
        list[i].href ? button.attr("href", list[i].href) : button.attr("href", "javascript:void(0)")

        if(list[i].list) {
            button.html(`<span class='dropdown-btn'>${list[i].title}</span><span class="material-icons dropdown-btn">arrow_right</span>`)
        } else {
            button.html(list[i].title)
        }
        container.append(button)
        buttons.push(button)
    }
    container.mouseleave(() => {
        timeout = setTimeout(() => {
            container.remove()
        }, 500);
    })
    container.mouseenter(() => clearTimeout(timeout))
    $(window).click((e) => {
        if(e.target.parentNode != container[0] && !$(e.target).hasClass('dropdown-btn') && e.target !== container[0]) {
            container.remove()
        }
    })

    $(window).resize(() => container.remove())
    let top = $(e.currentTarget).offset().top,
        left = $(e.currentTarget).offset().left,
        w = $(window).width(),
        h = $(window).height(),
        w_ = $(container).width(),
        h_ = $(container).height()
    
    
    if(top+h_ > h) {
        // container.css({
        //     top: (h - h_ - 10) + 'px'
        // })
        container.css({
            top: (top + 10) + 'px'
        })
    } 
    else {
        container.css({
            top: (top + 10) + 'px'
        })
    }
    if(left+w_ > w) {
        container.css({
            left: (w - w_ - 10) + 'px'
        })
    } else {
        container.css({
            left: (left) + 'px'
        })
    }
    
    $("body").append(container)

    return buttons
}   
function alertmsg(msg, color="primary") {
    let button = $("<button>")

    button.addClass('btn bg-dark-2 bd-round box-shadow pl-4 pr-4 pt-2 pb-2 text-sm animate__animated  animate__fadeInUp animate__faster d-flex align-items-center')
    button.css({
        position: "fixed",
        bottom: "25px", left: "25px"
    })
    button.html(`<span class='material-icons mr-2 text-${color}'>info</span><span class="text-${color}">${msg}</span>`)
    $("body").append(button)

    setTimeout(() => {
        button.removeClass("animate__fadeInUp").addClass("animate__zoomOut")
        setTimeout(() => {
            button.remove()            
        }, 500);
    }, 2000);
}