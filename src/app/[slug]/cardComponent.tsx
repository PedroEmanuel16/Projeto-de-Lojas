import { Card, CardContent } from "@/components/ui/card";
import { Box } from "lucide-react";

interface cardComponentProps {
    textButton : string
}

export const cardComponent = ({ textButton }: cardComponentProps) => {
  return (
    <Card>
      <CardContent className="flex cursor-pointer flex-col items-center gap-4">
        <Box size={64} className="mt-6 text-blue-400" />
        <div className="w-40 max-w-full rounded-full bg-blue-300 p-2 text-blue-900">
          {textButton}
        </div>
      </CardContent>
    </Card>
  );
};

export default cardComponent