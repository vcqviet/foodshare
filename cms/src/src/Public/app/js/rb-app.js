
function __callback_user_login(data) {
    if (HKCOMMON.isOk(data)) {
        HKALERT.showOk("Login successful !");
        setTimeout(function () { window.location = '/user/profile/'; }, 4000);
        return;
    }
    HKALERT.showError(data);
}
var HKAPP = {
    init: function () {

    },
    reInit: function () {
        HKAPP.loadCart();
    },
    loadCart: function () {
        HKAJAX.send('/cart/info', {}, function (data) {
            if (HKCOMMON.isOk(data)) {
                $('#hk-cart-counter').text(data.data.carts.length);
                $carts = $('#hk-carts');
                $carts.html('');
                for (var i = 0; i < data.data.carts.length; i++) {
                    $pro = data.data.carts[i];
                    var $p = $('<div class="d-flex px-2"></div>');
                    var $a = $('<a href="' + $pro.url + '" class="thumb" title="' + $pro.name + '"><img src="' + $pro.photo_url + '" alt="' + $pro.name + '"></a>');
                    var $d = $('<div class="info"></div>');
                    $d.append('<div class="tt">' + $pro.name + '</div>')
                        .append('<div class="text-dark">' + $pro.size + '</div>')
                        .append('<div class="tt">' + $pro.price + '</div>');
                    $p.append($a).append($d);
                    $carts.append($p);
                }
                if (data.data.carts.length <= 0) {
                    $('#hk-checkout #hk-checkout-sub').remove();
                    return;
                }
                $('#hk-checkout').append('<div class="text-center px-2" id="hk-checkout-sub"><a href="' + data.data.url_checkout + '" title="' + data.data.checkout + '" class="btn btn-block btn-md btn-primary-custom">' + data.data.checkout + '</a></div>');
                return;
            }
        });
    }
}
$(function () {
    HKAPP.init();
    HKAPP.reInit();
    $('.open-sidebar').click(function (e) {
        e.preventDefault();
        $('.user-sidebar').addClass('active');
    });
    $('a.hk-language').unbind('click').click(function () {
        HKAJAX.send(HKOB.getUrl($(this)), { rblang: HKOB.getLang($(this)) }, function (data) {
            if (HKCOMMON.isOk(data)) {
                window.location.reload();
                return;
            }
            HKALERT.showError(data);
        }, 'POST');
        return false;
    });
    $('a.hk-liked').click(function () {
        var $ob = $(this);
        HKAJAX.send(HKOB.getUrl($ob), { id: HKOB.getId($ob) }, function (data) {
            if (HKCOMMON.isOk(data)) {
                console.log(data);
                return;
            }
            HKALERT.showError(data);
        }, 'POST');
    });
    $('a.hk-add-to-cart').click(function () {
        var $ob = $(this);
        HKAJAX.send(HKOB.getUrl($ob), { id: HKOB.getId($ob), size: HKOB.getSize($ob), quantity: 1 }, function (data) {
            if (HKCOMMON.isOk(data)) {
                HKALERT.showOk(data.data.message);
                HKAPP.reInit();
                return;
            }
            HKALERT.showError(data);
        }, 'POST');
    });
});
