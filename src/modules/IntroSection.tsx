import { useContext } from "react";
import { AppContext } from "../common/context/Provider";

const IntroSection = () => {
  const context = useContext(AppContext);

  const { setSaveClipBoardId } = context;

  return (
    <div className="card space-y-4">
      <h2 className="font-normal">
        <strong>ClipBoard</strong> is a free online tool that help you to{" "}
        <strong>Copy</strong> and
        <strong> Retrieve Text</strong> between any devices. Just copy the text
        and share the ID.
      </h2>

      <h2 className="font-normal">
        If you want to edit the <strong>Text</strong> in future, give{" "}
        <kbd>-e</kbd> in the end of your Clipboard ID while creating one.{" "}
        <button
          onClick={() => {
            setSaveClipBoardId(`${Math.floor(1000 + Math.random() * 9000)}-e`);
          }}
          className="hover:underline text-blue-800 hover:text-blue-600"
        >
          Try it out.
        </button>
      </h2>

      <h3>
        NOTE: You need to create a Password for this feature. Don't forget it.
      </h3>
    </div>
  );
};

export default IntroSection;
