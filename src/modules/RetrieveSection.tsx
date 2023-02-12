import { useState } from "react";
import { Button } from "../common/components/elements/Button";
import { Input } from "../common/components/elements/Input";
import { TextArea } from "../common/components/elements/TextArea";
import { supabase } from "../lib/supabase";
import { toast } from "react-hot-toast";

const RetrieveSection = () => {
  const [clipBoardUuid, setClipBoardUuid] = useState("");
  const [clipBoardText, setClipBoardText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function findClipBoard() {
    setIsLoading(true);

    try {
      const { data } = await supabase
        .from("clipboard")
        .select("*")
        .eq("uuid", clipBoardUuid);

      if (data && data.length !== 0) {
        const _clipBoardText = data[0].text;

        navigator.clipboard.writeText(_clipBoardText);
        setClipBoardText(_clipBoardText);
      }
      //
      else toast.error("Clipboard not found");
    } catch (err) {
      toast.error("Something went wrong");
    }

    setIsLoading(false);
  }

  return (
    <div className="card flex flex-col gap-4">
      <h2 className="w-full underline">Retrieve from Clipboard:</h2>

      <div className="w-full grid gap-2 place-items-start">
        <Input
          placeholder="Enter the retrieve ID"
          type="number"
          onChange={(e) => setClipBoardUuid(e.target.value)}
        />

        <Button variant="success" onClick={findClipBoard}>
          Retrieve Text
        </Button>

        {isLoading && <p>Loading...</p>}

        {clipBoardText && (
          <>
            <hr className="w-full border-black border my-2 rounded-lg" />

            <div className="w-full">
              <TextArea value={clipBoardText} rows={6} readOnly />
              <p>
                Text copied to your <strong>Clipboard</strong>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RetrieveSection;
