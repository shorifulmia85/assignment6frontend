import type { ComponentType, ReactNode } from "react";
import { twMerge } from "tailwind-merge"; // npm i tailwind-merge

type KpiCardProps = {
  title: string;
  item: ReactNode;
  Icon?: ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
  iconClassName?: string;
};

const KpiCard2 = ({
  item,
  title,
  Icon,
  className,
  iconClassName,
}: KpiCardProps) => {
  const base = "flex flex-col justify-between bg-background rounded-xl p-7";
  const iconBase = "w-8 h-8 opacity-80 bg-muted rounded p-1 mb-3";

  return (
    <div className={twMerge(base, className)}>
      <div className="flex gap-2">
        {Icon ? <Icon className={twMerge(iconBase, iconClassName)} /> : null}
        <p className="font-medium">{title}</p>
      </div>

      <h1 className="text-lg font-semibold">{item}</h1>
    </div>
  );
};

export default KpiCard2;
