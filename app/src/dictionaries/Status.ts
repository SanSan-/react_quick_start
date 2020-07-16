export default class Status {
  readonly id: string;
  readonly description: string;

  constructor (
    id: string,
    description: string
  ) {
    this.id = id;
    this.description = description;
  }
}
