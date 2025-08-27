import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Crown, Star } from "lucide-react";

interface DriverData {
  driverId: string;
  earnings: number;
  rides: number;
}

interface TopDriversProps {
  data: DriverData[];
}

const TopEarnedDriver = ({ data }: TopDriversProps) => {
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  const getDriverInitials = (driverId: string) => {
    return driverId.slice(0, 2).toUpperCase();
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return <Crown className="w-4 h-4 text-warning" />;
    if (index < 3) return <Star className="w-4 h-4 text-primary" />;
    return null;
  };

  const getRankBadge = (index: number) => {
    const badges = ["1st", "2nd", "3rd"];
    return badges[index] || `${index + 1}th`;
  };

  return (
    <Card className="border-muted">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-warning" />
          Top Drivers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No driver data available
            </p>
          ) : (
            data.map((driver, index) => (
              <div
                key={driver.driverId}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  index === 0
                    ? "bg-gradient-to-r from-warning/10 to-primary/10"
                    : "hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-2">
                  {getRankIcon(index)}
                  <span className="text-xs font-medium text-muted-foreground min-w-[24px]">
                    {getRankBadge(index)}
                  </span>
                </div>

                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getDriverInitials(driver.driverId)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    Driver {driver.driverId.slice(-4)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {driver.rides} rides completed
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold text-success">
                    {formatCurrency(driver.earnings)}
                  </p>
                  <p className="text-xs text-muted-foreground">earned</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopEarnedDriver;
