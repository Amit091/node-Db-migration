var i = 1;

function displayDate() {
    document.getElementById("datep").innerHTML = Date();
}

function getString() {
    var value = document.getElementById("inputtxt").value;
    document.getElementById("res").innerText = "Enter Text is " + value + " of length :" + value.length;
    //console.log(value);
}

$(document).on('mousemove', function(e) {
        $('#myCord').text('Coords: X:' + e.clientX + ' Y:' + e.clientY);
    })
    //jQuery
$(document).ready(function() {

    $("#btnjq").click(function() {
        $(this).hide(1000);
        $("#btnjqp").innerHTML = "button hidden"

    });

    $("#btnPress").dblclick(function() {
        $(this).hide(1000);
        $("#btnjqp").innerHTML = "button hidden"
    });

    // $("#btnDanger").mouseenter(function() {
    //     $("#btnDanger").css("background-color", "red");
    //     $("#pdanger").text("Danger Zone");
    // });

    // $("#btnDanger").mouseleave(function() {
    //     $("#btnDanger").css("background-color", "teal");
    //     $("#pdanger").text("leaving danger zone");
    // });


    jQuery("#dangerZone").on({
        mouseenter: function() {
            $("#dangerZone").css("background-color", "red");
            $("#pdanger").text("Danger Zone");
        },
        mouseleave: (function() {
            $("#dangerZone").css("background-color", "teal");
            $("#pdanger").text("leaving danger zone");
            $("#dangerZone").removeAttr('style');

        })
    })
    $("#btnadd").click(function() {
        $("#btnadd").attr("text", "Demo");
        //alert($("#btnadd").attr("text"))
        var txt = $("<button class='btn btn-secondary'></button>").text(`Button ${i++}`);
        $("#btnadd").before(txt);
    })

    $('#myForm').submit(function() {
        alert("Thank you for your comment!");
    });

    $('div a').on({
        click: (function() {
            $('div .card-header').removeAttr('style');
            $('div .card-footer').removeAttr('style');
            //$(this).parent().parent("div").children('h4').css('background', 'grey');
            $(this).closest('.mb-4').find('h4').css('background', 'grey')
            console.log('Buttom Button Pressed');
        }),
        dblclick: function() {
            $(this).parent().css('background', 'grey');
            $(this).css('color', 'red')
        },
        // mouseover: (function() {
        //     $('div h4').removeAttr('style');
        //     $('div div').removeAttr('style');
        //     //$(this).parent().parent("div").children('h4').css('background', 'grey');
        //     $(this).closest('.mb-4').find('h4').css('background', 'grey')
        //     console.log('Buttom Button Pressed');
        // })
    })

    //for to do app
    $("#addTask").on("click", function() {
        var val = $("#iptxt").val();
        if (val !== '') {
            var elem = $("<li></li>").text(val);
            $(elem).append("<button class='rem'>X</button>");
            $("#myList").append(elem);
            $("#iptxt").val("");
            $('.rem').click(function() {
                $(this).parent().remove();
            })
            $('#iptxt').focus();
        }
        //  $('#iptxt').css('border', '1px red')
        $('#iptxt').focus();
    });

    // $('.container > div').css('border', '1px dashed teal')
    // //animation


    $('#toggler').click(function() {
        $('#avenger').toggle('slow');
    })
    $('#fadetoggler').click(function() {
        $('#avenger').fadeToggle('slow');
        $('#avenger').fadeTo('slow', 0.5);
    })
    $('#dSlider').click(function() {
        $('#avenger').slideDown('slow');
    })
    $('#uSlider').click(function() {
        $('#avenger').slideUp('slow');
    })
    $('#sSlider').click(function() {
        $('#avenger').slideToggle('slow');
    })
    $("#animate").click(function() {
        $("#boxer").animate({ left: '250px' });
    });
    $("#stop").click(function() {
        $("#avenger").stop();
        $("#boxer").stop();
    });
    $("#chain").click(function() {
        $("#boxer").slideUp('slow');
        $("#boxer").animate({ left: '250px' });
        $("#boxer").slideDown('slow');
        $("#boxer").animate({ left: '100px' });
    });
})