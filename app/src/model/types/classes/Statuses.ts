import { LabeledValue } from 'antd/lib/select';

export default class Statuses {

  [key: string]: string | LabeledValue[];

  readonly description: string;
  readonly statuses: LabeledValue[];

  constructor (description: string, statuses: LabeledValue[]) {
    this.description = description;
    this.statuses = statuses;
  }
}
