import { useContext, useEffect, useState } from "react";
import { Button } from "../common/components/elements/Button";
import { TextArea } from "../common/components/elements/TextArea";
import { supabase } from "../lib/supabase";
import { uuid as funcUuid } from "../utils/uuid";
import { toast } from "react-hot-toast";
import { Input } from "../common/components/elements/Input";
import clsx from "clsx";
import { AppContext } from "../common/context/Provider";
import { RotatingLines } from "react-loader-spinner";

const AddSection = () => {
  const [text, setText] = useState("");
  const [uuid, setUuid] = useState("");
  const [password, setPassword] = useState("");
  const [clipBoardUuid, setClipBoardUuid] = useState("");
  const [isUuidAvailable, setIsUuidAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(AppContext);

  const { saveClipBoardId } = context;

  useEffect(() => {
    setUuid(saveClipBoardId);
  }, [saveClipBoardId]);

  useEffect(() => {
    checkForUuidAvailability();
  }, [uuid]);

  const isTextEditable = uuid?.split("-")[1]?.toLowerCase() === "e";

  async function checkForUuidAvailability() {
    if (!uuid) {
      setIsUuidAvailable(false);
      return;
    }

    setIsLoading(true);

    const { data } = await supabase
      .from(isTextEditable ? "clipboard-edit" : "clipboard")
      .select("*")
      .eq("uuid", uuid);

    if (data && data.length !== 0) setIsUuidAvailable(false);
    else setIsUuidAvailable(true);

    setIsLoading(false);
  }

  async function saveClipBoard(e: React.FormEvent) {
    e.preventDefault();

    if (!text) {
      toast.error("Enter some TEXT");
      return;
    }

    if (!isUuidAvailable) {
      toast.error("ID not available");
      return;
    }

    try {
      if (isTextEditable)
        await supabase.from("clipboard-edit").insert({ uuid, text, password });
      else await supabase.from("clipboard").insert({ uuid, text });

      setClipBoardUuid(uuid);
      setText("");
      setPassword("");
      setUuid("");
    } catch (error) {
      toast.error("Something went wrong");
    }
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

      <form
        onSubmit={saveClipBoard}
        className="w-full grid gap-4 place-items-start"
      >
        <div className="w-full flex items-end justify-end sm:justify-start flex-wrap gap-2">
          <Input
            label="Clipboard ID"
            name="id"
            placeholder="Enter custom ID"
            value={uuid}
            conatinerClassName="sm:w-auto"
            className={clsx(
              "sm:w-auto",
              uuid
                ? isUuidAvailable
                  ? "border-green-500"
                  : "border-red-500"
                : ""
            )}
            onChange={(e) => setUuid(e.target.value.toLowerCase())}
            required
          />

          <Button type="button" onClick={autoGenerateUniqueUuid}>
            {isLoading ? (
              <RotatingLines width="28" visible={true} />
            ) : (
              <p className="flex-shrink-0">Generate ID</p>
            )}
          </Button>
        </div>

        {isTextEditable && (
          <Input
            name="password"
            label="Clipboard Password"
            type="password"
            placeholder="Enter a password. This is needed when you edit it."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        )}

        <TextArea
          name="text"
          label="Clipboard Text"
          value={text}
          placeholder="Type something here"
          rows={6}
          onChange={(e) => setText(e.target.value)}
          required
        />

        <Button variant="success" type="submit">
          Save Text
        </Button>

        {clipBoardUuid && (
          <div>
            <div className="flex items-center gap-2">
              <p>Your Retrieve text ID: {clipBoardUuid}</p>

              <img
                src="copy-icon.svg"
                onClick={() => {
                  navigator.clipboard.writeText(clipBoardUuid);
                  toast.success("Copied to you clipboard");
                }}
                className="w-5 h-5 cursor-pointer"
                alt="copy-text"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                className="text-lg hover:underline"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/?id=${clipBoardUuid}`
                  );
                  toast.success("Copied to you clipboard");
                }}
              >
                Share
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddSection;
