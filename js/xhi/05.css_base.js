/*
 * 05.css_base.js
 *
 * Use     : xhi._makeCssBase_( app_map );
 * Synopsis: Add _css_base_ capabilities to app_map
 * Provides: Shared CSS symbols used by PowerCSS
 *
 * @author Michael S. Mikowski - mike.mikowski@gmail.com
*/
/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true, todo    : true, unparam  : true
*/
/*global */

var __ns = 'xhi', __NS;
/* istanbul ignore next */
try          { __NS = global[ __ns ]; }
catch ( e1 ) { __NS = window[ __ns ]; }

// == BEGIN MODULE __NS._makeCssBase_ ==================================
__NS._makeCssBase_ = function ( aMap ) {
  'use strict';
  // == BEGIN MODULE SCOPE VARIABLES ===================================
  //noinspection MagicNumberJS
  var
    aKey    = aMap._aKey_,
    __util  = aMap._util_,
    __p     = __util._makeReplaceFn_( '_p_', aKey ),

    configMap = {
      _global_mixin_map_ : {
        _spc_em_00_ : '.375rem',  // 06px intra-group
        _spc_em_01_ : '.75rem',   // 12px icon-to-label
        _spc_em_02_ : '1.125rem', // 18px item indent, word space
        _spc_em_03_ : '1.5rem',   // 24px peer item, sentence space
        _spc_em_04_ : '1.875rem', // 30px Between groups
        _spc_em_05_ : '2.25rem',  // 36px Box padding
        _spc_em_06_ : '2.625rem', // 42px Section space

        // Shadows colors are listed from near to far. Near shadows that
        // like shdw_00, for example, will be smaller but more distinct.
        _shdw_00_ : [['_rgba_shdw_00_', [ '0 0 0.125rem 0 ']]],
        _shdw_01_ : [['_rgba_shdw_01_', ['0 0 .1875rem 0']]],
        _shdw_02_ : [['_rgba_shdw_02_', ['0 0 .1875rem .0625rem']]],
        _shdw_03_ : [['_rgba_shdw_03_', ['0 0 .25rem .0625rem']]],
        _shdw_04_ : [['_rgba_shdw_03_', ['0 0 .3125rem .125rem']]],
        _shdw_05_ : [['_rgba_shdw_03_', ['0 0 .375rem .125rem']]],
        _shdw_06_ : [['_rgba_shdw_03_', ['0 0 .5rem .1875rem']]],
        _shdw_07_ : [['_rgba_shdw_03_', ['0 0 .625rem .25rem']]],
        _shdw_08_ : [['_rgba_shdw_03_', ['0 0 .75rem .375rem']]],
        _shdw_09_ : [['_rgba_shdw_09_', ['0 0 1rem .5rem']]],

        _font_family_awesome_ : 'FontAwesome',
        _font_family_sans_    : 'OpenSans,sans-serif',
        _font_family_mono_    : 'courier,fixed,monospace',
        _font_size_           : '16px',
        _trans_short_         : 'all .2s ease',
        _trans_mid_           : 'all .4s ease',
        _trans_long_          : 'all .5s ease'
      },
      _theme_map_list_ : [
        { _palette_name_       : 'BackInBlack',
          // Accent colors complement primary hue but a distinctly different.
          // Use to draw attention to features.
          _accent_hex_        : '#4e7585',
          _accent_dk_hex_     : '#527582',
          _accent_lt_hex_     : '#385966',

          // Area colors are intended to fill large swaths of area.
          // Generally they are less intense than comparable text colors.
          _area_hex_          : '#16181a', // default background
          _area_accent_hex_   : '#22282a', // box background
          _area_hover_hex_    : '#000000', // full-bright
          _area_mid_hex_      : '#5d676f',
          _area_mid_dk_hex_   : '#657685',
          _area_mid_lt_hex_   : '#474e54',
          _area_mid_xlt_hex_  : '#393f44',

          // Standard button colors.
          _btn_area_hex_      : '#6cafff', // === _link_hex_
          _btn_area_hover_hex_: '#89c3ff', // === _link_dk_hex_
          _btn_txt_hex_       : '#16181a', // === _area_hex_
          _btn_txt_hover_hex_ : '#000000', // === _area_hover_hex_

          // Frame colors are used by the outside frame (header, footer,
          // sidebar) as background colors.
          _frame_hex_         : '#acb9c3', // header + footer
          _frame_dk_hex_      : '#cdccd4', // lh menu
          _frame_lt_hex_      : '#94a5b2', // header + footer hover
          _frame_xdk_hex_     : '#d8e8f5', // lh menu selected

          // Link colors should be only used on elements which users tap,
          // click, drag, or otherwise interact.
          _link_hex_          : '#6cafff', // link on both lt and dk bkg
          _link_lt_hex_       : '#89c3ff', // hover on dk bkg
          _link_xlt_hex_      : '#a9b3ff', // hover on dk bkg
          _link_fade_hex_     : '#4b576b', // faded link on color
          _link_dk_hex_       : '#89c3ff', // hover on lt bkg

          // The placeholder color is a subdued text color shown in input
          // fields when there is no content.
          _placeholder_hex_   : '#5d676f', // === _area_mid_hex_

          // Text colors are generally more saturated and are darker
          // (lighter in inverse scheme) than correlating area colors.
          _txt_hex_           : '#acb9c3', // document font
          _txt_alt_hex_       : '#a47330', // altr ~ invert of hex_txt_link
          _txt_dk_hex_        : '#c3ccd4',
          _txt_inv_hex_       : '#5b666e',
          _txt_inv_dk_hex_    : '#77848f',
          _txt_inv_lt_hex_    : '#3d454a',
          _txt_lt_hex_        : '#94a5b2',
          _txt_xlt_hex_       : '#77848f',

          // The top-left logo image path.
          _logo_url_           : __p('url(app/img/{_p_}-logo-white.png)'),

          // Shadows colors are listed from near to far. Near shadows that
          // use rgba_shdw_00, for example, will be smaller but more
          // distinct.
          _rgba_shdw_00_     : 'rgba(192,222,255,.500)',
          _rgba_shdw_01_     : 'rgba(192,222,255,.450)',
          _rgba_shdw_02_     : 'rgba(192,222,255,.405)',
          _rgba_shdw_03_     : 'rgba(192,222,255,.365)',
          _rgba_shdw_04_     : 'rgba(192,222,255,.328)',
          _rgba_shdw_05_     : 'rgba(192,222,255,.295)',
          _rgba_shdw_06_     : 'rgba(192,222,255,.266)',
          _rgba_shdw_07_     : 'rgba(192,222,255,.239)',
          _rgba_shdw_08_     : 'rgba(192,222,255,.215)',
          _rgba_shdw_09_     : 'rgba(192,222,255,.194)',
          _txt_shdw_01_      : '0 1px 1px #000000',
          _txt_shdw_01_inv_  : '0 1px 1px #7fb5ed',
        }
      ],
      _selector_list_ : [
        { _selector_str_ : '*',
          _rule_map_     : {
            __moz_box_sizing_  : '_border_box_',
            _box_sizing_       : '_border_box_',
            _float_            : '_none_',
            _margin_           : '_0_',
            _padding_          : '_0_',
            _clip_             : '_auto_',
            _line_height_      : '_inherit_',
            _vertical_align_   : '_inherit_',
            _font_family_      : '_inherit_',
            _font_size_        : '_inherit_',
            _font_weight_      : '_inherit_',
            _font_style_       : '_inherit_',
            _text_decoration_  : '_inherit_',
            _color_            : '_inherit_',
            _background_color_ : '_transparent_',
            _outline_          : '_transparent_'
          }
        },
        { _selector_str_ : 'html',
          _rule_map_     : {
            _height_      : '_100p_',
            _font_family_ : '_font_family_sans_',
            _font_size_   : '_font_size_',
            _color_       : '_txt_hex_',
            _background_  : '_area_hex_'
          }
        },
        { _selector_str_ : 'body',
          _rule_map_     : {
            _position_   : '_relative_',
            _min_height_ : '_100p_',
            _display_    : '_block_',
            _overflow_x_ : '_hidden_',
            _overflow_y_ : '_auto_',
            _color_      : '_txt_hex_'
          }
        },
        { _selector_str_ : '::-webkit-input-placeholder',
          _rule_map_     : { _color_ : '_placeholder_hex_' }
        },
        { _selector_str_ : '::-ms-input-placeholder',
          _rule_map_     : {
            _color_   : '_placeholder_hex_',
            _opacity_ : '_1_'
          }
        },
        // Firefox requires more specific selectors than chrome
        { _selector_str_ : 'input[type="text"]::-moz-placeholder,'
            + 'textarea::-moz-placeholder',
          _rule_map_     : {
            _color_   : '_placeholder_hex_',
            _opacity_ : '_1_'
          }
        },
        // Firefox requires more specific selectors than chrome
        { _selector_str_ : 'input[type="text"]::placeholder,'
          + 'textarea::placeholder',
          _rule_map_     : {
            _color_ : '_placeholder_hex_',
            _opacity_ : '_1_'
          }
        },
        { _selector_str_ : 'button',
          _rule_map_     : {
            _display_       : '_block_',
            _position_      : '_relative_',
            _margin_        :
              [['_d75rem_', '_1d5rem_', '_d75rem_', '_1d5rem_']],
            _box_shadow_    : '_shdw_01_',
            _border_        : [[ '_d125rem_', '_solid_', '_link_hex_' ]],
            _outline_       : '_none_',
            _border_radius_ : '_d375rem_',
            _height_        : '_2rem_',
            _line_height_   : '_1d75rem_',
            _padding_       : [['_0_', '_1d125rem_']],
            _font_size_     : '_1d125rem_',
            _color_         : '_btn_txt_hex_',
            _background_    : '_link_hex_',
            _text_shadow_   : '_txt_shdw_01_inv_',
            _cursor_        : '_pointer_'
          }
        },
        { _selector_str_ : __p('button.{_p_}-_x_lh_'),
          _rule_map_ : {
            _float_        : '_left_',
            _margin_left_  : '_0_'
          }
        },
        { _selector_str_ : __p('button.{_p_}-_x_rh_'),
          _rule_map_ : {
            _float_        : '_right_',
            _margin_right_ : '_0_'
          }
        },
        { _selector_str_ : __p('button.{_p_}-_x_alt_'),
          _rule_map_ : {
            _background_  : '_area_hex_',
            _color_       : '_link_hex_',
            _text_shadow_ : '_none_'
          }
        },
        { _selector_str_ : __p('button.{_p_}-_x_disable_,'
            + 'button.{_p_}-_x_disable_:hover'),
          _rule_map_ : {
            _background_   : '_area_mid_hex_',
            _color_        : '_txt_xlt_hex_',
            _cursor_       : '_default_',
            _border_color_ : '_txt_xlt_hex_'
          }
        },
        { _selector_str_ : __p('div.{_p_}-_x_fill_abs_'),
          _rule_map_ : {
            _position_  : '_absolute_',
            _margin_    : '_0_',
            _top_       : '_0_',
            _left_      : '_0_',
            _right_     : '_0_',
            _bottom_    : '_0_',
            _max_width_ : '_none_'
          }
        },
        { _selector_str_ : 'button:hover',
          _rule_map_     : {
            _background_ : '_link_dk_hex_',
            _color_      : '_btn_txt_hover_hex_'
          }
        },
        { _selector_str_ : 'a',
          _rule_map_     : {
            _color_  : '_link_hex_',
            _cursor_ : '_pointer_'
          }
        },
        { _selector_str_ : 'a:hover',
          _rule_map_     : {
            _color_           : '_link_dk_hex_',
            _text_decoration_ : '_underline_'
          }
        },

        /* BEGIN {_p_}-_x_*_ selectors */
        { _selector_str_ : __p('.{_p_}-_x_noselect_'),
          _rule_map_     : {
            __webkit_user_select_ : '_none_',
            __moz_user_select_    : '_none_',
            __o_user_select_      : '_none_',
            _user_select_         : '_none_'
          }
        },
        { _selector_str_ : __p('.{_p_}-_x_link_,.{_p_}-_x_link_inv_'),
          _rule_map_     : {
            _color_  : '_link_hex_',
            _cursor_ : '_pointer_'
          }
        },
        { _selector_str_ : __p('.{_p_}-_x_link_:hover'),
          _rule_map_     : {
            _text_decoration_ : '_underline_',
            _color_           : '_link_dk_hex_'
          }
        },
        { _selector_str_ : __p('.{_p_}-_x_link_inv_:hover'),
          _rule_map_     : {
            _text_decoration_ : '_underline_',
            _color_           : '_link_lt_hex_'
          }
        },
        { _selector_str_ : __p('.{_p_}-_x_bold_'),
          _rule_map_     : {_font_weight_ : '_800_'}
        },

        { _selector_str_ : __p('.{_p_}-_x_clearfloat_'),
          _rule_map_     : {
            _visibility_ : [['_hidden_', '_important_']],
            _float_      : [['_none_', '_important_']],
            _height_     : [['_0_', '_important_']],
            _clear_      : [['_both_', '_important_']]
          }
        },
        { _selector_str_ : __p('.{_p_}-_x_tab_'),
          _rule_map_     : {
            _position_        : '_relative_',
            _height_          : '_3rem_',
            _line_height_     : '_2rem_',
            _border_bottom_   : [[ '_d25rem_', '_solid_', '_area_hex_' ]],
            _font_size_       : '_1d125rem_',
            _color_           : '_area_hex_',
            _background_      : '_area_mid_lt_hex_',
            _vertical_align_  : '_middle_',
            _list_style_type_ : '_none_'
          }
        },
        { _selector_str_ : __p('.{_p_}-_x_tab_>li'),
          _rule_map_ : {
            _float_       : '_left_',
            _width_       : '_50p_',
            _height_      : '_100p_',
            _padding_     : [[ '_d3125rem_', '_0_','_0_', '_1rem_' ]],
            _cursor_      : '_pointer_'
          }
        },
        { _selector_str_ : __p('.{_p_}-_x_tab_>li:hover'),
          _rule_map_ : {
            _color_       : '_area_hover_hex_',
            _background_  : '_area_mid_hex_'
          }
        },
        { _selector_str_ : __p('.{_p_}-_x_tab_>li.{_p_}-_x_active_'),
          _rule_map_     : {
            _color_      : '_link_hex_',
            _background_ : '_area_hex_',
            _cursor_     : '_default_'
          }
        },
        { _selector_str_ : __p('.{_p_}-_x_tbox_>li'),
          _rule_map_     : {
            _display_    : '_none_',
            _padding_    : [[ '_d5rem_', '_d5rem_','_0_','_d5rem_' ]],
            _overflow_x_ : '_hidden_',
            _background_ : '_area_hex_',
            _cursor_      : '_default_'
          }
        },
        { _selector_str_ : __p('.{_p_}-_x_tbox_>li.{_p_}-_x_active_'),
          _rule_map_     : { _display_ : '_block_' }
        },
        { _selector_str_ : __p('.{_p_}-_x_tbox_list_'),
          _rule_map_     : { _list_style_type_ : '_none_' }
        },
        { _selector_str_ : __p('.{_p_}-_x_tbox_list_>li'),
          _rule_map_     : {
            _position_      : '_relative_',
            _margin_bottom_ : '_d5rem_',
            _border_        :
              [[ '_d125rem_', '_solid_', '_area_mid_xlt_hex_' ]],
            _border_radius_ : '_d5rem_',
            _padding_       : [[ '_d5rem_', '_1rem_', '_d75rem_', '_1rem_' ]],
            _background_    : '_area_mid_xlt_hex_',
            _color_         : '_txt_lt_hex_',
            _cursor_        : '_pointer_'
          }
        },
        { _selector_str_ : __p('.{_p_}-_x_tbox_list_>li.{_p_}-_x_active_'),
          _rule_map_     : {
            _background_   : '_area_hex_',
            _color_        : '_txt_dk_hex_'
          }
        },
        { _selector_str_ : __p('.{_p_}-_x_tbox_list_>li:hover'),
          _rule_map_     : {
            _background_   : '_area_hex_',
            _color_        : '_txt_dk_hex_',
            _border_color_ : '_txt_alt_hex_'
          }
        },
        { _selector_str_ : __p('.{_p_}-_x_list_title_'),
          _rule_map_ : {
            _line_height_    : '_1d25rem_',
            _font_size_      : '_1d125rem_',
            _margin_bottom_  : '_d5rem_',
            _color_          : '_link_hex_',
            _vertical_align_ : '_top_',
            _word_break_     : '_break_word_'
          }
        },
        { _selector_str_ : __p('.{_p_}-_x_list_float_text_'),
          _rule_map_ : {
            _float_          : '_right_',
            _margin_left_    : '_d5rem_',
            _text_align_     : '_right_',
            _line_height_    : '_1d25rem_',
            _font_size_      : '_1rem_',
            _color_          : '_txt_xlt_hex_',
            _vertical_align_ : '_top_'
          }
        }
      ]
      /* END {_p_}-_x_*_ selectors */
    };
  // == . END MODULE SCOPE VARIABLES ===================================

  // == BEGIN PUBLIC METHODS ===========================================
  aMap._css_base_ = {
    _globalMixinMap_ : configMap._global_mixin_map_,
    _selectorList_   : configMap._selector_list_,
    _themeMapList_   : configMap._theme_map_list_
  };
  // == . END PUBLIC METHODS ===========================================
};
// == . END MODULE __NS._makeCssBase_ ==================================
