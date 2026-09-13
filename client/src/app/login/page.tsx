// import LoginPage from "@/app/login/components/LoginPage";

import LoginPage from "./components/LoginPage";

export default function Login(){
  return (
    <div
      className="
        min-h-screen
        bg-slate-50
        flex
        flex-col
        justify-center
        py-12
        sm:px-6
        lg:px-8
        bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNlMmU4ZjAiLz48L3N2Zz4=')]
      "
    >

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-blue-600 mb-4">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center border border-blue-200">
            <svg
              className="w-10 h-10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
        </div>

        <h2 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          TrustMesh
        </h2>

        <p className="mt-2 text-center text-sm text-slate-600">
          Enterprise Decentralized Identity Platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
          <LoginPage/>
         </div>
      </div>
    </div>
  )
}