$(document).ready(function() {
    //$('table tr ').cs
    $('[data-toggle="tooltip"]').tooltip()
        //variable area
    var sn = 1;
    var con = document.getElementById('console');
    var purchaseItem = new Array();

    var template = '';



    //Event-listener
    //product item drop down to get rate
    $('#productName').change(function() {
        onProductItemSelected(this);
    });

    //Event for product quantity  to get total
    $('#productQuantity').on('change keyup', function() {
        onProductQuantitySelected(this);
    });

    //Click Listener fo Add button
    $(".btn-row-adder").click(function() {
        updateTotal();
        $('.btn-row-adder').prop('disabled', true);
        onNewRowInsert(this);
    });

    //Click Listener fo Remove button
    $('table.mainTable').on('click', '.btn-product-remove', function() {
        onRowRemover(this);
        $('.btn-row-adder').prop('disabled', true);
    });

    // //product item drop down to get rate
    // $('table.mainTable').on('change', '.drop', function() {
    //     onProductItemSelected(this);
    // });

    // //Event for product quantity  to get total
    // $('table.mainTable').on('keydown change', '.quant', function() {
    //     onProductQuantitySelected(this);
    // });

    //Event For Finish Button
    $('#btn-purchase-finish').click(function() {
        onPurchaseFinish(this);
    });

    //Reset Table
    $('.btn-reset-table').click(function() {
        resetTable(this);
    });

    $('#checkBox').click(function() {
        if ($('#checkBox').is(":checked")) {
            $('#btn-purchase-finish').prop('disabled', false)
        } else {
            $('#btn-purchase-finish').prop('disabled', true)
        }
    })



    //Event Listenr Function

    //inserting New row to view via template
    function onNewRowInsert(btn) {
        $('#productName').find('option:selected').prop('disabled', 'true');
        console.log($('#productName').find('option:selected'));

        var name = $('#productName').find('option:selected').data('name');
        var rate = $('#productName').find('option:selected').data('price');
        var quantity = $('#productQuantity').val();
        var total = $('#productTotal').val();

        var template = `<tr class=newRow>
        <td><input class="product-list-name form-control" value="${name}" readonly></td>
        <td><input class="product-list-rate form-control" value="${rate}" readonly></td>
        <td><input class="product-list-quantity form-control" value="${quantity}"readonly> </td>
        <td><input class="product-list-total  form-control" value="${total}" readonly></td>
        <td> <btn class="btn btn-danger btn-product-remove" >X</btn</td>
            `;
        $('#productName').val(0);
        $('#productRate').val(0);
        $('#productQuantity').val(0);
        $('#productTotal').val(0);
        $("table.mainTable tbody").append(template).animate('slow');
        updateTotal();


    }

    //removing the row
    function onRowRemover(removeBtn) {
        $('#productName').find('option:selected').prop('disabled', 'true');
        console.log($('#productName').find('option:selected'));
        $('#productName').find('option:disabled').each(function() {

            console.log(this);
            if ($(removeBtn).closest('tr').find('.product-list-name').val() == ($(this).data('name')) && $(this).val() != 0) {
                $(this).prop('disabled', false);
                console.log(this);

            }
        })
        $(removeBtn).closest('tr').remove();
        updateTotal();
        $('.btn-row-adder').prop('disabled', false);
    }

    // Product Item Selection
    function onProductItemSelected(productItem) {
        //$('.btn-row-adder')
        $('#productRate').val($('#productName').find('option:selected').data('price'));
        $('#productQuantity').val(0);
        $('#productQuantity').prop('disabled', false);
        $('#productTotal').val(0);


        // $(productItem).closest('tr').find('.pTotal').text('0');
        // $(productItem).closest('tr').find('.quant').val('0');
        // var price = $(productItem).find('option:selected').data('price');
        // if (price != 0) {
        //     con.innerHTML += price;
        //     $(productItem).closest('tr').find('.rate ').text(price);
        //     $(productItem).closest('tr').find('.quant').css('visibility', 'visible');

        //     updateTotal();
        // }
        // if (price == 0) {
        //     $(productItem).closest('tr').find('.rate ').text(price);
        //     $(productItem).closest('tr').find('.quant').prop('disabled', true);
        // }
    }


    //Product Quantity Selection
    function onProductQuantitySelected(productQuantity) {
        $('.btn-row-adder').prop('disabled', false);
        $('#productRate').val($('#productName').find('option:selected').data('price'));
        var total = $(productQuantity).val() * parseInt($('#productRate').val());
        $('#productTotal').val(total);
        console.log(total);
        updateTotal();

        // var quant = productQuantity.value;
        // var rate = $(productQuantity).closest('tr').find('.rate').text();
        // total = quant * parseInt(rate); //ok        
        // $(productQuantity).closest('tr').find('.pTotal').text(total)
        // updateTotal();
        // if (quant != 0) {
        //     $('.btn-row-adder').prop('disabled', false)
        // }
    }

    //Purchase Finish Function
    function onPurchaseFinish(btn) {
        var trow = $('.mainTable').find('.newRow').length;
        var total = $('#total').text();
        if (trow == 0) {
            alert('Select at least 1 Item')
        } else if (total == 0) {
            alert(' Atleast Complete 1 purchase');
        } else {
            $('#tableModal').modal();
            genrateArray();
            generateFinalTable();
            // clearTable();
            generateLog();
        }
    }

    //Reseting the table
    function resetTable(resetBtn) {
        var trow = $('.mainTable').find('.newRow').length;
        var total = $('#total').text();
        if (trow == 0) {
            alert(`No Item Selected Till now \nContinue Shopping`);
        } else {
            clearTable()
        }
        reset();
    }

    //Helper function
    //generate the ro template
    function generateTemplate() {

        return template;
    }

    //tocalculate total
    function updateTotal() {
        console.log('i am here');

        var total = 0;
        var gtotal = 0;
        var discount = 0;
        $('.product-list-total ').each(function() {

            total += parseInt($(this).val());
            console.log(total);
        });
        if (total == 0) {
            $('#checkBox').prop('disabled', true);
        } else {
            $('#checkBox').prop('disabled', false);
        }
        $('#total').text(total);
        discount = getDiscount(total);
        $('#discount').text(discount);
        gtotal = total - discount;
        $('#grandTotal').text(gtotal);
    }

    //calculate discount
    function getDiscount(price) {
        var discount = 0;
        var amt = parseInt(price);
        if (amt <= 3000) {
            discount = 0;
        }
        if (amt > 3000 && amt <= 6000) {
            discount = .1 * (amt - 3000);
        }
        if (amt > 6000) {
            discount = .1 * (3000) + .2 * (amt - 6000);
        }
        return discount;
    }

    //Reset the total
    function reset() {
        $('#total').text('0');
        $('#discount').text('0')
        $('#grandTotal').text('0');
    }

    //Generate the array
    function genrateArray() {
        purchaseItem = [];
        $('tr.newRow').each(function() {
            purchaseItem.push({
                name: $(this).find('.product-list-name').val(),
                price: $(this).find('.product-list-rate').val(),
                quantity: $(this).find('.product-list-quantity').val(),
                total: $(this).find('.product-list-total').val()
            });
        });
    }

    //clearing table
    function clearTable() {
        con.innerHTML = '';
        $('table.mainTable tbody').find('tr').remove('*');
        $('#console').text('');
        $('#productName').find('option:disabled').each(function() {
            $(this).prop('disabled', false);
        })
        reset();
    }

    //generate Final Table
    function generateFinalTable() {
        var newRow = '';
        var sn = 1;
        var plog = '';
        purchaseItem.forEach(element => {
            newRow += ` <tr class = 'newRow' > 
            <td>${sn++}</td>
            <td >${element.name} </td>
            <td > ${element.price}</td>
            <td>${element.quantity}</td>
            <td>${element.total}</td>
            </tr>`
        });
        $('table.invoice').find('tbody').append(newRow);
        $('#billTotal').text($('#total').text());
        $('#billDiscount').text($('#discount').text());
        $('#billGrandTotal').text($('#grandTotal').text());
    }

    //diaplay the raw format
    function generateLog() {
        var log = '';
        purchaseItem.forEach(element => {
            log += `
            {<p>product_name : ${element.name}</p>
            <p>unit_price : ${element.price}</p>
            <p>quantity : ${element.quantity}</p>
            <p>total_price : ${element.total}</p>
        }`
        });
        con.innerHTML = ``;
        console.log(log);

        $('#consoler').html(log);
    }
});