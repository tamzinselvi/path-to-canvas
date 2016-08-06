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
        var args = match[2].trim().split(",");
        case "M":
          this.position = match[2].trim().split(",");
          ctx.moveTo.apply(ctx, this.position);
          break;
        case "C":
          this.position = args.slice(2, 4);
          ctx.bezierCurveTo.apply(ctx, args);
          break;
        case "L":
          this.position = args.slice(2, 4);
          ctx.lineTo.apply(ctx, args);
          break;
        case "V":
          args = [this.position[0], this.position[1], this.position[0], args[0]];
          this.position = args.slice(2, 4);
          ctx.lineTo.apply(ctx, args);
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
