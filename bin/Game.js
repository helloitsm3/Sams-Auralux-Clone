// Generated by CoffeeScript 1.6.3
/*
The primary class for our overarching logic.
*/


(function() {
  window.Game = (function() {
    Game.PLAYER_COLORS = {
      RED: '#F00',
      GREEN: '#0F0',
      BLUE: '#00F',
      BLACK: '#000'
    };

    Game.UNIT_COLLISION_SENSITIVITY = 20;

    function Game() {
      this.human_player = new Player(Game.PLAYER_COLORS.BLUE);
      this.players = [];
      this.players.push(this.human_player);
      this.players.push(new Player(Game.PLAYER_COLORS.RED));
      this.players.push(new Player(Game.PLAYER_COLORS.GREEN));
      this.players.push(new Player(Game.PLAYER_COLORS.BLACK));
      _.invoke(this.players, 'createRandomPlanets', 0);
      this.cursor = new Cursor(this.human_player);
    }

    Game.prototype.tick = function(state_controls) {
      _.invoke(this.players, 'tick');
      this.cursor.tick();
      return this.checkUnitCollisions();
    };

    Game.prototype.checkUnitCollisions = function() {
      var collision_found, compare_player, compare_to_units, compare_unit, inner_checked, inner_unit_checked, outer_checked, outer_unit_checked, player, unit, units, _i, _len, _ref, _results;
      collision_found = false;
      _ref = this.players;
      _results = [];
      for (outer_checked = _i = 0, _len = _ref.length; _i < _len; outer_checked = ++_i) {
        player = _ref[outer_checked];
        _results.push((function() {
          var _j, _len1, _ref1, _results1;
          _ref1 = this.players;
          _results1 = [];
          for (inner_checked = _j = 0, _len1 = _ref1.length; _j < _len1; inner_checked = ++_j) {
            compare_player = _ref1[inner_checked];
            if (compare_player === player || outer_checked > inner_checked) {
              continue;
            }
            console.log('Comparing player ' + player.color + ' and ' + compare_player.color);
            compare_to_units = compare_player.getUnits();
            units = player.getUnits();
            _results1.push((function() {
              var _k, _len2, _ref2, _results2;
              _ref2 = units.getAll();
              _results2 = [];
              for (outer_unit_checked = _k = 0, _len2 = _ref2.length; _k < _len2; outer_unit_checked = ++_k) {
                unit = _ref2[outer_unit_checked];
                _results2.push((function() {
                  var _l, _len3, _ref3, _results3;
                  _ref3 = compare_to_units.getAll();
                  _results3 = [];
                  for (inner_unit_checked = _l = 0, _len3 = _ref3.length; _l < _len3; inner_unit_checked = ++_l) {
                    compare_unit = _ref3[inner_unit_checked];
                    if (outer_unit_checked > inner_unit_checked) {
                      continue;
                    }
                    if (unit.getPosition().distanceFrom(compare_unit.getPosition()) < Game.UNIT_COLLISION_SENSITIVITY) {
                      units.remove(unit);
                      compare_to_units.remove(compare_unit);
                      break;
                    } else {
                      _results3.push(void 0);
                    }
                  }
                  return _results3;
                })());
              }
              return _results2;
            })());
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    Game.prototype.checkPlanetOwnership = function() {};

    return Game;

  })();

}).call(this);
