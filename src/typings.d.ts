/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}


interface String {
  toRouteString(): string;
  toOriginalString(): string;
}
