export default class Thing {

  [key: string]: string | string[];

  readonly value: string;
  readonly description: string;
  readonly weight: string[];

  constructor (
    value: string,
    description: string,
    weight: string[] = []
  ) {
    this.value = value;
    this.description = description;
    this.weight = weight;
  }
}
