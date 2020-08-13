import __component_attachers from '@/assets/helperFunctions/static/componentAttachers'
import { EventBus } from '@/globals/event-bus.js'

class AceEditor
{
    static i = 0
    static setupEditor = (editor) =>
    {
        let config = {
            mode: null
        }
        editor.ref = ace.edit(editor.window)
        editor.ref.setTheme("ace/theme/monokai")

        if(editor.type === "html")
        {
            editor.prettifyHTML = require('prettify-html')
            config.mode = "ace/mode/html"
        }

        AceEditor.setText(editor)
        editor.ref.getSession().setMode(config.mode)
        editor.ref.getSession().on('change', (e) => {
            this.updateEditor(editor)
        })
        editor.ref.setOptions({
        showLineNumbers: true,
        showGutter: true,
        vScrollBarAlwaysVisible:true,
        enableBasicAutocompletion: false, enableLiveAutocompletion: false
        })
    }







}
export default AceEditor

            