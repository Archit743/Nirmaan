import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const OTPVerification = ({ onVerify, onCancel }) => {
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    if (otp.length === 6) {
      onVerify(otp);
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Enter OTP</h3>
        <p className="text-sm text-gray-500">
          Please enter the 6-digit code sent to your device
        </p>
      </div>
      <InputOTP
        value={otp}
        onChange={setOtp}
        maxLength={6}
        render={({ slots }) => (
          <InputOTPGroup className="gap-2">
            {slots.map((slot, index) => (
              <InputOTPSlot key={index} {...slot} />
            ))}
          </InputOTPGroup>
        )}
      />
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleVerify}>Verify OTP</Button>
      </div>
    </div>
  );
};

export default OTPVerification;
