import TopTabs from "./components/TopTabs";
import TeacherControls from "./components/TeacherControls";
import SettingsDrawer from "./components/SettingsDrawer";
import VisualSchedule from "./components/VisualSchedule";
import ActivityCard from "./components/ActivityCard";
import ProgressView from "./components/ProgressView";
import TurnTokenFlyer from "./games/TurnTokenFlyer";
import "./styles/buttons.css";
import { useAppStore } from "./state/useAppStore";

export default function App() {
  const { tab, settings } = useAppStore();

  return (
    <div className={settings.lowSensory ? "contrast-125" : ""}>
      <header className="text-center my-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800">
          Autistic Spectrum Disorders Intervention APP
        </h1>
      </header>

      <TopTabs />
      <header className="mx-auto mt-3 flex max-w-5xl items-center justify-between px-3">
        {/* Visual Schedule */}
        <VisualSchedule now={tab === "communication" ? "Communication" : tab === "emotions" ? "Emotions" : tab === "social" ? "Social Skills" : "Progress"} next={tab === "communication" ? "Emotions" : tab === "emotions" ? "Social Skills" : tab === "social" ? "Progress" : "Done"} />
        <TeacherControls />
      </header>

      {settings.teacherUnlocked && <SettingsDrawer />}

      <main className="mx-auto max-w-5xl p-3 space-y-6">
        {tab === "communication" && (
          <>
            <ActivityCard
              skill="communication"
              prompt="Your friend says “Hi!” What should you do?"
              choices={[
                { id:"a", label:"Say “Hi!” and smile", correct:true },
                { id:"b", label:"Say nothing" },
                { id:"c", label:"Turn around" },
              ]}
            />
            <ActivityCard
              skill="communication"
              prompt="You can’t open your lunchbox. What should you say?"
              choices={[
                { id:"a", label:"Help me, please.", correct:true },
                { id:"b", label:"I don’t know." },
                { id:"c", label:"Go away." },
              ]}
            />
            <ActivityCard
              skill="communication"
              prompt="If you couldn’t hear someone, what can you say?"
              choices={[
                { id:"a", label:"Can you say that again?", correct:true },
                { id:"b", label:"Never mind." },
                { id:"c", label:"Walk away." },
              ]}
            />
          </>
        )}

        {tab === "emotions" && (
          <ActivityCard
            skill="emotions"
            prompt="Which face shows confused?"
            choices={[
              { id:"a", label:"(Face A)", correct:true },
              { id:"b", label:"(Face B)"},
              { id:"c", label:"(Face C)"},
            ]}
          />
        )}

        {tab === "social" && (
          <>
            <ActivityCard
              skill="social"
              prompt="Your friend points at a bird. What should you do?"
              choices={[
                { id:"a", label:"Look where they are pointing.", correct:true },
                { id:"b", label:"Look at the ground." },
                { id:"c", label:"Close your eyes." },
              ]}
            />
            <TurnTokenFlyer />
          </>
        )}

        {tab === "progress" && <ProgressView />}
      </main>
    </div>
  );
}