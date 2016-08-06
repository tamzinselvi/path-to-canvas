/**
 * A simple utility to draw SVG paths to canvas.
 * @author Tom Selvi <tomselvi@gmail.com>
 */

(function ( global ) {
  var SVGCanvasPath = {};

  SVGCanvasPath.draw = function(ctx, pathStr, options) {
    var match;

    ctx.beginPath();

    while (match = /([MmCcLlZzVvHhSsQqTtAa])([^MmCcLlZzVvHhSsQqTtAa]*)/.exec(pathStr)) {
      switch (match[1]) {
        case "M":
          ctx.moveTo.apply(ctx, match[2].trim().split(","));
          break;
        case "C":
          ctx.bezierCurveTo.apply(ctx, match[2].trim().split(","));
          break;
        case "L":
          ctx.lineTo.apply(ctx, match[2].trim().split(","));
          break;
      }

      pathStr = pathStr.substr(match[0].length);
    }

    if (options.stroke)
      ctx.stroke();

    if (options.fill)
      ctx.fill();

    ctx.closePath();
  };

  // export as AMD...
  if ( typeof define !== 'undefined' && define.amd ) {
    define( function () { return SVGCanvasPath; });
  }

  // ...or as browserify
  else if ( typeof module !== 'undefined' && module.exports ) {
    module.exports = SVGCanvasPath;
  }

  global.RGBColor = SVGCanvasPath;

}( typeof window !== 'undefined' ? window : this ));
