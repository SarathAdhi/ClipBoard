import { useEffect, useState } from "react";
import { Button } from "../common/components/elements/Button";
import { TextArea } from "../common/components/elements/TextArea";
import { supabase } from "../lib/supabase";
import { uuid as funcUuid } from "../utils/uuid";
import { toast } from "react-hot-toast";
import { Input } from "../common/components/elements/Input";
import clsx from "clsx";

const AddSection = () => {
  const [text, setText] = useState("");
  const [uuid, setUuid] = useState("");
  const [clipBoardUuid, setClipBoardUuid] = useState("");
  const [isUuidAvailable, setIsUuidAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkForUuidAvailability(uuid);
  }, [uuid]);

  async function saveClipBoard() {
    if (!text) {
      toast.error("Enter some TEXT");
      return;
    }

    try {
      await supabase.from("clipboard").insert({ uuid, text });

      setText("");
      setClipBoardUuid(uuid);
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  async function checkForUuidAvailability(_uuid: string) {
    if (!_uuid) {
      setIsUuidAvailable(false);
      return;
    }

    setIsLoading(true);

    const { data } = await supabase
      .from("clipboard")
      .select("*")
      .eq("uuid", _uuid);

    if (data && data.length !== 0) setIsUuidAvailable(false);
    else setIsUuidAvailable(true);

    setIsLoading(false);
  }

  async function autoGenerateUniqueUuid() {
    let _uuid = funcUuid();
    let i = 0;

    while (true) {
      const { data } = await supabase
        .from("clipboard")
        .select("*")
        .eq("uuid", _uuid);

      if (data?.length === 0) break;
      else _uuid = funcUuid();

      ++i;
      if (i > 5) break;
    }

    setUuid(_uuid);
  }

  return (
    <div className="card flex flex-col gap-4">
      <h2 className="w-full underline">Save to Clipboard:</h2>

      <div className="w-full grid gap-2 place-items-start">
        <div className="w-full flex items-center justify-end sm:justify-start flex-wrap gap-2">
          <Input
            type="number"
            placeholder="Enter custom ID"
            value={uuid}
            className={clsx(
              "sm:w-auto",
              uuid
                ? isUuidAvailable
                  ? "border-green-500"
                  : "border-red-500"
                : ""
            )}
            onChange={(e) => setUuid(e.target.value)}
          />

          <Button onClick={autoGenerateUniqueUuid}>
            {isLoading ? (
              <img src="/loading.svg" className="animate-spin" />
            ) : (
              <p className="flex-shrink-0">Generate ID</p>
            )}
          </Button>
        </div>

        <TextArea
          value={text}
          placeholder="Type something here"
          rows={6}
          onChange={(e) => setText(e.target.value)}
        />

        <Button variant="success" onClick={saveClipBoard}>
          Save Text
        </Button>

        {clipBoardUuid && (
          <div className="flex items-center gap-2">
            <p>Your Retrieve text ID: {clipBoardUuid}</p>

            <img
              src="copy-icon.svg"
              onClick={() => navigator.clipboard.writeText(clipBoardUuid)}
              className="w-5 h-5 cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddSection;
