var hkadmin_reload = function (data) {
    if (HKCOMMON.isOk(data)) {
        if (data.data.isReload) {
            $('button#' + HKJGRID.idButtonFilter).trigger('click');
        }
        HKALERT.show('', data.data.message, HKALERT.TYPE.success);
        return;
    }
    HKALERT.show('', data.error, HKALERT.TYPE.error);
}
var hkadmin_formAfter = function (data) {
    if (HKCOMMON.isOk(data)) {
        HKALERT.show('', data.data.message, HKALERT.TYPE.success);
        if (data.data.isComeback && data.data.isComeback == 'none') {
            if (typeof (window['hkadmin_formAfterIndex']) === 'function') {
                var fn = window['hkadmin_formAfterIndex'];
                return fn(data);
            }
            return;
        }
        if (data.data.isReload) {
            window.location.reload();
            return;
        }
        if (typeof (window['hkadmin_formAfterIndex']) === 'function') {
            var fn = window['hkadmin_formAfterIndex'];
            return fn(data);
        }
        $('form')[0].reset();
        //$('div.ck.ck-content p').html('<br data-cke-filler="true">');

        try {
            $('input.' + BPHOTO.classPhotoSingle).next('img').attr('src', BPHOTO.urlNoImage);
            $('div.' + BPHOTO.classPhotoSingle).find('div.col-sm-3.hk-div-photo-remove').each(function () {
                $(this).parent().remove();
            });
            $('input[type=hidden][hk-ref-class=' + BPHOTO.classPhotoSupport + ']').val('');
            $('input.' + BPHOTO.classPhoto).next('img').attr('src', BPHOTO.urlNoImage);
            $('div.' + BPHOTO.classPhoto).find('div.col-sm-3.hk-div-photo-remove').each(function () {
                $(this).parent().remove();
            });
            $('div.' + BPHOTO.classCollection).find('div.col-sm-3.hk-div-photo-remove').each(function () {
                $(this).parent().remove();
            });
            for (instance in CKEDITOR.instances) {
                CKEDITOR.instances[instance].updateElement();
                CKEDITOR.instances[instance].setData('');
            }
            $('a#hk-admin-add-photo').trigger('click');
            $('a#hk-entity-collection-add').trigger('click');


        } catch (ex) { }
        if (data.data.isComeback) {
            window.history.back();
        }
        return;
    }
    HKALERT.show('', data.error, HKALERT.TYPE.error);
}
var hkadmin_menuControlBefore = function ($ob) {
    var ids = Array();
    $('div.hk-table-render input[type=checkbox].' + HKJGRID.classCheckBoxListId).each(function () {
        var $chk = $(this);
        if (HKFORM.CHECKBOX.isChecked($chk)) {
            ids.push(parseInt(HKOB.getId($chk), 10));
        }
    });
    if (ids.length <= 0) {
        HKALERT.show('', HKOB.getAdminCheckedRequireError($('#' + HKADMIN.idAdminMenuControl)), HKALERT.TYPE.error);
        return false;
    }
    var params = HKJSON.stringToJSON(HKOB.getParams($ob));
    params.ids = ids;
    HKOB.setParams($ob, HKJSON.JSONToString(params));
    return true;
}
var BPHOTO = {
    currentPhoto: null,
    classPhotoSingle: 'hk-photo-single',
    classPhotoSupport: 'hk-photo-support',
    classPhoto: 'hk-photo',
    classCollection: 'hk-entity-collection',
    urlNoImage: '/assets/admin/img/no-img.png',
    initPhotoSingle: function () {
        $('input[type=text].hk-check.' + BPHOTO.classPhotoSingle).each(function () {
            var $ob = $(this);
            var $src = $ob.val();
            if ($src == '') {
                $src = BPHOTO.urlNoImage;
            }
            var $callIW = $('<img src="' + $src + '" style="width:120px;cursor: pointer"/>');
            var $imgClickHere = $('<i class="fas fa-sync-alt" style="cursor: pointer; margin-left: 5px; top: 0px; position: absolute" title="click here"></i>');
            $ob.parent().append($callIW).append($imgClickHere);
            $callIW.click(function () {
                $('#hk-modal-media').modal('show');
                BPHOTO.currentPhoto = $(this);
            });
            $imgClickHere.click(function () {
                $callIW.trigger('click');
            });
        });
    },
    addCollection: function ($className) {
        BPHOTO.checkPhotoSelect($className);
        var $collectionHolder = $('div.' + $className);
        var addPhoto = function ($collectionHolder, $newLink) {
            var prototype = $collectionHolder.data('prototype');
            var index = $collectionHolder.data('index');
            var $newForm = $(prototype.replace(/__name__/g, index));
            $collectionHolder.data('index', index + 1);
            $newLink.before($newForm);
            addRemoveLink($newLink.prev());
            removeDiv($collectionHolder);
        }
        var addRemoveLink = function ($div) {
            $div.addClass('border-bottom');
            var $removeFormA = $('<a href="' + HKCOMMON.VOID + '" class=""><i class="far fa-trash-alt text-danger"></i></a>');
            $div.append($('<div class="col-sm-3 hk-div-photo-remove"></div>').append($removeFormA));

            $removeFormA.click(function (e) {
                e.preventDefault();
                $(this).parent().parent().remove();
            });
        }
        var removeDiv = function ($collectionHolder) {
            $collectionHolder.find('> div.form-group label.col-sm-3').each(function () {
                $(this).remove();
            });
        }


        removeDiv($collectionHolder);

        var $addLink = $('<a id="hk-entity-collection-add" href="' + HKCOMMON.VOID + '" class=""><i class="fas fa-plus"></i></a>');
        var $newLink = $('<div class="form-group text-right"></div>').append($addLink);

        $collectionHolder.find('> div.form-group').each(function () {
            addRemoveLink($(this));
        })
        $collectionHolder.append($newLink);
        $collectionHolder.data('index', $collectionHolder.find(':input').length);

        $addLink.click(function (e) {
            e.preventDefault();
            addPhoto($collectionHolder, $newLink);
        });
    },
    iwSelect: function (path) {
        if (BPHOTO.currentPhoto == null) {
            return;
        }
        BPHOTO.currentPhoto.attr('src', path);
        BPHOTO.currentPhoto.prev('input[type=text].hk-check.' + BPHOTO.classPhotoSingle).val(path);
        BPHOTO.currentPhoto.next().find('input[type=hidden]').val(path);
        $('input[type=hidden][hk-ref-class=' + BPHOTO.classPhotoSupport + ']').val('1');
        $('input[type=hidden][hk-ref-class=' + BPHOTO.classPhoto + ']').val('1');
        $('#hk-modal-media').modal('hide');
    },

    checkPhotoSelect: function ($className) {
        $('input[type=hidden][hk-ref-class=' + $className + ']').val('');
        $('div.' + $className + ' input[type=hidden]').each(function () {
            $ob = $(this);
            if ($ob.val() != '') {
                $('input[type=hidden][hk-ref-class=' + $className + ']').val('1');
            }
        });
    },
    addPhotoCollection: function ($className) {
        BPHOTO.checkPhotoSelect($className);
        var $collectionHolder = $('div.' + $className);
        var addPhoto = function ($collectionHolder, $newLink) {
            var prototype = $collectionHolder.data('prototype');
            var index = $collectionHolder.data('index');
            var $newForm = $(prototype.replace(/__name__/g, index));
            $collectionHolder.data('index', index + 1);
            $newLink.before($newForm);
            addRemoveLink($newLink.prev());
            removeDiv($collectionHolder);
        }
        var addRemoveLink = function ($div) {
            $div.addClass('border-bottom');
            var $src = $div.find('input[type=hidden]').val();
            if ($src == '') {
                $src = BPHOTO.urlNoImage;
            }
            var $callIW = $('<img src="' + $src + '" style="width:120px;cursor: pointer"/>');

            var $removeFormA = $('<a href="' + HKCOMMON.VOID + '" class=""><i class="far fa-trash-alt text-danger"></i></a>');
            $div.find('> div.col-sm-9').prepend($callIW);
            $div.append($('<div class="col-sm-3 hk-div-photo-remove"></div>').append($removeFormA));

            $callIW.click(function () {
                $('#hk-modal-media').modal('show');
                BPHOTO.currentPhoto = $(this);
            });
            $removeFormA.click(function (e) {
                e.preventDefault();
                $(this).parent().parent().remove();
                BPHOTO.checkPhotoSelect($className);
            });
        }
        var removeDiv = function ($collectionHolder) {
            $collectionHolder.find('> div.form-group label.col-sm-3').each(function () {
                $(this).remove();
            });
        }


        removeDiv($collectionHolder);

        var $addLink = $('<a id="hk-admin-add-photo" href="' + HKCOMMON.VOID + '" class="add-photo"><i class="fas fa-plus"></i></a>');
        var $newLink = $('<div class="form-group text-right mr-5"></div>').append($addLink);

        $collectionHolder.find('> div.form-group').each(function () {
            addRemoveLink($(this));
        })
        $collectionHolder.append($newLink);
        $collectionHolder.data('index', $collectionHolder.find(':input').length);

        $addLink.click(function (e) {
            e.preventDefault();
            addPhoto($collectionHolder, $newLink);
        });
    }
}
var HKADMIN = {
    idAdminMenuControl: 'hk-admin-menu-control',
    classAdminMenuControl: 'hk-admin-menu-control',
    reInit: function () {
        $('input.hk-datepicker').datepicker({
            format: 'dd/mm/yyyy'
        });
        BPHOTO.addPhotoCollection(BPHOTO.classPhoto);
        BPHOTO.addCollection(BPHOTO.classCollection);
        var editId = -1;
        if ($('input.hk-edit-id')) {
            editId = $('input.hk-edit-id').val();
        }
        if (parseInt(editId, 10) <= 0) {
            $('a#hk-admin-add-photo').trigger('click');
            $('a#hk-entity-collection-add').trigger('click');
        }

        $('.hk-reinit-url').each(function () {
            var $ob = $(this);
            $ob.unbind('click').click(function () {
                var url = HKOB.getUrl($ob);
                if (url != '') {
                    if (parseInt(HKOB.getId($ob), 10) > 0) {
                        url += '/' + HKOB.getId($ob);
                    }
                    if (HKOB.getIsConfirm($ob) == '1') {
                        HKMODAL.add(HKOB.getIsConfirmText, function () {
                            var callbackBefore = HKOB.getCallBackBefore($ob);
                            if (typeof (window[callbackBefore]) === 'function') {
                                var fnb = window[callbackBefore];
                                if (fnb($ob)) {
                                    window.location = url;
                                }
                                return;
                            }
                            window.location = url;
                        });
                        return;
                    }
                    var callbackBefore = HKOB.getCallBackBefore($ob);
                    if (typeof (window[callbackBefore]) === 'function') {
                        var fnb = window[callbackBefore];
                        if (fnb($ob)) {
                            window.location = url;
                        }
                        return;
                    }
                    window.location = url;
                }
            });
        });
        $('select#' + HKJGRID.idSelectLimit).unbind('change').change(function () {
            var $ob = $(this);
            HKJGRID.limit = $ob.val();
            HKJGRID.page = 1;
            $('button#' + HKJGRID.idButtonFilter).trigger('click');
        });
        $('ul#' + HKJGRID.idUlPaginator + ' li.page-item > a.page-link').each(function () {
            var $ob = $(this);
            $ob.unbind('click').click(function () {
                var $a = $(this);
                if (HKOB.getPage($a) != '') {
                    HKJGRID.page = HKOB.getPage($a);
                    $('button#' + HKJGRID.idButtonFilter).trigger('click');
                }
            });
        });
        $('div.hk-table-render input[type=checkbox]#' + HKJGRID.idCheckBoxAll).unbind('click').click(function () {
            var $ob = $(this);
            var $obs = $('div.hk-table-render input[type=checkbox].' + HKJGRID.classCheckBoxListId);
            if (HKFORM.CHECKBOX.isChecked($ob)) {
                HKFORM.CHECKBOX.checkAllList($obs, !HKFORM.CHECKBOX.isCheckedAll($('div.hk-table-render input[type=checkbox].' + HKJGRID.classCheckBoxListId)));
            } else {
                HKFORM.CHECKBOX.checkAllList($obs, false);
            }
        });
        $('div.hk-table-render input[type=checkbox].' + HKJGRID.classCheckBoxListId).each(function () {
            var $ob = $(this);
            $ob.unbind('click').click(function () {
                HKFORM.CHECKBOX.check($('div.hk-table-render input[type=checkbox]#' + HKJGRID.idCheckBoxAll), HKFORM.CHECKBOX.isCheckedAll($('div.hk-table-render input[type=checkbox].' + HKJGRID.classCheckBoxListId)));
            });
        });

        $('.admin-toggle-on').toggles({
            drag: false, // allow dragging the toggle between positions
            click: true, // allow clicking on the toggle
            text: {
                on: 'ON', // text for the ON position
                off: 'OFF' // and off
            },
            on: true, // is the toggle ON on init
            animate: 250, // animation time (ms)
            easing: 'swing', // animation transition easing function
            checkbox: null, // the checkbox to toggle (for use in forms)
            clicker: null, // element that can be clicked on to toggle. removes binding
            // from the toggle itself (use nesting)

            type: 'compact' // if this is set to 'select' then the select style
            // toggle will be used
        });
        $('.admin-toggle-off').toggles({
            drag: false, // allow dragging the toggle between positions
            click: true, // allow clicking on the toggle
            text: {
                on: 'ON', // text for the ON position
                off: 'OFF' // and off
            },
            on: false, // is the toggle ON on init
            animate: 250, // animation time (ms)
            easing: 'swing', // animation transition easing function
            checkbox: null, // the checkbox to toggle (for use in forms)
            clicker: null, // element that can be clicked on to toggle. removes binding
            // from the toggle itself (use nesting)

            type: 'compact' // if this is set to 'select' then the select style
            // toggle will be used
        });

        //photo
    },
    init: function () {
        $('input.hk-validate-multi-select-required').each(function () {
            var $ob = $(this);
            if (HKFORM.CHECKBOX.isCheckedOne($('div.' + HKOB.getRefClass($ob) + ' input[type="checkbox"]'))) {
                $ob.val('1');
            }
            $('div.' + HKOB.getRefClass($ob) + ' input[type="checkbox"]').unbind('click').click(function () {
                $ob.val('');
                if (HKFORM.CHECKBOX.isCheckedOne($('div.' + HKOB.getRefClass($ob) + ' input[type="checkbox"]'))) {
                    $ob.val('1');
                }
            });
        });



        $('textarea.hk-editor').parent().addClass('col-sm-12');
        $('textarea.hk-editor').parent().prev('label').addClass('col-sm-12');
        $('div.hk-limit-render').each(function () {
            var $ob = $(this);
            HKJGRID.renderLimit($ob);
        });
        $('div.hk-filter-form-render').each(function () {
            var $ob = $(this);
            var url = HKOB.getUrl($ob);
            if (url) {
                HKAJAX.send(url, {}, function (data) {
                    if (HKCOMMON.isOk(data)) {
                        HKJGRID.renderFilter(data.data, $ob);
                        HKFORM.reInit();
                        $('button#' + HKJGRID.idButtonFilter).trigger('click');
                    }
                });
            }
        });
        $('div.hk-admin-menu-control').each(function () {
            var $ob = $(this);
            var url = HKOB.getUrl($ob);
            if (url != '') {
                $ob.html('');
                HKAJAX.send(url, {}, function (data) {
                    if (HKCOMMON.isOk(data)) {
                        for (var i = 0; i < data.data.length; i++) {
                            var item = data.data[i];
                            $ob.append('<a href="' + HKCOMMON.VOID + '" class="' + item.class + '" hk-data-url="' + item.url + '" hk-data-method="' + item.method + '" ' + item.attr + '><i class="' + item.icon + '"></i> ' + item.text + '</a>');
                        }
                        HKADMIN.reInit();
                        HKCOMMON.reInit();
                        HKFORM.reInit();
                    }
                });
            }
        });
        $('form .hk-check').each(function () {
            var $ob = $(this);
            if (HKOB.getValidateRequired($ob) == '1') {
                $ob.parent().prev('label').append('<span class="badge badge-danger badge-indicator"></span>');
            }
        });
        if ($('form .hk-check').length > 0 && HKOB.getIsMultiLanguages($('#hk-section-form')) == '1') {
            HKAJAX.send('/admin/language/all', {}, function (data) {
                if (HKCOMMON.isOk(data)) {
                    let editId = -1;
                    if ($('input.hk-edit-id')) {
                        editId = $('input.hk-edit-id').val();
                    }
                    if (HKOB.getUrl($('#hk-section-form')) != '') {
                        HKAJAX.send(HKOB.getUrl($('#hk-section-form')), { id: editId }, function (dataItem) {
                            if (HKCOMMON.isOk(dataItem)) {
                                HKADMIN.renderMultiLanguages(data, dataItem);
                            }
                        });
                        return;
                    }
                    HKADMIN.renderMultiLanguages(data, []);
                }
            });
        }
        BPHOTO.initPhotoSingle();
    },
    renderMultiLanguages: function (data, dataItem) {
        let $default = '';
        data.data.forEach(item => {
            if (item.is_default) {
                $default = item.key;
            }
        });

        $('form .hk-check').each(function () {
            var $ob = $(this);
            if (HKOB.getIsMultiLanguages($ob) == '1') {

                var str = '<ul class="hk-nav-lang nav nav-tabs nav-tabs-success nav-light pa-5 mb-5 justify-content-end" hk-data-current-lang="' + $default + '">';
                data.data.forEach(item => {
                    var active = '';
                    var subfix = '';
                    if (item.is_default) {
                        active = ' active';
                    } else {
                        subfix = '_' + item.key;
                        var $clone = $ob.clone();
                        $clone.attr('id', $ob.attr('id') + '_' + item.key);
                        $clone.attr('name', $ob.attr('name').replace(']', '_' + item.key + ']'));
                        var $arr = $ob.attr('id').split('_');
                        try {
                            $clone.val(dataItem.data[item.key][$arr[$arr.length - 1]]);
                        } catch (ex) { }

                        $ob.parent().append($clone);
                        if ($ob.hasClass('hk-editor')) {
                            HKFORM.FORM.renderEditor($clone, function () {
                                $clone.next('div.cke.cke_reset').addClass('d-none');
                            });
                        } else {
                            $clone.addClass('d-none');
                        }
                    }
                    str += '<li class="nav-item "><a href="' + HKCOMMON.VOID + '" hk-ref-id="' + $ob.attr('id') + subfix + '" class="nav-link font-11 pl-5 pr-5' + active + '" hk-data-lang="' + item.key + '">' + item.lang + '</a></li>'
                });
                str += '</ul>';
                $ob.parent().prepend(str);

                $ob.parent().find('ul.hk-nav-lang li > a').unbind('click').click(function () {
                    var $obc = $(this);
                    var $ul = $ob.parent().find('ul.hk-nav-lang');
                    if (HKOB.getLang($obc) != HKOB.getCurrentLang($ul)) {
                        $ob.parent().find('ul.hk-nav-lang li > a').removeClass('active');
                        $obc.addClass('active');
                        HKOB.setCurrentLang($ul, HKOB.getLang($obc));

                        if ($ob.hasClass('hk-editor')) {
                            $('#' + HKOB.getRefId($obc)).parent().find('div.cke.cke_reset').removeClass('d-none').addClass('d-none');
                            $('#' + HKOB.getRefId($obc)).next('div.cke.cke_reset').removeClass('d-none');
                            return;
                        }
                        $('#' + HKOB.getRefId($obc)).parent().find('.hk-check').removeClass('d-none').addClass('d-none');
                        $('#' + HKOB.getRefId($obc)).removeClass('d-none');

                    }
                });
            }
        });
    }
}
$(function () {
    HKADMIN.init();
    HKADMIN.reInit();
});

