// Generated by CoffeeScript 1.6.3
(function() {
  var INDEX_HP, INDEX_LAST_ACTION, INDEX_LOCATION;

  INDEX_LOCATION = 0;

  INDEX_HP = 1;

  INDEX_LAST_ACTION = 2;

  window.replay_callback = function(history) {
    var board, btn_play, colors, draw_square, get_robot, loc_found, p1_label, p2_label, panel, play_turns, playing, show_hp, show_turn, turn, turn_label;
    turn = 0;
    board = $('#board');
    turn_label = $('#turn_label');
    p1_label = $('#p1_label');
    p2_label = $('#p2_label');
    colors = 'red blue black normal'.split(' ');
    playing = false;
    draw_square = function(loc, color) {
      var c, item, selector, x, y, _i, _len;
      x = loc[0], y = loc[1];
      selector = '#piece_' + x + '_' + y;
      item = board.find(selector);
      for (_i = 0, _len = colors.length; _i < _len; _i++) {
        c = colors[_i];
        item.removeClass(c);
      }
      return item.addClass(color);
    };
    show_hp = function(loc, hp) {
      var item, selector, x, y;
      x = loc[0], y = loc[1];
      selector = '#piece_' + x + '_' + y;
      item = board.find(selector);
      return item.text(hp);
    };
    loc_found = function(loc, robot_lists) {
      var l, r, _i, _j, _len, _len1;
      for (_i = 0, _len = robot_lists.length; _i < _len; _i++) {
        l = robot_lists[_i];
        for (_j = 0, _len1 = l.length; _j < _len1; _j++) {
          r = l[_j];
          if (r[INDEX_LOCATION] === loc) {
            return true;
          }
        }
      }
      return false;
    };
    show_turn = function(old, new1, new2) {
      var loc, r, _i, _j, _k, _len, _len1, _len2, _results;
      for (_i = 0, _len = old.length; _i < _len; _i++) {
        loc = old[_i];
        if (!loc_found(loc, [new1, new2])) {
          draw_square(loc, 'normal');
          show_hp(loc, '');
        }
      }
      for (_j = 0, _len1 = new1.length; _j < _len1; _j++) {
        r = new1[_j];
        draw_square(r[INDEX_LOCATION], 'red');
        show_hp(r[INDEX_LOCATION], r[INDEX_HP]);
      }
      _results = [];
      for (_k = 0, _len2 = new2.length; _k < _len2; _k++) {
        r = new2[_k];
        draw_square(r[INDEX_LOCATION], 'blue');
        _results.push(show_hp(r[INDEX_LOCATION], r[INDEX_HP]));
      }
      return _results;
    };
    window.inc_turn = function(n) {
      var new1, new2, old, x, _ref;
      if (turn + n < 0 || turn + n >= history[0].length) {
        return false;
      }
      old = history[0][turn].concat(history[1][turn]);
      old = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = old.length; _i < _len; _i++) {
          x = old[_i];
          _results.push(x[INDEX_LOCATION]);
        }
        return _results;
      })();
      turn += n;
      _ref = [history[0][turn], history[1][turn]], new1 = _ref[0], new2 = _ref[1];
      turn_label.text(turn + 1);
      p1_label.text(new1.length);
      p2_label.text(new2.length);
      show_turn(old, new1, new2);
      return true;
    };
    btn_play = $('#btn-play');
    panel = $('#panel');
    window.stop_timer = function() {
      window.clearInterval(window.replay_timer);
      btn_play.html('<i class="fa nom fa-play"></i>');
      return playing = false;
    };
    window.start_timer = function(interval) {
      return window.replay_timer = window.setInterval(play_turns, interval);
    };
    play_turns = function() {
      if (!inc_turn(1)) {
        return window.stop_timer();
      }
    };
    inc_turn(0);
    if (btn_play.length) {
      btn_play.click(function() {
        playing = !playing;
        if (playing) {
          play_turns();
          window.start_timer(300);
          return $(this).html('<i class="fa nom fa-stop"></i>');
        } else {
          return window.stop_timer();
        }
      });
      $('#btn-prev').click(function() {
        return inc_turn(-1);
      });
      $('#btn-next').click(function() {
        return inc_turn(1);
      });
    }
    get_robot = function(x, y) {
      var loc, robot, _i, _len, _ref;
      _ref = history[0][turn].concat(history[1][turn]);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        robot = _ref[_i];
        loc = robot[INDEX_LOCATION];
        if (x === loc[0] && y === loc[1]) {
          return robot;
        }
      }
      return false;
    };
    return $('#board .item').click(function() {
      var robot, text, x, y, _ref;
      _ref = $(this).attr('id').split('_').slice(1, 3), x = _ref[0], y = _ref[1];
      robot = get_robot(parseInt(x), parseInt(y));
      if (!robot) {
        return;
      }
      text = "<div><b>HP</b>" + robot[INDEX_HP] + "</div>";
      text += "<div><b>Location</b>(" + robot[INDEX_LOCATION][0] + ", " + robot[INDEX_LOCATION][1] + ")</div>";
      if (robot.length > INDEX_LAST_ACTION) {
        text += "<div><b>Last action</b>" + robot[INDEX_LAST_ACTION] + "</div>";
      }
      return panel.html(text);
    });
  };

}).call(this);