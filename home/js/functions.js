function gallery(preview, list) {
    let p = new Image(),
        img_container = $("<div>"),
        overlay = $("<div>"),
        container = $("<div>"),
        close = $("<button>")
    p.src = preview

    $(p).attr("width", "100%")    
    $(p).addClass("box-shadow bd-radius-5")
    img_container.append(p)
    container.append(img_container)
    p.onload = function() {
        for(let i=0; i<list.length; i++) {
            let img = new Image()
            img.src = list[i]
            img.onload = function() {
                $(img).attr("width", "120px")
                $(img).addClass("mr-2 mb-2 box-shadow bd-radius-5 animate__animated  animate__zoomIn")
                container.append(img)

                if(img.src == p.src) {
                    $(img).addClass("border-blue p-1")
                }

                $(img).click(() => {
                    overlay.remove()
                    gallery(img.src, list)
                })
            }
        }
        
    }
    overlay.css({
        position: "fixed",
        top: "0px",
        left: "0px",
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0, 0.85)",
        zIndex: 10000,
        overflow: "auto",
        padding: "2rem"
    })
    img_container.css({
        width: "100%",
        maxHeight: "720px",
        overflow: "auto"
    })

    close.addClass("btn text-white bg-dark material-icons text-md bd-round")
    close.css({
        top: "15px",
        right: "15px",
        position: "absolute",
        zIndex: 100000
    })
    close.html("clear")
    
    close.click(() => {
        $("body").css("overflow", "auto")
        overlay.remove()
    })
    overlay.click(() => {
        $("body").css("overflow", "auto")
        overlay.remove()
    })
    
    img_container.addClass("mb-4 animate__animated  animate__zoomIn animate__faster")
    container.addClass("w-100 d-flex justify-content-center flex-wrap align-items-center")    

    overlay.append(close)
    overlay.append(container)
    overlay.addClass("d-flex align-items-center justify-content-center flex-wrap")
    $("body").append(overlay)
    $("body").css("overflow", "hidden")


}
function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
  }
function timestamp(datetime) {
    let obj = {}
    if(!datetime) {
        datetime = new Date()
        obj = {
            year: datetime.getFullYear(),
            month: datetime.getMonth() + 1,
            day: datetime.getDate(),
            hour: datetime.getHours(),
            min: datetime.getMinutes(),
            sec: datetime.getSeconds()
        }
    }
    else {
        datetime = datetime.split(" ")
        let date = datetime[0].split("-"),
            time = datetime[1].split(":")
        obj = {
            year: parseInt(date[0]),
            month: parseInt(date[1]),
            day: parseInt(date[2]),
            hour: parseInt(time[0]),
            min: parseInt(time[1]),
            sec: parseInt(time[2])
        }
    }
    return new Date(obj.year, obj.month, obj.day, obj.hour, obj.min, obj.sec, 00)
}
function timeDifference(previous) {
    let current = timestamp()
    
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    
    var elapsed = current - previous;
    
    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }
    
    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }
    
    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
         return Math.round(elapsed/msPerDay) + ' days ago';   
    }
    
    else if (elapsed < msPerYear) {
         return Math.round(elapsed/msPerMonth) + ' months ago';   
    }
    
    else {
         return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}

function date() {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    return [year, month, day]
}
function imgExtension(filename) {
    return filename.split('.').pop().toLowerCase();
}
function posted(post) {
    post = post.split("-")
    let now = date(),
        start = moment([post[0], post[1], post[2]]),
        end = moment([now[0], now[1], now[2]])
    return start.from(end)

}
function replace(str, split, join) {

    if(str.split(split).length > 0) {
        return str.split(split).join(join)
    } else {
        return str
    }
}

function setCookie(name,value,days) {
    value = JSON.stringify(value)
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return JSON.parse(c.substring(nameEQ.length,c.length));
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}

function make_it_draggable(component, type="Component") {
    if(component) {
        component.addClass("m-1")
        component.draggable({
        containment: "parent",
        cancel :false,
        revert: false,
        snap: true,
        scroll: true,
        refreshPositions: true,
        drag: function (event, ui) {
                ui.helper.addClass("draggable");                    
            },
        stop: function() {
            // console.log('dragging is stopped')
        }
        })    
        component.resizable({
            containment: "parent",      
            // minHeight: 100,
            // minWidth: 100
        })    
        alertmsg("<b>"+type+"</b>" + " Added to Workspace", "success")
    }
}
function make_it_draggable_all(workspace, type="Workspace") {
    workspace.find("*").addClass("m-1")
    workspace.find("*").draggable({
    containment: "parent",
    cancel :false,
    revert: false,
    snap: true,
    scroll: true,
    refreshPositions: true,
    drag: function (event, ui) {
            ui.helper.addClass("draggable");                    
        },
    stop: function() {
        // console.log('dragging is stopped')
    }
    })    
    workspace.find("*").resizable({
        containment: "parent",      
        // minHeight: 100,
        // minWidth: 100
    })    
    alertmsg("<b>"+type+"</b>" + " Added to Workspace", "success")

}
function has_parent_id(elem, id) {
    try {
        if ($(elem).attr("id") == id) return true;
        return elem.parentNode && this.has_parent_id(elem.parentNode, id);
    }
    catch(err) {
        return false
    }
}

function read_file(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET",file,false);
      rawFile.onreadystatechange = function() {
          if(rawFile.readyState === 4) {
              if(rawFile.status === 200 || rawFile.status === 0)
              {
                  var allText = rawFile.responseText;
                  callback(allText)
              }
          }
      }
      rawFile.send(null);

}