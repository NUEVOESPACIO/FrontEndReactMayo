import LoginPage from "../../pages/loginPage";

export default function WelcomeLayout() {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto bg-slate-50">
      <LoginPage />
    </div>
  );
}
