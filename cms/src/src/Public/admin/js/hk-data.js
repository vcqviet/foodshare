var HKOB = {
    getCallBack: function ($ob) {
        return $ob.attr('hk-callback') || '';
    },
    getCallBackBefore: function ($ob) {
        return $ob.attr('hk-callback-before') || '';
    },
    getCallBackAfter: function ($ob) {
        return $ob.attr('hk-callback-after') || '';
    },
    getParams: function ($ob) {
        return JSON.stringify(JSON.parse($ob.attr('hk-data-params') || '{}'));
    },
    setParams: function ($ob, $val) {
        return $ob.attr('hk-data-params', $val);
    },
    getUrl: function ($ob) {
        return $ob.attr('hk-data-url') || '';
    },
    setUrl: function ($ob, $val) {
        return $ob.attr('hk-data-url', $val);
    },
    getMethod: function ($ob) {
        return $ob.attr('hk-data-method') || '';
    },
    setMethod: function ($ob, $val) {
        return $ob.attr('hk-data-method', $val);
    },
    getId: function ($ob) {
        return $ob.attr('hk-data-id') || '-1';
    },
    setId: function ($ob, $val) {
        return $ob.attr('hk-data-id', $val);
    },
    getIsConfirm: function ($ob) {
        return $ob.attr('hk-data-is-confirm') || '0';
    },
    setIsConfirm: function ($ob, $val) {
        return $ob.attr('hk-data-is-confirm', $val);
    },
    getIsConfirmText: function ($ob) {
        return $ob.attr('hk-data-is-confirm-text') || '';
    },
    setIsConfirmText: function ($ob, $val) {
        return $ob.attr('hk-data-is-confirm-text', $val);
    },
    getType: function ($ob) {
        return $ob.attr('hk-data-type') || '-1';
    },
    setType: function ($ob, $val) {
        return $ob.attr('hk-data-type', $val);
    },
    getIsReload: function ($ob) {
        return $ob.attr('hk-data-is-reload') || '';
    },
    setIsReload: function ($ob, $val) {
        return $ob.attr('hk-data-is-reload', $val);
    },
    getSelected: function ($ob) {
        return $ob.attr('hk-data-selected') || '';
    },
    setSelected: function ($ob, $val) {
        return $ob.attr('hk-data-selected', $val);
    },
    getRefId: function ($ob) {
        return $ob.attr('hk-ref-id') || '';
    },
    setRefId: function ($ob, $val) {
        return $ob.attr('hk-ref-id', $val);
    },
    getRefName: function ($ob) {
        return $ob.attr('hk-ref-name') || '';
    },
    setRefName: function ($ob, $val) {
        return $ob.attr('hk-ref-name', $val);
    },
    getRefClass: function ($ob) {
        return $ob.attr('hk-ref-class') || '';
    },
    setRefClass: function ($ob, $val) {
        return $ob.attr('hk-ref-class', $val);
    },
    getFormError: function ($ob) {
        return $ob.attr('hk-form-error') || '';
    },
    setFormError: function ($ob, $val) {
        return $ob.attr('hk-form-error', $val);
    },
    getFormIsMultiPart: function ($ob) {
        return $ob.attr('hk-form-is-multipart') || '';
    },
    setFormIsMultiPart: function ($ob, $val) {
        return $ob.attr('hk-form-is-multipart', $val);
    },
    getValidateRequired: function ($ob) {
        return $ob.attr('hk-validate-required') || '';
    },
    setValidateRequired: function ($ob, $val) {
        return $ob.attr('hk-validate-required', $val);
    },
    getValidateRequiredError: function ($ob) {
        return $ob.attr('hk-validate-required-error') || '';
    },
    setValidateRequiredError: function ($ob, $val) {
        return $ob.attr('hk-validate-required-error', $val);
    },
    getValidateEmailOrTel: function ($ob) {
        return $ob.attr('hk-validate-email-or-tel') || '';
    },
    setValidateEmailOrTel: function ($ob, $val) {
        return $ob.attr('hk-validate-email-or-tel', $val);
    },
    getValidateEmailOrTelError: function ($ob) {
        return $ob.attr('hk-validate-email-or-tel-error') || '';
    },
    setValidateEmailOrTelError: function ($ob, $val) {
        return $ob.attr('hk-validate-email-or-tel-error', $val);
    },
    getValidateGroupRequired: function ($ob) {
        return $ob.attr('hk-validate-group-required') || '';
    },
    setValidateGroupRequired: function ($ob, $val) {
        return $ob.attr('hk-validate-group-required', $val);
    },
    getValidateGroupRequiredError: function ($ob) {
        return $ob.attr('hk-validate-group-required-error') || '';
    },
    setValidateGroupRequiredError: function ($ob, $val) {
        return $ob.attr('hk-validate-group-required-error', $val);
    },
    getGroup: function ($ob) {
        return $ob.attr('hk-data-group') || '';
    },
    setGroup: function ($ob, $val) {
        return $ob.attr('hk-data-group', $val);
    },
    getValidateNumber: function ($ob) {
        return $ob.attr('hk-validate-number') || '';
    },
    setValidateNumber: function ($ob, $val) {
        return $ob.attr('hk-validate-number', $val);
    },
    getValidateNumberError: function ($ob) {
        return $ob.attr('hk-validate-number-error') || '';
    },
    setValidateNumberError: function ($ob, $val) {
        return $ob.attr('hk-validate-number-error', $val);
    },
    getValidateZipcodeFormat: function ($ob) {
        return $ob.attr('hk-validate-zipcode-format') || '';
    },
    setValidateZipcodeFormat: function ($ob, $val) {
        return $ob.attr('hk-validate-zipcode-format', $val);
    },
    getValidateZipcodeFormatError: function ($ob) {
        return $ob.attr('hk-validate-zipcode-format-error') || '';
    },
    setValidateZipcodeFormatError: function ($ob, $val) {
        return $ob.attr('hk-validate-zipcode-format-error', $val);
    },
    getValidateNonNegative: function ($ob) {
        return $ob.attr('hk-validate-non-negative') || '';
    },
    setValidateNonNegative: function ($ob, $val) {
        return $ob.attr('hk-validate-non-negative', $val);
    },
    getValidateNonNegativeError: function ($ob) {
        return $ob.attr('hk-validate-non-negative-error') || '';
    },
    setValidateNonNegativeError: function ($ob, $val) {
        return $ob.attr('hk-validate-non-negative-error', $val);
    },
    getValidatePhoneNumber: function ($ob) {
        return $ob.attr('hk-validate-phone-number') || '';
    },
    setValidatePhoneNumber: function ($ob, $val) {
        return $ob.attr('hk-validate-phone-number', $val);
    },
    getValidatePhoneNumberError: function ($ob) {
        return $ob.attr('hk-validate-phone-number-error') || '';
    },
    setValidatePhoneNumberError: function ($ob, $val) {
        return $ob.attr('hk-validate-phone-number-error', $val);
    },
    getValidateNotExist: function ($ob) {
        return $ob.attr('hk-validate-not-exist') || '';
    },
    setValidateNotExist: function ($ob, $val) {
        return $ob.attr('hk-validate-not-exist', $val);
    },
    getValidateNotExistError: function ($ob) {
        return $ob.attr('hk-validate-not-exist-error') || '';
    },
    setValidateNotExistError: function ($ob, $val) {
        return $ob.attr('hk-validate-not-exist-error', $val);
    },
    getValidateEmail: function ($ob) {
        return $ob.attr('hk-validate-email') || '';
    },
    setValidateEmail: function ($ob, $val) {
        return $ob.attr('hk-validate-email', $val);
    },
    getValidateEmailError: function ($ob) {
        return $ob.attr('hk-validate-email-error') || '';
    },
    setValidateEmailError: function ($ob, $val) {
        return $ob.attr('hk-validate-email-error', $val);
    },
    getValidateMin: function ($ob) {
        return $ob.attr('hk-validate-min') || '';
    },
    setValidateMin: function ($ob, $val) {
        return $ob.attr('hk-validate-min', $val);
    },
    getValidateMinError: function ($ob) {
        return $ob.attr('hk-validate-min-error') || '';
    },
    setValidateMinError: function ($ob, $val) {
        return $ob.attr('hk-validate-min-error', $val);
    },
    getValidateMax: function ($ob) {
        return $ob.attr('hk-validate-max') || '';
    },
    setValidateMax: function ($ob, $val) {
        return $ob.attr('hk-validate-max', $val);
    },
    getValidateMaxError: function ($ob) {
        return $ob.attr('hk-validate-max-error') || '';
    },
    setValidateMaxError: function ($ob, $val) {
        return $ob.attr('hk-validate-max-error', $val);
    },
    getValidateConfirm: function ($ob) {
        return $ob.attr('hk-validate-confirm') || '';
    },
    setValidateConfirm: function ($ob, $val) {
        return $ob.attr('hk-validate-confirm', $val);
    },
    getValidateConfirmError: function ($ob) {
        return $ob.attr('hk-validate-confirm-error') || '';
    },
    setValidateConfirmError: function ($ob, $val) {
        return $ob.attr('hk-validate-confirm-error', $val);
    },
    getPage: function ($ob) {
        return $ob.attr('hk-data-page') || '';
    },
    setPage: function ($ob, $val) {
        return $ob.attr('hk-data-page', $val);
    },
    getLimit: function ($ob) {
        return $ob.attr('hk-data-limit') || '';
    },
    setLimit: function ($ob, $val) {
        return $ob.attr('hk-data-limit', $val);
    },
    getIsPublished: function ($ob) {
        return $ob.attr('hk-data-is-published') || '';
    },
    setIsPublished: function ($ob, $val) {
        return $ob.attr('hk-data-is-published', $val);
    },
    getIsPublishedText: function ($ob) {
        return $ob.attr('hk-data-is-published-text') || '';
    },
    setIsPublishedText: function ($ob, $val) {
        return $ob.attr('hk-data-is-published-text', $val);
    },
    getUrlBase: function ($ob) {
        return $ob.attr('hk-data-url-base') || '';
    },
    setUrlBase: function ($ob, $val) {
        return $ob.attr('hk-data-url-base', $val);
    },
    getUrlFilter: function ($ob) {
        return $ob.attr('hk-data-url-filter') || '';
    },
    setUrlFilter: function ($ob, $val) {
        return $ob.attr('hk-data-url-filter', $val);
    },
    getPaginatorLength: function ($ob) {
        return $ob.attr('hk-data-paginator-length') || '';
    },
    setPaginatorLength: function ($ob, $val) {
        return $ob.attr('hk-data-paginator-length', $val);
    },
    getLimitText: function ($ob) {
        return $ob.attr('hk-data-limit-text') || '';
    },
    setLimitText: function ($ob, $val) {
        return $ob.attr('hk-data-limit-text', $val);
    },
    getModalTextOk: function ($ob) {
        return $ob.attr('hk-data-modal-text-ok') || '';
    },
    setModalTextOk: function ($ob, $val) {
        return $ob.attr('hk-data-modal-text-ok', $val);
    },
    getModalTextConfirm: function ($ob) {
        return $ob.attr('hk-data-modal-text-confirm') || '';
    },
    setModalTextConfirm: function ($ob, $val) {
        return $ob.attr('hk-data-modal-text-confirm', $val);
    },
    getModalTitleConfirm: function ($ob) {
        return $ob.attr('hk-data-modal-title-confirm') || '';
    },
    setModalTitleConfirm: function ($ob, $val) {
        return $ob.attr('hk-data-modal-title-confirm', $val);
    },
    getModalTitleOk: function ($ob) {
        return $ob.attr('hk-data-modal-title-ok') || '';
    },
    setModalTitleOk: function ($ob, $val) {
        return $ob.attr('hk-data-modal-title-ok', $val);
    },
    getAdminCheckedRequireError: function ($ob) {
        return $ob.attr('hk-data-admin-checked-require-error') || '';
    },
    setAdminCheckedRequireError: function ($ob, $val) {
        return $ob.attr('hk-data-admin-checked-require-error', $val);
    },
    getValidateCustom: function ($ob) {
        return $ob.attr('hk-validate-custom') || '';
    },
    setValidateCustom: function ($ob, $val) {
        return $ob.attr('hk-validate-custom', $val);
    },
    getValidateCustomError: function ($ob) {
        return $ob.attr('hk-validate-custom-error') || '';
    },
    setValidateCustomError: function ($ob, $val) {
        return $ob.attr('hk-validate-custom-error', $val);
    },
    getValidateCustomCallback: function ($ob) {
        return $ob.attr('hk-validate-custom-callback') || '';
    },
    setValidateCustomCallback: function ($ob, $val) {
        return $ob.attr('hk-validate-custom-callback', $val);
    },
    getLevel: function ($ob) {
        return $ob.attr('hk-data-level') || '';
    },
    setLevel: function ($ob, $val) {
        return $ob.attr('hk-data-level', $val);
    },
    getModule: function ($ob) {
        return $ob.attr('hk-data-module') || '';
    },
    setModule: function ($ob, $val) {
        return $ob.attr('hk-data-module', $val);
    },
    getIsMultiLanguages: function ($ob) {
        return $ob.attr('hk-data-is-multi-languages') || '';
    },
    setIsMultiLanguages: function ($ob, $val) {
        return $ob.attr('hk-data-is-multi-languages', $val);
    },
    getLang: function ($ob) {
        return $ob.attr('hk-data-lang') || '';
    },
    setLang: function ($ob, $val) {
        return $ob.attr('hk-data-lang', $val);
    },
    getCurrentLang: function ($ob) {
        return $ob.attr('hk-data-current-lang') || '';
    },
    setCurrentLang: function ($ob, $val) {
        return $ob.attr('hk-data-current-lang', $val);
    },
    getSize: function ($ob) {
        return $ob.attr('hk-data-size') || '';
    },
    setSize: function ($ob, $val) {
        return $ob.attr('hk-data-size', $val);
    },
    getCount: function ($ob) {
        return $ob.attr('hk-data-count') || '';
    },
    setCount: function ($ob, $val) {
        return $ob.attr('hk-data-count', $val);
    },
    getQuantity: function ($ob) {
        return $ob.attr('hk-data-quantity') || '';
    },
    setQuantity: function ($ob, $val) {
        return $ob.attr('hk-data-quantity', $val);
    },
    getPrice: function ($ob) {
        return $ob.attr('hk-data-price') || '';
    },
    setPrice: function ($ob, $val) {
        return $ob.attr('hk-data-price', $val);
    },
    getError: function ($ob) {
        return $ob.attr('hk-data-error') || '';
    },
    setError: function ($ob, $val) {
        return $ob.attr('hk-data-error', $val);
    },
    getTotalPage: function ($ob) {
        return $ob.attr('hk-data-total-page') || '';
    },
    setTotalPage: function ($ob, $val) {
        return $ob.attr('hk-data-total-page', $val);
    },
    getValidateNumberMin: function ($ob) {
        return $ob.attr('hk-validate-number-min') || '';
    },
    setValidateNumberMin: function ($ob, $val) {
        return $ob.attr('hk-validate-number-min', $val);
    },
    getValidateNumberMinError: function ($ob) {
        return $ob.attr('hk-validate-number-min-error') || '';
    },
    setValidateNumberMinError: function ($ob, $val) {
        return $ob.attr('hk-validate-number-min-error', $val);
    },
    getValidateNumberMax: function ($ob) {
        return $ob.attr('hk-validate-number-max') || '';
    },
    setValidateNumberMax: function ($ob, $val) {
        return $ob.attr('hk-validate-number-max', $val);
    },
    getValidateNumberMaxError: function ($ob) {
        return $ob.attr('hk-validate-number-max-error') || '';
    },
    setValidateNumberMaxError: function ($ob, $val) {
        return $ob.attr('hk-validate-number-max-error', $val);
    },
}