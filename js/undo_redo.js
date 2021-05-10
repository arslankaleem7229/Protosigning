//History Object
var historyApp = {
    stackStyle   : [],
    stackId   : [],
    counter : -1,
    add     : function(style, id){
        
        ++this.counter;
        this.stackStyle[this.counter] = style;
        this.stackId[this.counter] = id;
        this.doSomethingWith(style, id);

        // delete anything forward of the counter
        this.stackStyle.splice(this.counter+1);
    },
    undo : function(){
        --this.counter;
        this.doSomethingWith(this.stackStyle[this.counter],this.stackId[this.counter]);        
    },
    redo : function(){
        ++this.counter;
        this.doSomethingWith(this.stackStyle[this.counter],this.stackId[this.counter]);
       
    },
    doSomethingWith : function(style, id){
        
        //Check if make buttons undo/redo disabled or enabled
        if(this.counter <= -1)
        {
            $('#undo').addClass('disabled');            
            $('#redo').removeClass('disabled'); 
            return;
        }
        else
        {
            $('#undo').removeClass('disabled');            
        }
        
        
        if(this.counter == this.stackStyle.length)
        {
            $('#redo').addClass('disabled');
            $('#undo').removeClass('disabled');           
            return;
        }        
        else
        {
            $('#redo').removeClass('disabled');            
        }
        
        
        console.log(style + ' - ' + id);
        //Apply history style
        $('#' + id).attr('style', style);     
        
        console.log(this.counter + ' - ' + this.stackStyle.length);
        
        
        
        
        
        
        
    }
};


$(document).ready(function (e) {
    
    //make class .editable draggable
    $('#editor').find("*").draggable(
    {
        stop: stopHandlerDrag,
        start: startHandlerDrag
        
    });
    
    //make class .editable resizable    
    $('#editor').find("*").resizable(
    {
        stop: stopHandlerResize,
        start: startHandlerResize
        
    });
    
    
    
});

//Stop Handler Drag
function stopHandlerDrag(event, ui)
{
    var style = $(ui.helper).attr('style');
    var id = $(ui.helper).attr('id');
    historyApp.add(style, id);
    
}


//Star Handler Drag
function startHandlerDrag(event, ui)
{
    console.log('start drag');
    var style = $(ui.helper).attr('style');
    var id = $(ui.helper).attr('id');
    historyApp.add(style, id);
    
    //Dettach all events
    $('#'+id).draggable("option", "revert", false);
    $('#'+id).resizable("destroy");
    //reassign stop events
    $('#'+id).draggable(
    {
        stop: stopHandlerDrag,
        start: ''    
    });
    $('#'+id).resizable(
    {
        stop: stopHandlerResize,
        start: '' 
    });
}

//Stop Handler Resize
function stopHandlerResize(event, ui)
{
    var style = $(ui.helper).attr('style');
    var id = $(ui.helper).attr('id');
    historyApp.add(style, id);
}

//Star Handler Resize
function startHandlerResize(event, ui)
{
    console.log('start resize');
    var style = $(ui.helper).attr('style');
    var id = $(ui.helper).attr('id');
    historyApp.add(style, id);
    //Dettach all events
    $('#'+id).draggable("option", "revert", false);
    $('#'+id).resizable("destroy");
    //reassign stop events
    $('#'+id).draggable(
    {
        stop: stopHandlerDrag,
        start: ''    
    });
    $('#'+id).resizable(
    {
        stop: stopHandlerResize,
        start: '' 
    });
}




//Click Events For Redo and Undo
$(document).on('click', '#redo', function () {
    historyApp.redo();
});

$(document).on('click', '#undo', function () {
    historyApp.undo();
});
            