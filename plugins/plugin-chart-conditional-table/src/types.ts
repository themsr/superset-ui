/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import {
  DataRecord,
  ChartProps,
  QueryFormData,
  supersetTheme,
  TimeseriesDataRecord,
  QueryFormDataMetric,
  TimeFormatter,
  NumberFormatter,
  DataRecordValue,
  DataRecordFilters,
  TimeGranularity,
} from '@superset-ui/core';
import { Column, Row } from 'react-table';

export enum DataType {
  Number = 'number',
  String = 'string',
  DateTime = 'datetime',
}

export interface TableChartFormData {
  boldText: boolean;
  headerFontSize: number;
  headerText: string;
  alignPn?: boolean;
  colorPn?: boolean;
  includeSearch?: boolean;
  pageLength?: string | number | null; // null means auto-paginate
  metrics?: QueryFormDataMetric[] | null;
  percentMetrics?: QueryFormDataMetric[] | null;
  orderDesc?: boolean;
  showCellBars?: boolean;
  tableTimestampFormat?: string;
  tableFilter?: boolean;
  timeGrainSqla?: TimeGranularity;
  conditions: Array<ConditionProps>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headerGrouping: Array<any>;
}

export interface TableChartData<D extends DataRecord = DataRecord> {
  records: D[];
  columns: string[];
}

export interface TableChartProps<D extends DataRecord = DataRecord> extends ChartProps {
  formData: TableChartFormData;
  queryData: ChartProps['queryData'] & {
    data?: TableChartData<D>;
  };
}

export interface TableChartProp<D extends DataRecord = DataRecord> extends ChartProps {
  formData: TableChartFormData;
  queryData: ChartProps['queryData'] & {
    data: D[];
  };
}

export type CustomFormatter = (value: DataRecordValue) => string;

export interface DataColumnMeta {
  // `key` is what is called `label` in the input props
  key: string;
  // `label` is verbose column name used for rendering
  label: string;
  dataType: DataType;
  formatter?: TimeFormatter | NumberFormatter | CustomFormatter;
}

export interface ConditionalTableStylesProps {
  height: number;
  width: number;
  headerFontSize: keyof typeof supersetTheme.typography.sizes;
  boldText: boolean;
}

export interface TableProps {
  columns: Array<Column<Row<object>>>;
  data: Array<object>;
  conditions: Array<ConditionProps>;
  defaultPageSize: number;
  disablePagination: boolean;
}

export interface ConditionProps {
  column: string;
  alignment: string;
  format: string;
  showTotal: boolean;
  disableFilters: boolean;
  disableSortBy: boolean;
  thumbnailHeight: number;
  thumbnailWidth: number;
  remarkColumn: string;
  conditions: Array<ConditionColumnProps>;
}

export interface ConditionColumnProps {
  initialValue: number;
  initialSymbol: string;
  finalValue: number;
  finalSymbol: string;
  color: ColorProp;
}

interface ColorProp {
  r: string;
  g: string;
  b: string;
  a: string;
}

interface ConditionalTableCustomizeProps {
  headerText: string;
}

export type ConditionalTableQueryFormData = QueryFormData &
  ConditionalTableStylesProps &
  ConditionalTableCustomizeProps;

export type ConditionalTableProps = ConditionalTableStylesProps &
  ConditionalTableCustomizeProps & {
    data: TimeseriesDataRecord[];
    // add typing here for the props you pass in from transformProps.ts!
  };

export interface TableChartTransformedProps<D extends DataRecord = DataRecord> {
  height: number;
  width: number;
  headerFontSize: keyof typeof supersetTheme.typography.sizes;
  headerText: string;
  boldText: boolean;
  data: D[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  groups: any[];
  columns: DataColumnMeta[];
  metrics?: (keyof D)[];
  percentMetrics?: (keyof D)[];
  pageSize?: number;
  showCellBars?: boolean;
  sortDesc?: boolean;
  includeSearch?: boolean;
  alignPositiveNegative?: boolean;
  colorPositiveNegative?: boolean;
  tableTimestampFormat?: string;
  conditions: Array<ConditionProps>;
  // These are dashboard filters, don't be confused with in-chart search filter
  // enabled by `includeSearch`
  filters?: DataRecordFilters;
  emitFilter?: boolean;
  onChangeFilter?: ChartProps['hooks']['onAddFilter'];
}