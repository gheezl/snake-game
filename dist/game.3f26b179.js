// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"javascript/input.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInputDirection = void 0;
var inputDirection = {
  x: 0,
  y: 0
};
var lastInputDirection = {
  x: 0,
  y: 0
};
window.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowUp":
      if (lastInputDirection.y !== 0) break;
      inputDirection = {
        x: 0,
        y: -1
      };
      break;

    case "ArrowDown":
      if (lastInputDirection.y !== 0) break;
      inputDirection = {
        x: 0,
        y: 1
      };
      break;

    case "ArrowLeft":
      if (lastInputDirection.x !== 0) break;
      inputDirection = {
        x: -1,
        y: 0
      };
      break;

    case "ArrowRight":
      if (lastInputDirection.x !== 0) break;
      inputDirection = {
        x: 1,
        y: 0
      };
      break;
  }
});

var getInputDirection = function getInputDirection() {
  lastInputDirection = inputDirection;
  return inputDirection;
};

exports.getInputDirection = getInputDirection;
},{}],"javascript/cube.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSnakeHead = exports.equalPositions = exports.onSnake = exports.drawSnake = exports.updateSnake = void 0;

var _input = require("./input.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// a few variables
// export const snakeSpeed = 50
// initail snake location
var snakeBody = {
  x: 25,
  y: 25
}; // updates the snake location

var updateSnake = function updateSnake() {
  var inputDirection = (0, _input.getInputDirection)();

  for (var i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = _objectSpread({}, snakeBody[i]);
  }

  snakeBody.x += inputDirection.x;
  snakeBody.y += inputDirection.y;
}; // sets the color


exports.updateSnake = updateSnake;
var colors = [[false, "black"], [false, "lightgreen"], [false, "lightblue"], [false, "red"], [false, "white"], [false, "yellow"]];

var setColor = function setColor(input) {
  colors.map(function (color) {
    if (input === color[1]) {
      color[0] = true;
      document.getElementById(color[1]).style.color = color[1];
    } else {
      color[0] = false;
      document.getElementById(color[1]).style.color = "white";
    }
  });
};

document.getElementById("black").onclick = function () {
  return setColor("black");
};

document.getElementById("lightblue").onclick = function () {
  return setColor("lightblue");
};

document.getElementById("lightgreen").onclick = function () {
  return setColor("lightgreen");
};

document.getElementById("red").onclick = function () {
  return setColor("red");
};

document.getElementById("white").onclick = function () {
  return setColor("white");
};

document.getElementById("yellow").onclick = function () {
  return setColor("yellow");
}; // draws the initial snake location


var drawSnake = function drawSnake(gameBoard) {
  var snakeElement = document.createElement("div");
  snakeElement.style.gridRowStart = snakeBody.y;
  snakeElement.style.gridColumnStart = snakeBody.x;
  colors.map(function (color) {
    if (color[0]) {
      snakeElement.style.backgroundColor = color[1];
    }
  });
  snakeElement.classList.add("snake");
  snakeElement.id = "snake";
  gameBoard.appendChild(snakeElement);
}; // checks if the square is on anything


exports.drawSnake = drawSnake;

var onSnake = function onSnake(position) {
  return equalPositions(snakeBody, position);
};

exports.onSnake = onSnake;

var equalPositions = function equalPositions(position1, position2) {
  return position1.x === position2.x && position1.y === position2.y;
}; // simply returns the head of the snake


exports.equalPositions = equalPositions;

var getSnakeHead = function getSnakeHead() {
  return snakeBody;
};

exports.getSnakeHead = getSnakeHead;
},{"./input.js":"javascript/input.js"}],"javascript/obsticales.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawObsticale = exports.checkObsticale = exports.obsticalePositions = void 0;

var _cube = require("./cube.js");

// these are the obsticale positions
var obsticalePositions = [{
  x: 10,
  y: 25
}, {
  x: 25,
  y: 45
}, {
  x: 40,
  y: 25
}, {
  x: 40,
  y: 45
}, {
  x: 10,
  y: 45
}]; // checks if the square is on the obsticale

exports.obsticalePositions = obsticalePositions;

var checkObsticale = function checkObsticale() {
  var isOnObsticale = false;
  obsticalePositions.map(function (obsticalePosition) {
    if ((0, _cube.onSnake)(obsticalePosition)) return isOnObsticale = true;
    return false;
  });
  return isOnObsticale;
}; // this draws the obsticale


exports.checkObsticale = checkObsticale;

var drawObsticale = function drawObsticale(gameBoard) {
  obsticalePositions.map(function (position) {
    var obsticaleElement = document.createElement("div");
    obsticaleElement.style.gridRowStart = position.y;
    obsticaleElement.style.gridColumnStart = position.x;
    obsticaleElement.classList.add("obsticale");
    gameBoard.appendChild(obsticaleElement);
  });
};

exports.drawObsticale = drawObsticale;
},{"./cube.js":"javascript/cube.js"}],"javascript/grid.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.outSideGrid = exports.randomGridPosition = void 0;
var GRID_SIZE = 50; // generates a random grid position

var randomGridPosition = function randomGridPosition() {
  return {
    x: Math.floor(Math.random() * GRID_SIZE) + 1,
    y: Math.floor(Math.random() * GRID_SIZE) + 1
  };
}; // scans to see if you are outside the grid


exports.randomGridPosition = randomGridPosition;

var outSideGrid = function outSideGrid(position) {
  return position.x < 1 || position.x > GRID_SIZE || position.y < 1 || position.y > GRID_SIZE;
};

exports.outSideGrid = outSideGrid;
},{}],"javascript/food.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawFood = exports.updateFood = exports.myTimer = exports.score = exports.time = void 0;

var _cube = require("./cube.js");

var _obsticales = require("./obsticales.js");

var _grid = require("./grid.js");

// this sets the original food position as well as the new one
var newFoodPosition = {
  x: 25,
  y: 10
};

var getRandomFoodPosition = function getRandomFoodPosition() {
  while ((0, _cube.onSnake)(newFoodPosition)) {
    newFoodPosition = (0, _grid.randomGridPosition)();
  }

  return newFoodPosition;
}; // these are some variables


var foodPosition = getRandomFoodPosition();
var time = 0;
exports.time = time;
var score = 0;
exports.score = score;
var interval = null; // this is the timer

var myTimer = function myTimer() {
  exports.time = time = time + 1;
  return;
}; // this function moves the food and obsticale locations after the snake eats the food


exports.myTimer = myTimer;

var updateFood = function updateFood() {
  if ((0, _cube.onSnake)(foodPosition)) {
    foodPosition = getRandomFoodPosition();
    _obsticales.obsticalePositions[0] = (0, _grid.randomGridPosition)();
    _obsticales.obsticalePositions[1] = (0, _grid.randomGridPosition)();
    _obsticales.obsticalePositions[2] = (0, _grid.randomGridPosition)();
    _obsticales.obsticalePositions[3] = (0, _grid.randomGridPosition)();
    _obsticales.obsticalePositions[4] = (0, _grid.randomGridPosition)();
    exports.score = score = score + (10 - time);
    exports.time = time = 0;

    if (interval) {
      clearInterval(interval);
    }

    interval = setInterval(myTimer, 1000);
  }
}; // this creates the food


exports.updateFood = updateFood;

var drawFood = function drawFood(gameBoard) {
  var foodElement = document.createElement("div");
  foodElement.style.gridRowStart = foodPosition.y;
  foodElement.style.gridColumnStart = foodPosition.x;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
};

exports.drawFood = drawFood;
},{"./cube.js":"javascript/cube.js","./obsticales.js":"javascript/obsticales.js","./grid.js":"javascript/grid.js"}],"javascript/score.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayScore = void 0;

var _food = require("./food.js");

var scoreBoard = document.getElementById("score");
var highScoreBoard = document.getElementById("high-score");
var highScore = localStorage.getItem("high-score");

if (!highScore) {
  localStorage.setItem("high-score", 0);
}

var displayScore = function displayScore() {
  scoreBoard.innerHTML = _food.score.toString();
  highScoreBoard.innerHTML = highScore.toString();

  if (_food.score > highScore) {
    localStorage.setItem("high-score", _food.score);
  }
};

exports.displayScore = displayScore;
},{"./food.js":"javascript/food.js"}],"javascript/game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeBoxGlow = void 0;

var _cube = require("./cube.js");

var _food = require("./food.js");

var _obsticales = require("./obsticales.js");

var _grid = require("./grid.js");

var _score = require("./score.js");

var lastRenderTime = 0;
var gameOver = false;
var gameBoard = document.getElementById("game-board");
var gameSpeed = 50; // this sets the difficulty

var setSpeed = function setSpeed(speed, difficulty) {
  gameSpeed = speed;
  document.getElementById(difficulty[1]).style.color = "white";
  document.getElementById(difficulty[2]).style.color = "white";
  document.getElementById(difficulty[0]).style.color = "red";
};

document.getElementById("easy").onclick = function () {
  return setSpeed(25, ["easy", "normal", "hard"]);
};

document.getElementById("normal").onclick = function () {
  return setSpeed(50, ["normal", "easy", "hard"]);
};

document.getElementById("hard").onclick = function () {
  return setSpeed(75, ["hard", "easy", "normal"]);
}; // game loop


var main = function main(currentTime) {
  if (gameOver) {
    if (confirm("Game Over. Your final score is ".concat(_food.score, " points. Press Enter to restart the game."))) {
      window.location = "/";
    }

    return;
  }

  window.requestAnimationFrame(main);
  var secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / gameSpeed) return;
  lastRenderTime = currentTime;
  update();
  draw();
  checkDeath();
  (0, _score.displayScore)(); // displayHighScore()
}; // initial run of the game loop


window.requestAnimationFrame(main); // updates everything

var update = function update() {
  (0, _cube.updateSnake)();
  (0, _food.updateFood)();
}; // draws everything


var draw = function draw() {
  gameBoard.innerHTML = '';
  (0, _cube.drawSnake)(gameBoard);
  (0, _food.drawFood)(gameBoard);
  (0, _obsticales.drawObsticale)(gameBoard);
}; // checks for game over


var checkDeath = function checkDeath() {
  gameOver = (0, _grid.outSideGrid)((0, _cube.getSnakeHead)()) || (0, _obsticales.checkObsticale)();
}; // testing custimazation


var changeBoxGlow = function changeBoxGlow() {
  document.getElementById("snake").style.boxShadow = "black";
};

exports.changeBoxGlow = changeBoxGlow;
},{"./cube.js":"javascript/cube.js","./food.js":"javascript/food.js","./obsticales.js":"javascript/obsticales.js","./grid.js":"javascript/grid.js","./score.js":"javascript/score.js"}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59068" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","javascript/game.js"], null)
//# sourceMappingURL=/game.3f26b179.js.map