export default class Thing {
  readonly value: string;
  readonly description: string;
  readonly weight: Array<string>;

  constructor (
    value: string,
    description: string,
    weight: Array<string>
  ) {
    this.value = value;
    this.description = description;
    this.weight = weight;
  }
}
