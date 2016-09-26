/**
 *    xhi.lb.js
 *    Litebox manager
 *
 *    Michael S. Mikowski - mike.mikowski@gmail.com
*/
/*jslint         browser : true, continue : true,
   devel : true,  indent : 2,      maxerr : 50,
  newcap : true,   nomen : true, plusplus : true,
  regexp : true,  sloppy : true,     vars : false,
   white : true,    todo : true,  unparam : true
*/
/*global pcss, jQuery, xhi */

xhi._lb_ = (function ( $ ) {
  // ================= BEGIN MODULE SCOPE VARIABLES ===================
  'use strict';
  //noinspection MagicNumberJS
  var
    vMap    = xhi._vMap_,
    nMap    = xhi._nMap_,
    cssKmap = pcss._cfg_._cssKeyMap_,
    cssVmap = pcss._cfg_._cssValMap_,

    __0     = nMap._0_,
    __2     = nMap._2_,

    __blank = vMap._blank_,
    __false = vMap._false_,
    __null  = vMap._null_,
    __true  = vMap._true_,
    __undef = vMap._undef_,

    __setTo   = vMap._fnSetTimeout_,
    __clearTo = vMap._fnClearTimeout_,

    topSmap = {
      _cleanup_fn_   : __undef,  // Clean up function (bound)
      _cleanup_toid_ : __undef,  // Clean up timeout id
      _close_toid_   : __undef,  // Close timeout id
      _is_masked_    : __false,  // Mask-on flag
      _is_ready_     : __false,  // Has DOM been initialized?
      _is_busy_      : __false,  // Is litebox in use?
      _lb_class_str_ : __blank,  // Caller specified class(es) of lb
      _mod_class_str_: __blank,  // Caller specified modifier class(es) of lb
      _onclose_fn_   : __null    // Callback function on close
    },

    $Map = {},

    topCmap = {
      _trans_ms_  : 350, // transition time
      _main_html_ : __blank
        + '<div id="xhi-_lb_mask_" class="xhi-_lb_mask_abs_"></div>'
        + '<div id="xhi-_lb_spin_" class="xhi-_lb_spin_fixed_">'
          + '&#xf021;'
        + '</div>'
        + '<div id="xhi-_lb_"></div>',
      _spin_html_ : '<div class="xhi-_lb_spin_abs_">'
        + '&#xf021;</div>',
      _local_tmplt_ : __blank
        + '<div class="xhi-_lb_mask_abs_ xhi-_x_active_"></div>'
        + '<div class="xhi-_lb_spin_abs_ xhi-_x_active_">&#xf021;</div>',
      _success_tmplt_ : __blank
        + '<div class="xhi-_lb_success_">'
          + '<div class="xhi-_lb_success_title_">'
            + '{_success_msg_}'
          + '</div>'
        + '</div>',
      _erow_tmplt_ : __blank
        + '<div class="xhi-_lb_error_row_">'
          + '<div class="xhi-_lb_error_row_name_"></div>'
          + '<div class="xhi-_lb_error_row_descr_">{_error_msg_}</div>'
        + '</div>',
      _error_tmplt_ : __blank
        + '<div class="xhi-_lb_error_">'
          + '<h1>Error</h1>'
          + '<div class="xhi-_lb_error_list_">'
            + '{_rows_html_}'
          + '</div>'
        + '</div>',

      _tmplt_map_ : {
        _all_ : '{_content_html_}',
        _btm_ : __blank
        + '<div class="xhi-_lb_content_">{_content_html_}</div>'
        + '<div class="xhi-_lb_title_">{_title_html_}</div>'
        + '<div class="xhi-_lb_close_">{_close_html_}</div>',
        _top_ : __blank
        + '<div class="xhi-_lb_title_">{_title_html_}</div>'
        + '<div class="xhi-_lb_close_">{_close_html_}</div>'
        + '<div class="xhi-_lb_content_">{_content_html_}</div>'
      }
    },

    coordDraggable
    ;
  // ================== END MODULE SCOPE VARIABLES ====================

  // ===================== BEGIN UTILITY METHODS ======================
  // ====================== END UTILITY METHODS =======================

  // ======================= BEGIN DOM METHODS ========================
  // BEGIN DOM method /set$Map/
  function set$Map () {
    $Map = {
      _$body_    : $( 'body'          ),
      _$litebox_ : $( '#xhi-_lb_'      ),
      _$mask_    : $( '#xhi-_lb_mask_' ),
      _$spin_    : $( '#xhi-_lb_spin_' )
    };
  }
  // END DOM method /set$Map/

  // BEGIN DOM method /initModule/
  // Checks to see if we have been initialized; if not, we do so
  function initModule () {
    if ( topSmap._is_ready_ ) { return; }
    $('body')[ vMap._append_ ]( topCmap._main_html_ );
    set$Map();
    $Map._$litebox_[ vMap._css_ ]( cssKmap._display_, cssVmap._none_ );
    $Map._$mask_[    vMap._css_ ]( cssKmap._display_, cssVmap._none_ );
    topSmap._is_ready_ = __true;
  }
  // END DOM method /initModule/

  // BEGIN DOM method /addLocalSpin/
  function addLocalSpin( $box ) {
    $box.html( topCmap._local_tmplt_);
  }
  // END DOM method /addLocalSpin/

  // BEGIN DOM method /cleanUp/
  function cleanUp () {
    var param_map = this;
    topSmap._cleanup_toid_  = __undef;
    if ( ! param_map ) { return; }

    if ( $Map._$content_ ) {
      $Map._$content_[ vMap._empty_ ]()[ vMap._removeAttr_ ]( vMap._style_ );
    }
    $Map._$litebox_[ vMap._removeAttr_ ]( vMap._style_ )[
      vMap._css_ ]( cssKmap._display_, cssVmap._none_ )[
      vMap._removeClass_ ]( param_map._lb_class_str_ )[
      vMap._removeClass_ ]( param_map._mod_class_str_ );
    $Map._$mask_[ vMap._removeAttr_ ]( vMap._style_ )[
      vMap._css_ ]( cssKmap._display_, cssVmap._none_ );

    topSmap._mod_class_str_ = __blank;
    topSmap._lb_class_str_  = __blank;
    topSmap._is_busy_       = __false;
  }
  // END DOM method /cleanUp/

  // BEGIN DOM method /hideIt/
  // This clears the litebox content
  function hideIt () {
    var param_map = {}, bound_fn;
    initModule();

    if ( topSmap._close_toid_ ) {
      __clearTo( topSmap._close_toid_ );
      topSmap._close_toid_ = __undef;
    }

    param_map._lb_class_str_  = topSmap._lb_class_str_;
    param_map._mod_class_str_ = topSmap._mod_class_str_;

    topSmap._lb_class_str_ = __blank;
    topSmap._is_masked_    = __false;
    $Map._$litebox_[ vMap._removeClass_ ]( 'xhi-_x_active_' );
    $Map._$mask_[    vMap._removeClass_ ]( 'xhi-_x_active_' );

    bound_fn = cleanUp[ vMap._bind_ ]( param_map );
    topSmap._cleanup_fn_   = bound_fn;
    topSmap._cleanup_toid_ = __setTo( bound_fn, topCmap._trans_ms_ );
    return $Map._$litebox_;
  }
  // END DOM method /hideIt/

  // BEGIN DOM method /closeIt/
  // The difference between closeIt and hideIt is that close
  // fires the _onclose_fn_ callback, whereas hide does not
  function closeIt () {
    initModule();
    if ( topSmap._onclose_fn_ ) {
      // Do not close litebox on falsey return from _onclose_fn_
      if ( topSmap._onclose_fn_( $Map._$content_ ) ) {
        hideIt();
      }
    }
    else {
      hideIt();
    }
  }
  // END DOM method /closeIt/

  // BEGIN method /setCloseFn/
  function setCloseFn ( fn_cb ) {
    topSmap._onclose_fn_ = fn_cb || null;
  }
  // END method /setCloseFn/

  // BEGIN method /showBusy/
  function showBusy ( /*busy_str*/ ) {
    initModule();
    $Map._$mask_[ vMap._css_ ]( cssKmap._display_, cssVmap._block_
      )[ vMap._addClass_ ]( 'xhi-_x_active_' );
    topSmap._is_masked_ = __true;
    $Map._$spin_[ vMap._addClass_ ]( 'xhi-_x_active_' );

    // TODO: Add this
    // if( busy_str )(
    //   $Map._$msg_[ vMap._text_ ]( busy_str );
    // )
  }
  // END method /showBusy/

  // BEGIN method /hideBusy/
  function hideBusy () {
    var
      $mask = $Map._$mask_,
      $spin = $Map._$spin_
      ;

    if ( ! $mask ) { return __false; }

    $mask[ vMap._removeClass_ ]( 'xhi-_x_active_' );
    $spin[ vMap._removeClass_ ]( 'xhi-_x_active_' );
    topSmap._is_masked_ = __false;

    __setTo(
      function () {
        $mask[ vMap._removeAttr_ ]( vMap._style_ )[
          vMap._css_ ]( cssKmap._display_, cssVmap._none_ );
      },
      topCmap._trans_ms_
    );
  }
  // END method /hideBusy/

  // BEGIN DOM method /afterShow/
  // Purpose: Finishes presentation of litebox after it is shown
  //
  function afterShow() {
    var
      param_map = this,
      do_sizing = param_map._do_sizing_,
      do_mask   = param_map._do_mask_,
      $litebox  = param_map._$litebox_,
      $mask     = param_map._$mask_,

      margin_left_px, margin_top_px, css_map
      ;

    if ( do_sizing ) {
      margin_top_px  = ( __0 - $litebox[ vMap._outerHeight_ ]() / __2 );
      margin_left_px = ( __0 - $litebox[ vMap._outerWidth_  ]() / __2 );
      css_map = {
        'margin-top'  : margin_top_px,
        'margin-left' : margin_left_px,
        top           : cssVmap._50p_,
        left          : cssVmap._50p_
      };
      $litebox[ vMap._css_ ]( css_map );
    }
    $litebox[ vMap._addClass_ ]( 'xhi-_x_active_');
    if ( do_mask ) {
      $mask[ vMap._css_ ]( cssKmap._display_, cssVmap._block_ )[
        vMap._addClass_ ]( 'xhi-_x_active_' );
    }
  }
  // END DOM method /afterShow/

  // BEGIN method /showIt/
  // Purpose  : Show a litebox of content.
  // Examples :
  //  xhi._lb_._showIt_({
  //    _layout_key_   : '_top_',
  //    _title_html_   : 'My title',
  //    _content_html_ : 'Content here',
  //  });
  //
  //  xhi._lb_._showIt_({
  //    _layout_key_   : '_top_',
  //    _title_html_   : 'My title',
  //    _content_html_ : 'Content here',
  //    _close_html_   : 'x',
  //    _position_map_ : {
  //      left : '50%',
  //      top  : '50%',
  //      marginLeft: '-10rem',
  //      marginTop : '-10rem',
  //      width : '20rem',
  //      height: '20rem'
  //    }
  //  });
  //
  // Defaults :
  //   * Layout: (_layout_key_ : '_top_' )
  //     +-- litebox -----+---------+
  //     | _title_        | _close_ |
  //     +----------------+---------+
  //     | _content_                |
  //     +--------------------------+
  //   * Position: center/center
  //   * Size: 50% width and natural height, max-height 50%
  //     (mobile: w x h is 90%/90%)
  //   * Overflow-y: auto; overflow-x hidden
  //
  // Options:
  //   * Layout:  ( _layout_key_ : '_all_' )
  //     +-- litebox -----+---------+
  //     | _content_                |
  //     +--------------------------+
  //   * Layout:  ( _layout_key_ : '_btm_' )
  //     +-- litebox -----+---------+
  //     | _content_                |
  //     +--------------------------+
  //     | _title_        | _close_ |
  //     +----------------+---------+
  //   * _autoclose_ms_ : cancels the window after a i seconds
  //   * _content_html_ - Primary content.  If not initially provided, will
  //       show a 50% height loading graphic.
  //   * _close_html_     - close symbol or text.  Blank omits a close button.
  //   * _do_block_click_ : This blocks the the user from clicking on the
  //       mask to close the litebox
  //   * _do_draggable_   - enable dragging of litebox by the title bar
  //   * _do_title_close_ - tap on title to close (overrides close symbol)
  //   * _do_mask_        - set to false to disable mask
  //   * _lb_class_str_   - replace stock litebox class with this
  //     ( separate multiple classes by a space, e.g. 'c1 c2 c3 ... ' )
  //   * _mod_class_str_  - augment stock litebox class with this
  //     ( separate multiple classes by a space, e.g. 'c1 c2 c3 ... ' )
  //   * _position_map_ - set this to override default positioning
  //     (mobile w x h stays 90%/90%)
  //   * Set is_overflow_y and is_overflow_x to override overflow defaults
  //   * _onclose_fn_     : function to call on close if provided.
  //     When provided, the function is fired on close, and if it returns
  //     a truthy value, the litebox is closed.  A FALSEY VALUES WILL
  //     retain the litebox.
  //   * _title_html_     - title string
  //
  // Returns  : $litebox
  //
  function showIt ( arg_map ) {
    initModule();
    var
      $litebox      = $Map._$litebox_,
      $mask         = $Map._$mask_,

      layout_key    = arg_map._layout_key_    || '_top_',
      mod_class_str = arg_map._mod_class_str_ || __blank,
      lb_class_str  = arg_map._lb_class_str_  || __blank,
      do_mask       = arg_map._do_mask_ === __false ? __false : __true,
      do_sizing     = __true,

      css_map,    inner_html,
      $title,     $close,
      $content,   param_map,
      bound_fn
      ;

    // Close previously open lightbox
    if ( topSmap._is_busy_ ) { hideIt(); }

    // Clean-up any linger fades, etc
    if ( topSmap._cleanup_toid_ && topSmap._cleanup_fn_ ) {
      __clearTo( topSmap._cleanup_toid_ );
      topSmap._cleanup_fn_();
    }

    // Fill litebox content with desired layout
    inner_html = xhi._util_._makeTmpltStr_({
      _input_str_ : topCmap._tmplt_map_[ layout_key ],
      _lookup_map_ : {
        _close_html_   : arg_map._close_html_   || __blank,
        _content_html_ : arg_map._content_html_ || topCmap._spin_html_,
        _title_html_   : arg_map._title_html_   || __blank
      }
    });
    $litebox.html( inner_html );

    // Cache jQuery collections
    $close   = $litebox[ vMap._find_ ]( '.xhi-_lb_close_'   );
    $content = $litebox[ vMap._find_ ]( '.xhi-_lb_content_' );
    $title   = $litebox[ vMap._find_ ]( '.xhi-_lb_title_'   );

    $Map._$close_   = $close;
    $Map._$content_ = $content;
    $Map._$title_   = $title;

    $content.find( '.xhi-_lb_spin_' )[ vMap._addClass_ ]( 'xhi-_x_active_' );

    // Store close button function
    topSmap._onclose_fn_ = arg_map._onclose_fn_ || null;

    // Hide or show close button
    if ( arg_map._close_html_ ) {
      $close[ vMap._css_ ]( cssKmap._display_, cssVmap._block_  )[
        vMap._on_  ]( vMap._utap_, closeIt );
    }

    // Tap-on-title to close support
    if ( arg_map._do_title_close_ && $title ) {
      $title[ vMap._css_ ]( cssKmap._display_, cssVmap._block_ )[
        vMap._on_  ]( vMap._utap_, closeIt );
    }

    // Configure mask tap
    if ( do_mask ) {
      if ( arg_map._do_block_click_ ) {
        $mask[ vMap._addClass_ ]( 'xhi-_lb_x_noclick_' );
        $mask[ vMap._off_ ]( vMap._utap_, closeIt );
      }
      else {
        $mask.removeClass( 'xhi-_lb_x_noclick_' )[
          vMap._on_ ]( vMap._utap_, closeIt );
      }
    }

    // Autoclose if requested
    if ( arg_map._autoclose_ms_ ) {
      topSmap._close_toid_ = __setTo( closeIt, arg_map._autoclose_ms_ );
    }

    // Handle position map
    if ( arg_map._position_map_ ) {
      css_map   = arg_map._position_map_;
      do_sizing = __false;
      if ( ! lb_class_str ) { lb_class_str = 'xhi-_lb_abs_'; }
    }
    else {
      css_map = { top : '-100%', left : '-100%' };
      if ( ! lb_class_str ) { lb_class_str = 'xhi-_lb_abs_'; }
    }
    css_map.display = cssVmap._block_;

    // Set specified class (or xhi-_lb_ default)
    $litebox[ vMap._addClass_ ]( lb_class_str );
    $litebox[ vMap._addClass_ ]( mod_class_str );
    topSmap._lb_class_str_  = lb_class_str;
    topSmap._mod_class_str_ = mod_class_str;

    // Show and (if requested) size litebox
    param_map = {
      _$litebox_  : $litebox,
      _$mask_     : $mask,
      _do_mask_   : do_mask,
      _do_sizing_ : do_sizing
    };
    bound_fn = afterShow[ vMap._bind_ ]( param_map );
    if ( do_mask ) {
      $mask[ vMap._addClass_ ]( 'xhi-_x_active_' );
    }
    $litebox[ vMap._css_ ]( css_map )[ vMap._show_ ]( bound_fn );

    // Coordinate draggable if requested
    coordDraggable( $title, arg_map._do_draggable_ );

    topSmap._is_busy_ = __true;
    return $litebox;
  }
  // END method /showIt/

  // ======================== END DOM METHODS =========================

  // =================== BEGIN EVENT HANDLERS =========================
  function onDragstart( event_obj ) {
    var
      $target = $( event_obj.elem_target ),
      offset_map = $Map._$litebox_.offset();

    $target[ vMap._css_ ]( cssKmap._cursor_, cssVmap._move_ );
    topSmap._$drag_target_ = $target;

    offset_map[ cssKmap._right_  ] = __blank;
    offset_map[ cssKmap._bottom_ ] = __blank;
    $Map._$litebox_[ vMap._css_ ]( offset_map );
  }

  function onDragmove ( event_obj ) {
    var offset_map = $Map._$litebox_.offset();
    offset_map.top  += event_obj.px_delta_y;
    offset_map.left += event_obj.px_delta_x;
    $Map._$litebox_[ vMap._css_ ]( offset_map );
  }

  function onDragend ( /* event_obj */ ) {
    var $target = topSmap._$drag_target_;
    if ( $target ) {
      $target[ vMap._css_ ]( cssKmap._cursor_, __blank );
    }
    topSmap._$drag_target_ = __undef;
  }

  function onResize ( /*event_obj */ ) {
   if ( topSmap._resize_toid_ ) { return __true; }
     topSmap._resize_toid_ = __setTo(function () {
     var
       body_w_px  = $Map.$body[ cssKmap._width_ ](),
       body_h_px  = $Map.$body[ cssKmap._height_ ](),
       $litebox, w_px, h_px
       ;
     if ( topSmap._is_masked_ ) {
       $litebox = $Map._$litebox_;
       w_px     = $litebox[ cssKmap._width_  ]();
       h_px     = $litebox[ cssKmap._height_ ]();

       $litebox[ vMap._css_ ]({
         top  : vMap._fnGetFloor_(
           ( body_h_px - h_px ) / nMap._2_ + nMap._d5_
         ),
         left : vMap._fnGetFloor_(
           ( body_w_px - w_px ) / nMap._2_ + nMap._d5_
         )
       });
     }
     topSmap._body_w_px_   = body_w_px;
     topSmap._body_h_px_   = body_h_px;
     topSmap._resize_toid_ = __undef;
   }, nMap._200_ );
   return __true;
  }
  // ==================== END EVENT HANDLERS ==========================

  // ======================= BEGIN COORDINATORS ========================
  // These methods are here because they tie DOM methods to handlers.
  // We must assign these functions to variables that are declared earlier
  // so that static analysis does not fail.
  //
  function coordDraggable0 ( $title, do_draggable ) {
    if ( do_draggable ) {
      $title[ vMap._on_ ]( vMap._udragstart_, onDragstart );
      $title[ vMap._on_ ]( vMap._udragmove_,  onDragmove  );
      $title[ vMap._on_ ]( vMap._udragend_,   onDragend   );
    }
    else {
      $title[ vMap._off_ ]( vMap._udragstart_, onDragstart );
      $title[ vMap._off_ ]( vMap._udragmove_,  onDragmove  );
      $title[ vMap._off_ ]( vMap._udragend_,   onDragend   );
    }
  }
  coordDraggable = coordDraggable0;
  // ======================== END COORDINATORS =========================

  // =================== BEGIN PUBLIC METHODS =========================
  function showSuccess ( msg_text ) {
    var content_html;
    initModule();

    content_html = xhi._util_._makeTmpltStr_({
      _input_str_  : topCmap._success_tmplt_,
      _lookup_map_ : { _success_msg_ : msg_text }
    });

    showIt({
      content_html : content_html,
      size_map     : { width : 400, height : 200 }
    });
  }

  function showError ( error_list ) {
    var
      rows_html = __blank,
      error_count, i, error_map, error_html;

    initModule();
    error_count = error_list[ vMap._length_ ];
    for ( i = __0; i < error_count; i++ ) {
      error_map = error_list[ i ];
      rows_html += xhi._util_._makeTmpltStr_({
        _input_str_  : topCmap._erow_tmplt_,
        _lookup_map_ : error_map
      });
    }

    error_html = xhi._util_._makeTmpltStr_({
      _input_str_  : topCmap._error_tmplt_,
      _lookup_map_ : { _rows_html_ : rows_html }
    });

    showIt({
      content_html : error_html,
      size_map     : { width : 400, height : 300 }
    });
  }

  return {
    _onResize_      : onResize,

    _addLocalSpin_  : addLocalSpin,
    _closeIt_       : closeIt,
    _hideBusy_      : hideBusy,
    _hideIt_        : hideIt,
    _setCloseFn_    : setCloseFn,
    _showBusy_      : showBusy,
    _showError_     : showError,
    _showIt_        : showIt,
    _showSuccess_   : showSuccess,

    _initModule_    : initModule
  };
  // ==================== END PUBLIC METHODS ==========================
}( jQuery ));
// END xhi.lb.js