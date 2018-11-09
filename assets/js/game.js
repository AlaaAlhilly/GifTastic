$(document).ready(function(){
    // searching the item
    var ch ,x,item;
    var buttonsArr = ["funny cat","dog","hot","funny"];
    var i;
    function fill(){
        $('.buttons').empty();
        for(i=0;i<buttonsArr.length;i++){
            $(".buttons").append('<a class="fancy-button bg-gradient1"><span>' + buttonsArr[i] + '</span></a>');
        }
    }
    fill();
    $('.addgiffs').click(function(){
        if(buttonsArr.includes($('#giffyreq').val().trim())){
            $('#giffyreq').val('');
            alert("it's already there.");
            return false;
        }
        var gif = $('#giffyreq').val();
        if(gif.trim() == ""){
            alert("Enter something in the field");
            return false;
        }
        buttonsArr.push(gif.trim());
        fill();
        $('#giffyreq').val('');
    });
    
    $('.buttons').on('click','a',function(e){
        e.preventDefault();
        $('.imgs').empty();
        if($(this).text().includes(" ")){
            item = $(this).text().replace(/\s/g,'+');
        } else{
            item = $(this).text();
        }
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + item + '&api_key=dc6zaTOxFJmzC';
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for(var i =0;i<10;i++){
                $('.imgs').append('<div class="imgdiv"><img class="imges" alt="true" id="'+i+'"'+'src="' + response.data[i].images.fixed_height_still.url + '"/><h4 id="rate" class="text-center">Rating: '+response.data[i].rating+'</h4></div>');
            }
            $('.imgs').css('display','block');
            $('img').click(function(){
                var id = parseInt($(this).attr('id'));
                var alt = $(this).attr('alt');
                if(alt == "true"){
                    alt = "false";
                    $(this).attr('alt','false');
                    x = response.data[id].images.fixed_height.url;
                }else{
                    alt = "true";
                    $(this).attr('alt','true');
                    x = response.data[id].images.fixed_height_still.url;
                }
                $(this).attr('src', x);
            });
        });
    });
});