import { useEffect, useState } from "react";
import { Button } from "../common/components/elements/Button";
import { Input } from "../common/components/elements/Input";
import { TextArea } from "../common/components/elements/TextArea";
import { supabase } from "../lib/supabase";
import { toast } from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";

const RetrieveSection = () => {
  const urlParams = new URL(window.location.href).searchParams;
  const cbId = urlParams.get("id");

  const [clipBoardUuid, setClipBoardUuid] = useState(cbId || "");
  const [clipBoardText, setClipBoardText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [enableTextEditing, setEnableTextEditing] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (cbId) findClipBoard();
  }, [cbId]);

  const isTextEditable =
    clipBoardUuid?.split("-")[1]?.toLocaleLowerCase() === "e";

  async function findClipBoard(e?: React.FormEvent) {
    e?.preventDefault();

    setClipBoardText("");

    setIsLoading(true);

    try {
      const { data } = await supabase
        .from(isTextEditable ? "clipboard-edit" : "clipboard")
        .select("*")
        .eq("uuid", clipBoardUuid);

      if (data && data.length !== 0) {
        if (isTextEditable && data[0].password !== password)
          throw new Error("Incorrect Password");

        const _clipBoardText = data[0].text;

        navigator.clipboard.writeText(_clipBoardText);
        setClipBoardText(_clipBoardText);
      }
      //
      else throw new Error("Clipboard not found");
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong", {
        position: "bottom-center",
      });
    }

    setIsLoading(false);
  }

  async function handleClipBoardUpdate() {
    try {
      await supabase
        .from("clipboard-edit")
        .update({ text: clipBoardText })
        .eq("uuid", clipBoardUuid);

      toast.success("Updated successfully", {
        position: "bottom-center",
      });
    } catch (error) {
      toast.error("Something went wrong", {
        position: "bottom-center",
      });
    }

    setEnableTextEditing(false);
  }

  const isTextFoundAndEditable = isTextEditable && !!clipBoardText;

  return (
    <div className="card flex flex-col gap-4">
      <h2 className="w-full underline">Retrieve from Clipboard:</h2>

      <form
        onSubmit={findClipBoard}
        className="w-full grid gap-4 place-items-start"
      >
        <Input
          name="retrieve-id"
          label="Retrieve ID"
          placeholder="Enter the retrieve ID"
          type="text"
          value={clipBoardUuid}
          onChange={(e) => setClipBoardUuid(e.target.value.toLowerCase())}
          required
        />

        {isTextEditable && (
          <Input
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        )}

        <Button variant="success" type="submit">
          Retrieve Text
        </Button>

        {isLoading && <RotatingLines width="40" visible={true} />}

        {!!clipBoardText && (
          <>
            <hr className="w-full border-black border my-2 rounded-lg" />

            <div className="w-full grid gap-2">
              <TextArea
                value={clipBoardText}
                rows={6}
                onChange={(e) => setClipBoardText(e.target.value)}
                disabled={!enableTextEditing}
              />

              <div className="flex justify-between items-start flex-wrap gap-2">
                <p>
                  Text automatically copied to your <strong>Clipboard</strong>.
                </p>

                {isTextFoundAndEditable &&
                  (enableTextEditing ? (
                    <Button
                      variant="success"
                      type="button"
                      onClick={handleClipBoardUpdate}
                    >
                      Update
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => setEnableTextEditing(true)}
                    >
                      Edit
                    </Button>
                  ))}
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default RetrieveSection;
