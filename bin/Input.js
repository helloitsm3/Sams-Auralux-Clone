// Generated by CoffeeScript 1.6.3
(function() {
  window.Input = (function() {
    function Input() {}

    Input.captureMousewheel = function(handleScroll, self) {
      return context.canvas.addEventListener('mousewheel', function(event) {
        handleScroll.call(self, event);
        event.preventDefault();
        return false;
      });
    };

    Input.captureMousemove = function(handleMove, self) {
      return context.canvas.addEventListener('mousemove', function(event) {
        return handleMove.call(self, event);
      }, false);
    };

    Input.captureDrag = function(handleDrag, self) {
      $(context.canvas).bind('mousedown', function(downEvent) {
        return $(context.canvas).bind('mousemove.tmpevent', function(moveEvent) {
          return handleDrag.call(self, event);
        });
      });
      return $(context.canvas).bind('mouseup', function() {
        return $(context.canvas).unbind('.tmpevent');
      });
    };

    Input.captureMouseDown = function(handleDown, self) {
      return $(context.canvas).bind('mousedown', function(event) {
        return handleDown.call(self, event);
      });
    };

    return Input;

  })();

}).call(this);
