
let $component = {
    addBtn: function(e) {
        let btn = $("<li>")
        btn.html('<span component-type="button">Button</span>')
        // btn.addClass('default-btn-component')
        btn.click(function(e) {$btnCustomizations(e) })
        $(e).append(btn)
        console.log(e, 'hi there, adding the button')
    }
}