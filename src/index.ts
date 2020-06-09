let _interval: number;

export function start(interval = 400) {
  _interval = interval;
  window.addEventListener('resize', onResize);
}

export function stop() {
  window.removeEventListener('resize', onResize);
  clearTimeout(_currTimeoutId);
  _currTimeoutId = -1;
  _frameId = 0;
  _resizeId = _pervInnerWidth = _pervInnerHeight = undefined;
}

let _frameId = 0;
function getFrameId() {
  window.requestAnimationFrame(() => {
    _frameId++;
  });
  return _frameId;
}

let _resizeId: number | undefined;
let _pervInnerWidth: number | undefined;
let _pervInnerHeight: number | undefined;
let _currTimeoutId = -1;

function onResize() {
  if (_resizeId === _frameId) return;
  _pervInnerWidth = window.innerWidth;
  _pervInnerHeight = window.innerHeight;
  if (_currTimeoutId !== -1) {
    clearTimeout(_currTimeoutId);
  }
  _currTimeoutId = window.setTimeout(() => {
    _currTimeoutId = -1;
    if (
      _pervInnerWidth === window.innerWidth &&
      _pervInnerHeight === window.innerHeight
    )
      return;
    _resizeId = getFrameId();
    window.dispatchEvent(new Event('resize'));
  }, _interval);
}
