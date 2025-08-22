export function navigate(_path) {
  if (location.hash !== "#" + _path) {
    location.hash = _path.startsWith("/") ? "#" + _path : "#" + "/" + _path;
  }
}

export function parseQuery(_query) {
  const query = _query.startsWith("?") ? _query.slice(1) : _query;
  if (!query) return {};

  return query.split("&").reduce((_params, _param) => {
    const [key, value] = _param.split("=").map(decodeURIComponent);
    _params[key] = value;
    return _params;
  }, {});
}


