import { ReactElement } from 'react';

export default class Header {
  readonly title: string | ReactElement;
  readonly dataIndex: string;
  readonly width: number;
  readonly colSpan?: number;
  readonly className?: string;
  readonly sortName?: string;
  readonly render?: (content: ReactElement, record: Record<string, unknown>) => Record<string, unknown> |
    ReactElement;

  constructor (
    title: string | ReactElement,
    dataIndex: string,
    width = 100,
    colSpan = 1,
    className: string = null,
    sortName: string = null,
    render: (content: ReactElement, record: Record<string, unknown>) => Record<string, unknown> | ReactElement = null
  ) {
    this.title = title;
    this.dataIndex = dataIndex;
    this.width = width;
    this.colSpan = colSpan;
    this.className = className;
    this.sortName = sortName;
    this.render = render;
  }
}
