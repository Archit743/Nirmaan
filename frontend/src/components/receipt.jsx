import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const Receipt = ({ receipt }) => {
  const handleDownload = (format) => {
    toast({
      title: "Download Started",
      description: `Downloading receipt in ${format.toUpperCase()} format`,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "default";
      case "pending":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span>Receipt #{receipt.confirmationCode}</span>
            <Badge variant={getStatusColor(receipt.status)}>
              {receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1)}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => handleDownload('pdf')}>
              <Download className="w-4 h-4 mr-1" /> PDF
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleDownload('jpg')}>
              <Download className="w-4 h-4 mr-1" /> JPG
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleDownload('png')}>
              <Download className="w-4 h-4 mr-1" /> PNG
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p><strong>Date:</strong> {receipt.date}</p>
          <p><strong>Amount:</strong> ₹{receipt.amount}</p>
          {Object.entries(receipt.details).map(([key, value]) => (
            <p key={key}><strong>{key}:</strong> {value}</p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Receipt;
