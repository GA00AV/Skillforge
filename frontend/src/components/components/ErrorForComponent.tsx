import { RefreshCw } from "lucide-react";

export default function ErrorForComponent({
  error,
  name,
}: {
  name: string | undefined;
  error: string | undefined;
}) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 w-fll">
      {/* <Card className="w-full max-w-lg">
        <CardContent className="p-8 text-center"> */}
      <div className="mb-6 flex flex-col items-center">
        <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <RefreshCw className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
        <p className="text-gray-600 mb-4 text-lg">{error}</p>
      </div>
      {/* </CardContent>
      </Card> */}
    </div>
  );
}
