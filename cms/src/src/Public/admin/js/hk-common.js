if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    }
}
var HKJSON = {
    formToJSON: function (form) {
        var json = {};
        form.forEach(function (e) {
            json[e.name] = e.value || '';
        });
        return json;
    },
    stringToJSON: function (str) {
        return JSON.parse(str);
    },
    JSONToString: function (json) {
        return JSON.stringify(json);
    }
};
var HKSTRING = {
    getStringNumber: function ($num, $length) {
        $num = parseInt($num, 10);
        $rt = '';
        for (var $i = 0; $i < $length - $num.toString().length; $i++) {
            $rt += '0';
        }
        return $rt += $num.toString();
    }
};
var HKLOADING = {
    isLoading: false,
    show: function () {
        // show loading box here
        HKLOADING.isLoading = true;
        $(".preloader-it").fadeIn("fast");
        $('#hk-pre-loader').show();
    },
    hide: function () {
        HKLOADING.isLoading = false;
        $(".preloader-it").fadeOut("fast");
        $('#hk-pre-loader').hide();
        // hide loading box here
    }
};
var HKMONEY = {
    sepa: ',',
    init: function () {
        $('.hk-money').each(function () {
            $(this).val(HKMONEY.format($(this).val()));
        });
        $('.hk-money-show').each(function () {
            $(this).text(HKMONEY.format($(this).text()));
        });
        $('input.hk-money').change(function () {
            $(this).val(HKMONEY.format($(this).val()));
        }).focus(function () {
            if ($(this).val() == '0') {
                $(this).val('');
            }
        }).focusout(function () {
            if ($(this).val() == '') {
                $(this).val('0');
            }
        });
    },
    format: function (val) {
        if (val == '') {
            return '0';
        }
        var arr = (val + '').split('.');
        var strVal = HKMONEY.replace(arr[0]);
        var length = strVal.length;
        var newStrVal = '';
        for (var i = 1; i <= length; i++) {
            if ((i - 1) % 3 == 0 && i > 1) {
                newStrVal = strVal[length - i] + HKMONEY.sepa + newStrVal;
            } else {
                newStrVal = strVal[length - i] + newStrVal;
            }
        }
        if (arr.length == 2) {
            return newStrVal + '.' + arr[1];
        }
        return newStrVal;
    },
    replace: function (val) {
        if (val == '') {
            return '0';
        }
        var strVal = val + '';
        return strVal.replace(/,/g, '');
    }
};
var HKVALIDATOR = {
    isEmail: function (val) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(val);
    },
    isPhoneNumber: function (val) {
        var pattern = new RegExp(/^(((\(\+\d+\))|(\+\d+))(-|\.|\s)+)?(\d|-|\.|\s){6,20}$/i);
        return pattern.test(val);
    },
    isNumber: function (val) {
        return /^[-+]?[0-9]+$/.test(val);
    },
    isNumberGreaterThanZero: function (val) {
        return /^[+]?[1-9][0-9]*$/.test(val);
    },
    isNumberNoneNegative: function (val) {
        return /^[+]?[0-9]+$/.test(val);
    }
};
var HKALERT = {
    TYPE: {
        success: 'success',
        warning: 'warning',
        error: 'error',
        confirm: 'confirm',
        information: 'info'
    },
    position: 'top-right',
    loaderBg: '#7a5449',
    delay: 12000,
    effect: 'fade',
    showArray: function (header, arrTexts, type) {
        var $class = '';
        var text = '<ul>';
        for (var i = 0; i < arrTexts.length; i++) {
            text += '<li>' + arrTexts[i] + '</li>'
        }
        text += '<ul>';
        switch (type) {
            case HKALERT.TYPE.success:
                if (header == '') {
                    header = ' Success';
                }
                $class = 'jq-has-icon jq-toast-success';
                header = '<i class="far fa-check-circle"></i> ' + header;
                break;
            case HKALERT.TYPE.warning:
                if (header == '') {
                    header = ' Warning';
                }
                $class = 'jq-has-icon jq-toast-warning';
                header = '<i class="fas fa-exclamation"></i>' + header;
                break;
            case HKALERT.TYPE.error:
                if (header == '') {
                    header = ' Error';
                }
                $class = 'jq-has-icon jq-toast-danger';
                header = '<i class="fas fa-exclamation-triangle"></i>' + header;
                break;
            case HKALERT.TYPE.information:
                if (header == '') {
                    header = ' Information';
                }
                $class = 'jq-has-icon jq-toast-info';
                header = '<i class="fas fa-info"></i>' + header;
                break;
        }
        $.toast().reset('all');
        $.toast({
            heading: header,
            text: text,
            position: HKALERT.position,
            loaderBg: HKALERT.loaderBg,
            class: $class,
            hideAfter: HKALERT.delay,
            stack: 6,
            showHideTransition: HKALERT.effect
        });
        HKLOADING.hide();

        return false;
    },
    showError: function (data) {

        HKALERT.show('', data.error, HKALERT.TYPE.error);
    },
    showOk: function (message) {
        HKALERT.show('', message, HKALERT.TYPE.success);
    },
    show: function (header, text, type) {

        var $class = '';
        switch (type) {
            case HKALERT.TYPE.success:
                if (header == '') {
                    header = ' Success';
                }
                $class = 'jq-has-icon jq-toast-success';
                header = '<i class="far fa-check-circle"></i> ' + header;
                break;
            case HKALERT.TYPE.warning:
                if (header == '') {
                    header = ' Warning';
                }
                $class = 'jq-has-icon jq-toast-warning';
                header = '<i class="fas fa-exclamation"></i>' + header;
                break;
            case HKALERT.TYPE.error:
                if (header == '') {
                    header = ' Error';
                }
                $class = 'jq-has-icon jq-toast-danger';
                header = '<i class="fas fa-exclamation-triangle"></i>' + header;
                break;
            case HKALERT.TYPE.information:
                if (header == '') {
                    header = ' Information';
                }
                $class = 'jq-has-icon jq-toast-info';
                header = '<i class="fas fa-info"></i>' + header;
                break;
        }
        $.toast().reset('all');
        $.toast({
            heading: header,
            text: text,
            position: HKALERT.position,
            loaderBg: HKALERT.loaderBg,
            class: $class,
            hideAfter: HKALERT.delay,
            stack: 6,
            showHideTransition: HKALERT.effect
        });
        HKLOADING.hide();
        return false;
    }
}
var HKMODAL = {
    TYPE: {
        confirm: 'confirm',
        information: 'information'
    },
    addArray: function (data) {
        var $ul = $('<ul></ul>');
        for ($i = 0; $i < data.length; $i++) {
            $ul.append('<li>' + data[i] + '</li>');
        }
        $('#hk-modal-page-content').html('').append($ul);
    },
    setText: function (text) {
        $('#hk-modal-page-content').html('').append(text);
    },
    setTitle: function (title) {
        $('#hk-modal-page-title').html('').append(title);
    },
    setButtonCancel: function (text) {
        $('#hk-modal-page-cancel').html('').append(text);
    },
    setButtonOk: function (text) {
        $('#hk-modal-page-ok').html('').append(text);
    },
    setType: function (type) {
        var $ob = $('#hk-modal-page');
        switch (type) {
            case HKMODAL.TYPE.information:
                HKMODAL.setTitle(HKOB.getModalTitleOk($ob));
                HKMODAL.setButtonOk(HKOB.getModalTextOk($ob));
                break;
            case HKMODAL.TYPE.confirm:
                HKMODAL.setTitle(HKOB.getModalTitleConfirm($ob));
                HKMODAL.setButtonOk(HKOB.getModalTextConfirm($ob));
                break;
        }
    },
    show: function (cb) {
        var $ob = HKMODAL.hide();
        cb = cb || '';
        $('#hk-modal-page-ok').unbind('click').click(function () {
            HKMODAL.hide();
            if (typeof (cb) === 'function') {
                return cb();
            }
        });
        $ob.modal('show');
    },
    hide: function () {
        var $ob = $('#hk-modal-page');
        $ob.modal('hide');
        return $ob;
    }
};
var HKFORM = {
    editorOptions: {

    },
    editorOptionMins: {
        toolbarGroups: [
            { name: 'styles' },
            { name: 'basicstyles', groups: ['basicstyles', 'undo'] },
            { name: 'colors' },
            { name: 'paragraph', groups: ['list', 'align'] },
            { name: 'insert' },
            { name: 'others' }
        ]
    },
    edtiors: [],
    classError: 'border-danger',
    reInit: function () {
        $('input.hk-form, button.hk-form, a.hk-form').unbind('click').click(function () {
            if (HKLOADING.isLoading) {
                return;
            }
            HKLOADING.show();
            var $ob = $(this);

            var $form = null;
            if (HKOB.getRefId($ob) != '') {
                $form = $('form#' + HKOB.getRefId($ob));
            }
            if (!$form) {
                $form = $('form[name=' + HKOB.getRefName($ob) + ']');
            }
            $form.submit(function () {
                return false;
            });
            try {
                /*for (var i = 0; HKFORM.edtiors.length; i++) {
                    var $formElement = $('#' + HKFORM.edtiors[i].sourceElement.id);
                    if ($formElement) {
                        $formElement.val(HKFORM.edtiors[i].getData());
                    }
                }*/
                if (CKEDITOR && typeof (CKEDITOR) != 'undefined') {
                    $form.find('textarea.hk-editor').each(function () {
                        var $textarea = $(this);
                        $textarea.val(CKEDITOR.instances[$textarea.attr('id')].getData());
                    });
                    $form.find('textarea.hk-editor-min').each(function () {
                        var $textarea = $(this);
                        $textarea.val(CKEDITOR.instances[$textarea.attr('id')].getData());
                    });
                    $('input.hk-money').each(function () {
                        $(this).val(HKMONEY.replace($(this).val()));
                    });
                }
            } catch (ex) { }

            if (HKFORM.FORM.isValidateForm($form)) {
                var url = HKOB.getUrl($ob);
                if (!url || url == '') {
                    $form.submit();
                    return false;
                }
                var submit = function ($url) {
                    $url = $url || url;
                    var $option = {
                        'type': 'POST',
                        'url': $url,
                        'success': function (data) {
                            HKLOADING.hide();
                            var callbackAfter = HKOB.getCallBackAfter($ob);
                            if (callbackAfter != '' && typeof (window[callbackAfter]) === 'function') {
                                var fn = window[callbackAfter];
                                return fn(data);
                            }
                            if (!HKCOMMON.isOk(data)) {
                                HKALERT.show('', data.error, HKALERT.TYPE.error);
                            }
                        }, 'error': function (e) {
                            HKLOADING.hide();
                            var formError = HKOB.getFormError($ob);
                            if (formError != '') {
                                HKALERT.show('', data.formError, HKALERT.TYPE.error);
                            }
                        }
                    }
                    if (HKOB.getFormIsMultiPart($ob) == '1') {
                        $option.data = new FormData($form[0]);
                        // $option.async = false;
                        $option.cache = false;
                        $option.contentType = false;
                        $option.processData = false;
                    } else {
                        $option.dataType = 'json';
                        $option.data = $form.serialize();
                    }
                    $.ajax($option);
                };
                var callbackBefore = HKOB.getCallBackBefore($ob);
                if (callbackBefore != '' && typeof (window[callbackBefore]) === 'function') {
                    var f = window[callbackBefore];
                    if (f($ob)) {
                        submit(HKOB.getUrl($ob));
                    }
                    return false;
                }
                submit();
                return false;
            }
        });
    },
    init: function () {
        //ClassicEditor.builtinPlugins.map(plugin => { console.log(plugin.pluginName) });

        HKFORM.FORM.editorInit();
    },
    FORM: {
        editorInit: function () {
            $('textarea.hk-editor').each(function () {
                $ob = $(this);
                HKFORM.FORM.renderEditor($ob);
            });
            $('textarea.hk-editor-min').each(function () {
                $ob = $(this);
                HKFORM.FORM.renderEditorMin($ob);
            });
        },
        renderEditorMin: function ($ob, f) {

            if (CKEDITOR && typeof (CKEDITOR) !== 'undefined') {
                CKEDITOR.replace($ob.attr('id'), HKFORM.editorOptionMins);
                CKEDITOR.on("instanceReady", function (event) {
                    if (f) {
                        f();
                    }
                });
            }
        },
        renderEditor: function ($ob, f) {

            if (CKEDITOR && typeof (CKEDITOR) !== 'undefined') {
                CKEDITOR.replace($ob.attr('id'), HKFORM.editorOptions);
                CKEDITOR.on("instanceReady", function (event) {
                    if (f) {
                        f();
                    }
                });
            }

            /*if (ClassicEditor && typeof (ClassicEditor) !== 'undefined') {
                ClassicEditor.create(document.querySelector('#' + $ob.attr('id')), {
                    extraPlugins: [ MyCustomUploadAdapterPlugin ]

                }).then(editor => {
                    HKFORM.edtiors.push(editor);
                    if (f) {
                        f(editor);
                    }
                }).catch(error => {
                    //console.log(error);
                });;
            }*/
        },
        isValidate: function ($ob) {
            var error = '';
            if (!$ob || !$ob.val()) {
                //return false;
            }
            var val = $ob.val().trim();
            if (HKOB.getValidateRequired($ob) == '1') {
                error = HKOB.getValidateRequiredError($ob);
                var vcheck = 0;
                if (HKOB.getValidateRequired($ob) == 'none-negative') {
                    vcheck = -1;
                }
                if (val == '' || val == $ob.attr("placeholder") || (parseInt(val, 10) <= vcheck && $ob.is('select'))) {
                    $ob.removeClass(HKFORM.classError).addClass(HKFORM.classError);
                    return error;
                }
            }
            if (HKOB.getValidateEmailOrTel($ob) == '1') {
                error = HKOB.getValidateEmailOrTelError($ob);
                if (val != '' && !HKVALIDATOR.isEmail(val) && HKVALIDATOROR.isPhoneNumber(val)) {
                    $ob.removeClass(HKFORM.classError).addClass(HKFORM.classError);
                    return error;
                }
            }
            if (HKOB.getValidateGroupRequired($ob) == '1') {
                error = HKOB.getValidateGroupRequiredError($ob);
                var isError = true;
                $('*[hk-data-group=' + HKOB.getGroup($ob) + ']').each(function () {
                    val = ($(this).is(':checkbox') ? ($(this).is(':checked') ? $(this).val() : '') : $(this).val());
                    if (val != '') {
                        isError = false;
                    }
                });
                if (isError) {
                    $ob.removeClass(HKFORM.classError).addClass(HKFORM.classError);
                    return error;
                }
            }
            if (HKOB.getValidateNumber($ob) == '1') {
                error = HKOB.getValidateNumberError($ob);
                if (val != '' && !HKVALIDATOR.isNumber(val)) {
                    $ob.removeClass(HKFORM.classError).addClass(HKFORM.classError);
                    return error;
                }
            }
            if (HKOB.getValidateZipcodeFormat($ob) == '1') {
                error = HKOB.getValidateZipcodeFormatError($ob);
                if (val != '' && !HKVALIDATOR.isNumberNoneNegative(val)) {
                    $ob.removeClass(HKFORM.classError).addClass(HKFORM.classError);
                    return error;
                }
            }
            if (HKOB.getValidateNonNegative($ob) == '1') {
                error = HKOB.getValidateNonNegativeError($ob);

                if (val != '' && !HKVALIDATOR.isNumberNoneNegative(val)) {
                    $ob.removeClass(HKFORM.classError).addClass(HKFORM.classError);
                    return error;
                }
            }

            if (HKOB.getValidatePhoneNumber($ob) == '1') {
                error = HKOB.getValidatePhoneNumberError($ob);
                if (val != '' && !HKVALIDATOR.isPhoneNumber(val)) {
                    $ob.removeClass(HKFORM.classError).addClass(HKFORM.classError);
                    return error;
                }
            }

            if (HKOB.getValidateNotExist($ob) == '1') {
                if (val != '') {
                    error = HKOB.getValidateNotExistError($ob);
                    id = $('.' + HKOB.getRefClass($ob)).val();
                    var $isAjaxCheck = false;
                    //HKLOADING.show();
                    $.ajax({
                        'url': HKOB.getUrl($ob),
                        'type': 'POST',
                        'async': false,
                        'data': {
                            'params': HKOB.getParams($ob),
                            'val': val,
                            'id': id
                        },
                        'success': function (data) {
                            //HKLOADING.hide();
                            if (HKCOMMON.isOk(data) && parseInt(data.data.isExist, 10) != 0) {
                                $isAjaxCheck = true;
                            }
                        }, 'error': function (e) {
                            $isAjaxCheck = true;
                        }
                    });
                    if ($isAjaxCheck) {
                        $ob.removeClass(HKFORM.classError).addClass(HKFORM.classError);
                        return error;
                    }
                }
            }
            if (HKOB.getValidateEmail($ob) == '1') {
                error = HKOB.getValidateEmailError($ob);
                if (val != '' && !HKVALIDATOR.isEmail(val)) {
                    $ob.removeClass(HKFORM.classError).addClass(HKFORM.classError);
                    return error;
                }
            }
            if (HKOB.getValidateMin($ob) != '') {
                error = HKOB.getValidateMinError($ob);
                if (val != '' && val.length < parseInt(HKOB.getValidateMin($ob), 10)) {
                    $ob.removeClass(HKFORM.classError).addClass(HKFORM.classError);
                    return error;
                }
            }

            if (HKOB.getValidateMax($ob) != '') {
                error = HKOB.getValidateMaxError($ob);
                if (val != '' && val.length > parseInt(HKOB.getValidateMax($ob), 10)) {
                    $ob.removeClass(HKFORM.classError).addClass(HKFORM.classError);
                    return error;
                }
            }
            if (HKOB.getValidateNumberMin($ob) != '') {
                error = HKOB.getValidateNumberMinError($ob);
                if (val == '' || parseInt(val, 10) < parseInt(HKOB.getValidateNumberMin($ob), 10)) {
                    $ob.removeClass(HKFORM.classError).addClass(HKFORM.classError);
                    return error;
                }
            }

            if (HKOB.getValidateNumberMax($ob) != '') {
                error = HKOB.getValidateNumberMaxError($ob);
                if (val == '' || parseInt(val, 10) > parseInt(HKOB.getValidateNumberMax($ob), 10)) {
                    $ob.removeClass(HKFORM.classError).addClass(HKFORM.classError);
                    return error;
                }
            }
            if (HKOB.getValidateConfirm($ob) == '1') {
                error = HKOB.getValidateConfirmError($ob);
                var $obc = null;
                if (HKOB.getRefId($ob) != '') {
                    $obc = $('#' + HKOB.getRefId($ob));
                }
                if (!$obc) {
                    $obc = $('input.' + HKOB.getRefClass($ob));
                }
                if (!$obc || !$obc.val()) {
                    //return false;
                }
                var val2 = $obc.val().trim();
                if (val != val2 && val2 != '') {
                    $ob.removeClass(HKFORM.classError).addClass(HKFORM.classError);
                    return error;
                }
            }
            if (HKOB.getValidateCustom($ob) == '1') {
                var callback = HKOB.getValidateCustomCallback($ob);
                if (callback != '') {
                    var f = window[callback];
                    if (typeof (f) === 'function') {
                        var error = f($ob);
                        if (error !== 0) {
                            $ob.removeClass(HKFORM.classError).addClass(HKFORM.classError);
                            return error;
                        }
                        $ob.removeClass(HKFORM.classError);
                        return 0;
                    }
                    $ob.removeClass(HKFORM.classError).addClass(HKFORM.classError);
                    return HKOB.getValidateCustomError($ob);
                }
            }
            $ob.removeClass(HKFORM.classError);
            return 0;
        },
        isValidateForm: function ($form) {
            var $arrErrors = [];
            //HKLOADING.show();
            $form.find('input.hk-check, textarea.hk-check, select.hk-check').each(function () {
                var $isError = HKFORM.FORM.isValidate($(this));
                if ($isError !== 0) {
                    $arrErrors.push($isError);
                }
            });
            //HKLOADING.hide();
            if ($arrErrors.length > 0) {
                HKALERT.showArray('', $arrErrors, HKALERT.TYPE.error);
                return false;
            }
            return true;
        }
    },
    CHECKBOX: {
        isCheckedOne: function ($obs) {
            var $isCheckedOne = false;
            $obs.each(function () {
                if (HKFORM.CHECKBOX.isChecked($(this))) {
                    $isCheckedOne = true;
                }
            });
            return $isCheckedOne;
        },
        isCheckedAll: function ($obs) {
            var $isCheckedAll = true;
            $obs.each(function () {
                if (!HKFORM.CHECKBOX.isChecked($(this))) {
                    $isCheckedAll = false;
                }
            });
            return $isCheckedAll;
        },
        isChecked: function ($ob) {
            return $ob.is(':checked');
        },
        check: function ($ob, isChecked) {
            $ob.prop('checked', isChecked);
        },
        checkAllList: function ($obs, isChecked) {
            $obs.each(function () {
                HKFORM.CHECKBOX.check($(this), isChecked);
            });
        },
    },
    SELECT: {
        setSelected: function ($ob, $val = '') {
            if ($val != '') {
                $ob.val($val);
                return;
            }
            var selected = HKOB.getSelected($ob);
            if (selected != '') {
                $ob.val(selected);
                return;
            }
            $ob.val($ob.find('option:first').val());
        },
        addOption: function ($ob, data) {
            $ob.html('');
            data = data.data;
            for (var i = 0; i < data.length; i++) {
                var $option = $('<option value=""></option>');
                $option.text(data[i].name);
                $option.val(data[i].id);
                $ob.append($option);
            }
            HKFORM.SELECT.addOptionPlaceholder($ob);
        },
        addOptionPlaceholder: function ($ob) {
            if ($ob.attr('placeholder')) {
                var $option = $('<option value=""></option>');
                $option.text($ob.attr('placeholder'));
                $option.val('-1');
                $ob.prepend($option);
                if (window.location.pathname.indexOf('/add') >= 0) {
                    $ob.val('-1');
                }
            }
            if ($ob.find('> option').length == 1) {
                $ob.val('-1');
            }
            HKFORM.SELECT.setSelected($ob);
        }
    }
};
var HKAJAX = {
    METHOD_GET: 'GET',
    METHOD_POST: 'POST',
    error: function (error) {
        HKLOADING.hide();
        HKALERT.show('Error', 'Vui lòng kiểm tra lại đường truyền và thử lại ! <br/> Can not connect to server, please checking your internet and try again !', HKALERT.TYPE.error);
    },
    send: function (url, data, fx, method) {
        method = method || 'GET';
        $.ajax({
            'type': method,
            'url': url,
            'dataType': 'json',
            'data': data,
            'success': fx,
            'error': HKAJAX.error
        });
    },
};
var HKCOMMON = {
    ACTIVE_CLASS: '-active',
    VOID: 'javascript:void(0);',
    isOk: function (data) {
        return parseInt(data.status, 10) == 0;
    },
    reInit: function () {
        $('select.hk-source-reinit').each(function () {
            var $ob = $(this);
            var url = HKOB.getUrl($ob);
            if (url) {
                HKAJAX.send(url, {
                    'params': HKOB.getParams($ob)
                }, function (data) {
                    HKLOADING.hide();
                    if (HKCOMMON.isOk(data)) {
                        HKFORM.SELECT.addOption($ob, data.data);
                        $ob.trigger('change');
                        //$ref.trigger('change');
                    }
                });
            }
        });
        $('.hk-reinit-action').each(function () {
            var $ob = $(this);
            $ob.unbind('click').click(function () {
                var url = HKOB.getUrl($ob);
                if (url != '') {
                    var callbackBeforeShow = $ob.attr('hk-callback-before-show');
                    if (typeof (window[callbackBeforeShow]) === 'function') {
                        var fnb = window[callbackBeforeShow];
                        if (!fnb($ob)) {
                            return
                        };
                    }
                    var submit = function () {
                        HKAJAX.send(url, {
                            id: HKOB.getId($ob),
                            params: HKOB.getParams($ob),
                        }, function (data) {
                            var callback = HKOB.getCallBackAfter($ob);
                            if (typeof (window[callback]) === 'function') {
                                var fn = window[callback];
                                return fn(data);
                            }
                        }, HKOB.getMethod($ob));
                    }
                    if (HKOB.getIsConfirm($ob) == '1') {
                        HKMODAL.setText(HKOB.getIsConfirmText($ob));
                        HKMODAL.setTitle(HKOB.getModalTitleConfirm($ob));
                        HKMODAL.setButtonOk(HKOB.getModalTextConfirm($ob));
                        if (HKOB.getModalTitleConfirm($ob) == '') {
                            HKMODAL.setType(HKMODAL.TYPE.confirm);
                        }
                        HKMODAL.show(function () {
                            var callbackBefore = HKOB.getCallBackBefore($ob);
                            if (typeof (window[callbackBefore]) === 'function') {
                                var fnb = window[callbackBefore];
                                if (fnb($ob)) {
                                    submit();
                                };
                                return;
                            }
                            submit();
                        });
                        return;
                    }
                    var callbackBefore = HKOB.getCallBackBefore($ob);
                    if (typeof (window[callbackBefore]) === 'function') {
                        var fnb = window[callbackBefore];
                        if (fnb($ob)) {
                            submit();
                        };
                        return;
                    }
                    submit();
                }
            });
        });
    },
    init: function () {
        $('select.hk-placeholder').each(function () {
            var $ob = $(this);
            HKFORM.SELECT.addOptionPlaceholder($ob);
        });
        $('select.hk-source-ref').each(function () {
            var $ob = $(this);
            if (HKOB.getRefClass($ob) != '') {
                var $ref = $('select.' + HKOB.getRefClass($ob));
                if ($ref) {
                    $ref.change(function () {
                        var url = HKOB.getUrl($ob);
                        if (url) {
                            HKLOADING.show();
                            var $cateId = $(this).val();
                            HKAJAX.send(url, {
                                'cate_id': $cateId,
                                'params': HKOB.getParams($ob)
                            }, function (data) {
                                HKLOADING.hide();
                                if (HKCOMMON.isOk(data)) {
                                    HKFORM.SELECT.addOption($ob, data.data);
                                    $ob.trigger('change');
                                }
                            });
                        }
                    });
                }
            }
        });
        $('select.hk-source').each(function () {
            var $ob = $(this);
            var url = HKOB.getUrl($ob);
            if (url) {
                HKAJAX.send(url, {
                    'params': HKOB.getParams($ob)
                }, function (data) {
                    HKLOADING.hide();
                    if (HKCOMMON.isOk(data)) {
                        HKFORM.SELECT.addOption($ob, data.data);
                        $ob.trigger('change');
                        //$ref.trigger('change');
                    }
                });
            }
        });
    }
}
$(function () {
    HKCOMMON.init();
    HKCOMMON.reInit();
    HKFORM.init();
    HKFORM.reInit();
    HKMONEY.init();
});