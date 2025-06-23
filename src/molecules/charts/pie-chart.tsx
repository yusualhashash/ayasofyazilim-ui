import * as React from 'react';
import { useMemo } from 'react';
import { Label, LabelProps, Pie, PieChart as RechartsPieChart } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { CardClassNames, ChartCard } from './chart-card';
import { cn } from '@/lib/utils';

export type PieChartData = Record<
  string,
  {
    value: number;
    label: string;
    color?: string;
  }
>;
export interface PieChartProps {
  data: PieChartData;
  title?: React.ReactNode;
  description?: React.ReactNode;
  period?: React.ReactNode;
  trendText?: React.ReactNode;
  trendIcon?: React.ReactNode;
  footer?: React.ReactNode;
  totalLabel?: string;
  chartStyle: 'donut' | 'pie';
  innerRadius?: number;
  strokeWidth?: number;
  valuePrefix?: string;
  valueSuffix?: string;
  classNames?: {
    chart?: {
      container?: string;
      tooltip?: string;
      legend?: string;
      pie?: string;
    };
    card?: CardClassNames;
  };
}

export function PieChart({
  data,
  title,
  description,
  period,
  trendText,
  trendIcon,
  footer,
  totalLabel,
  chartStyle,
  classNames,
  innerRadius,
  strokeWidth,
  valuePrefix,
  valueSuffix,
}: PieChartProps) {
  const totalCount = useMemo(
    () => Object.values(data).reduce((acc, curr) => acc + curr.value, 0),
    [data]
  );

  // Transform data to ChartConfig shape for ChartContainer
  const renderLabelContent = ({
    viewBox,
  }: {
    viewBox?: LabelProps['viewBox'] | null;
  }) => {
    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
      return (
        <text
          x={viewBox.cx}
          y={viewBox.cy}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          <tspan
            x={viewBox.cx}
            y={viewBox.cy}
            className="fill-foreground text-3xl font-bold"
          >
            {valuePrefix} {totalCount.toLocaleString()} {valueSuffix}
          </tspan>
          <tspan
            x={viewBox.cx}
            y={(viewBox.cy || 0) + 24}
            className="fill-muted-foreground"
          >
            {totalLabel}
          </tspan>
        </text>
      );
    }
    return null;
  };

  return (
    <ChartCard
      title={title}
      description={description}
      period={period}
      footer={footer}
      trendText={trendText}
      trendIcon={trendIcon}
      classNames={classNames?.card}
    >
      <ChartContainer
        config={data}
        className={cn(
          'mx-auto aspect-square max-h-[250px]',
          classNames?.chart?.container
        )}
      >
        <RechartsPieChart>
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                hideLabel
                valuePrefix={valuePrefix}
                valueSuffix={valueSuffix}
              />
            }
          />
          <Pie
            data={Object.entries(data).map(([key, value]) => ({
              key,
              ...value,
              fill: value.color,
            }))}
            dataKey="value"
            nameKey="key"
            innerRadius={innerRadius || (chartStyle === 'donut' ? 60 : 0)}
            strokeWidth={
              strokeWidth || (chartStyle === 'donut' ? 0 : undefined)
            }
          >
            <Label content={renderLabelContent} />
          </Pie>
        </RechartsPieChart>
      </ChartContainer>
    </ChartCard>
  );
}
