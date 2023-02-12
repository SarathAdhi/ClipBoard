import "./App.css";
import { PageLayout } from "./common/layouts/PageLayout";
import RetrieveSection from "./modules/RetrieveSection";
import AddSection from "./modules/AddSection";
import IntroSection from "./modules/IntroSection";

function App() {
  return (
    <PageLayout className="gap-4">
      <IntroSection />
      <AddSection />
      <RetrieveSection />
    </PageLayout>
  );
}

export default App;
