<?php

namespace HK\CoreBundle\Helper;

use Symfony\Component\VarDumper\VarDumper;

class FormHelper
{

    public static function debug($form)
    {
        VarDumper::dump($form->getErrors(true));
        die();
    }

    public static $_ELEMENT_TYPE_TEXT = 'text';
    public static $_ELEMENT_TYPE_DATE = 'date';
    public static $_ELEMENT_TYPE_TEXTAREA = 'textarea';
    public static $_ELEMENT_TYPE_SELECT = 'select';
    public static $_ELEMENT_TYPE_CHECKBOX = 'checkbox';
    public static $_ELEMENT_TYPE_RADIO = 'radio';
    public static $_ELEMENT_TYPE_EDITOR = 'editor';

    public static $_METHOD_POST = 'POST';
    public static $_METHOD_GET = 'GET';

    public static $_FORM_TYPE_ADD = '_add';
    public static $_FORM_TYPE_EDIT = '_edit';
    

    public static $_FORM_ACTION_REINIT_URL = 'hk-reinit-url';
    public static $_FORM_ACTION_REINIT_modal = 'hk-reinit-modal';
    public static $_FORM_ACTION_REINIT_action = 'hk-reinit-action';
    public static $_CALLBACK_AFTER = 'hk-callback-after';
    public static $_CALLBACK_BEFORE = 'hk-callback-before';
    

    public static $_FORM_VALIDATE_CLASS = 'hk-check';
    public static $_FORM_CLASS = 'hk-form';
    public static $_FORM_CLASS_MEDIA_FILE = 'hk-media-file';
    public static $_FORM_CLASS_PHOTO_SINGLE = 'hk-photo-single';
    public static $_FORM_CLASS_PHOTO = 'hk-photo';
    public static $_FORM_CLASS_PHOTO_HIDDEN = 'hk-photo-hidden';
    public static $_FORM_CLASS_PHOTO_SUPPORT = 'hk-photo-support';
    public static $_FORM_CLASS_EDIT_ID = 'hk-edit-id';
    public static $_FORM_CLASS_EDITOR = 'hk-editor';
    public static $_FORM_IS_MULTIPART = 'hk-form-is-multipart';
    
    public static $_VALIDATE_CLASS_REQUIRED = 'hk-validate-required';
    public static $_VALIDATE_CLASS_EMAIL_OR_TEL = 'hk-validate-email-or-tel';
    public static $_VALIDATE_CLASS_GROUP_REQUIRED = 'hk-validate-group-required';
    public static $_VALIDATE_CLASS_NUMBER = 'hk-validate-number';
    public static $_VALIDATE_CLASS_ZIPCODE_FORMAT = 'hk-validate-zipcode-format';
    public static $_VALIDATE_CLASS_NON_NEGATIVE = 'hk-validate-non-negative';
    public static $_VALIDATE_CLASS_PHONE_NUMBER = 'hk-validate-phone-number';
    public static $_VALIDATE_CLASS_NOT_EXIST = 'hk-validate-not-exist';
    public static $_VALIDATE_CLASS_EMAIL = 'hk-validate-email';
    public static $_VALIDATE_CLASS_MIN = 'hk-validate-min';
    public static $_VALIDATE_CLASS_MAX = 'hk-validate-max';
    public static $_VALIDATE_CLASS_CONFIRM = 'hk-validate-confirm';
    public static $_VALIDATE_CLASS_CUSTOM = 'hk-validate-custom';
    public static $_VALIDATE_CLASS_CUSTOM_CALLBACK = 'hk-validate-custom-callback';
    public static $_DATA_URL = 'hk-data-url';
    public static $_DATA_PARAMS = 'hk-data-params';
    public static $_DATA_IS_MULTI_LANGUAGES = 'hk-data-is-multi-languages';
    public static $_REF_ID = 'hk-ref-id';
    public static $_REF_CLASS = 'hk-ref-class';
    public static $_REF_NAME = 'hk-ref-name';
    public static $_CLASS_PLACEHOLDER = 'hk-placeholder';
    public static $_CLASS_REINIT_PLACEHOLDER = 'hk-reinit-placeholder';
    public static $_CLASS_DATETIME_PICKER = 'hk-datetime-picker';
    public static $_CLASS_ENTITY_COLLECTION = 'hk-entity-collection';
    public static $_VALIDATE_CLASS_MULTI_SELECT_REQUIRED = 'hk-validate-multi-select-required';
    public static $_CLASS_MONEY = 'hk-money';
}
