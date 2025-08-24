export function navigate(_path) {
  if (location.hash !== "#" + _path || location.hash !== _path) {
    location.hash = _path.startsWith("/") ? "#" + _path : _path;
  }
}

export function parseQuery(_query='') {
  if (!_query) return {};
  const query = _query.startsWith("?") ? _query.slice(1) : _query;

  return Object.fromEntries(
    query.split("&").filter(Boolean).map((_pair) => {
      const [key, value=''] = _pair.split("=");
      _params[key] = value;
      return [decodeURIComponent(k), decodeURIComponent(v)];
    }, {})
  );
}


