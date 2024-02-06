export class SerializeJson {
  static serialize<T>(data: object): T {
    return JSON.parse(this.serializeToString(data));
  }

  static serializeToString(data: object): string {
    return JSON.stringify(data);
  }
}
