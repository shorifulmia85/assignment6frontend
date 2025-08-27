import type { ComponentType, ReactNode } from "react";
import { twMerge } from "tailwind-merge"; // npm i tailwind-merge

type KpiCardProps = {
  title: string;
  item: ReactNode;
  Icon?: ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
  iconClassName?: string;
};

const KpiCard = ({
  item,
  title,
  Icon,
  className,
  iconClassName,
}: KpiCardProps) => {
  const base = "flex items-center justify-between bg-background rounded-xl p-7";
  const iconBase = "w-8 h-8 opacity-80";

  return (
    <div className={twMerge(base, className)}>
      <div className="flex flex-col gap-2">
        <p className="font-medium">{title}</p>
        <h1 className="text-lg font-semibold">{item}</h1>
      </div>
      {Icon ? <Icon className={twMerge(iconBase, iconClassName)} /> : null}
    </div>
  );
};

export default KpiCard;
