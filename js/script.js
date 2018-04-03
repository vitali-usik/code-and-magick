'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_GAP = 50;
var TEXT_GAP = 20;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
}

var renderHeadingText = function (ctx) {
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP + TEXT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + TEXT_GAP * 2);
}

var renderBarChart = function (ctx, players, times) {
  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';

    ctx.fillText(
      players[i],
      CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,
      CLOUD_Y + BAR_GAP + TEXT_GAP * 2 + BAR_HEIGHT + TEXT_GAP
    );

    ctx.fillText(
      Math.round(times[i]),
      CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,
      CLOUD_Y + BAR_GAP + TEXT_GAP * 2 + BAR_HEIGHT - GAP - (BAR_HEIGHT * times[i]) / maxTime
    );

    ctx.fillStyle = players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 50%)';

    ctx.fillRect(
      CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,
      CLOUD_Y + BAR_GAP + TEXT_GAP * 2 + BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime,
      BAR_WIDTH,
      (BAR_HEIGHT * times[i]) / maxTime
    );
  }
}

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderHeadingText(ctx);
  renderBarChart(ctx, players, times);
}
