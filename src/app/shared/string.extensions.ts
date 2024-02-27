interface String {
  toRouteString(): string;
  toOriginalString(): string;
}

String.prototype.toRouteString = function(): string {
  const s = this;
  return s.toLowerCase().replace(/ /g, '-');
};
// toLowerCase().replace(/ /g, '-')
// replace(/-/g, ' ')
String.prototype.toOriginalString = function(): string {
  const s = this;
  return s.replace(/-/g, ' ');
};
