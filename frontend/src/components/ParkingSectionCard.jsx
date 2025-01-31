import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ParkingSectionCard = ({ section }) => {
  return (
    <Link to={`/parking/${section.id}`}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{section.name}</span>
            <Badge variant={section.availableSpots > 0 ? "success" : "destructive"}>
              {section.availableSpots} Available
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{section.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            Total Spots: {section.totalSpots}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ParkingSectionCard;
