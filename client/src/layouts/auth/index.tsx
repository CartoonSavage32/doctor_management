import Footer from "components/footer/FooterAuthDefault";
import { Routes, Route, Navigate } from "react-router-dom";
import routes from "routes";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";
import PatientsForm from "utils/PatientForm";

export default function Auth() {
  const getRoutes = (routes: RoutesType[]): any => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };
  document.documentElement.dir = "ltr";
  return (
    <div>
      <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
        <FixedPlugin />
        <main className="mx-auto min-h-screen">
          <div className="relative flex">
            <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
              <div className="mb-auto flex flex-col pl-5 pr-5 md:pl-12 md:pr-0 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
                <Routes>
                  {getRoutes(routes)}
                  <Route
                    path="/"
                    element={<Navigate to="/auth/sign-in" replace />}
                  />
                </Routes>
              </div>
              <div className="absolute right-0 hidden h-full min-h-screen items-center md:flex lg:w-[49vw] 2xl:w-[44vw]">
                <div className="relative flex h-full items-center justify-center">
                  <div className="absolute bottom-0 left-0 top-0 w-px bg-gray-300" />
                  <div className="absolute left-0 right-0 flex items-center justify-center">
                    <div className="bg-white px-4 text-lg font-bold text-navy-700 dark:bg-navy-900 dark:text-white">
                      OR
                    </div>
                  </div>
                </div>
                <div className="mb-auto flex flex-col  md:pl-12 md:pr-0 lg:max-w-[50%] lg:pl-20 xl:max-w-full">
                  <PatientsForm />
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
