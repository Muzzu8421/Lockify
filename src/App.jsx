import { useState, useEffect, useRef } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { v4 as uuidv4 } from "uuid";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const eyeIconRef = useRef(null);

  const [password, setpassword] = useState({
    website: "",
    username: "",
    pass: "",
  });
  const [passwords, setpasswords] = useState([]);
  const [showpassword, setshowpassword] = useState(false);

  useEffect(() => {
    let stored = localStorage.getItem("passwor");
    if (stored) {
      setpasswords(JSON.parse(stored));
    }
  }, []);

  const handleChange = (e) => {
    setpassword({ ...password, [e.target.name]: e.target.value });
  };
  const handleClick = () => {
    if (
      password.website.trim().length < 1 ||
      password.username.trim().length < 1 ||
      password.pass.trim().length < 1
    ) {
      toast.error("Oops! You need to type something first.", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    const newEntry = [...passwords, { ...password, id: uuidv4() }];
    setpasswords(newEntry);
    localStorage.setItem("passwor", JSON.stringify(newEntry));
    setpassword({ website: "", username: "", pass: "" });
  };

  const handleEdit = (id) => {
    const edit = passwords.filter((i) => id === i.id);
    setpassword(edit[0]);
    setpasswords(passwords.filter((i) => id !== i.id));
  };

  const handleDelete = (id) => {
    if (confirm("Delete this item? This action can’t be undone.")) {
      setpasswords(passwords.filter((i) => id !== i.id));
      localStorage.setItem(
        "passwor",
        JSON.stringify(passwords.filter((i) => id !== i.id))
      );
      toast.success("Poof! It’s gone.", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const copytoClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied! Ready to paste.", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const togglePasswordVisibility = (e) => {
    setshowpassword(!showpassword);
    eyeIconRef.current.type = showpassword ? "text" : "password";
    e.target.src = showpassword ? "eyeoff.svg" : "eye.svg";
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="min-h-[100dvh] bg-custom-gradient">
        <Navbar />
        {/* Main Content Wrapper for center alignment and spacing */}
        <main className="flex flex-col items-center mt-5 sm:mt-10 px-4 w-full">
          {/* Input Form Container */}
          <section className="bg-white shadow-xl rounded-xl p-6 sm:p-8 w-full max-w-2xl mb-5">
            {/* App Welcome Header */}
            <header className="text-center mb-4 max-w-4xl px-6 mx-auto">
              <h1 className="whitespace-nowrap text-2xl sm:text-3xl font-extrabold text-teal-600">
                <span className="text-yellow-400">{`<`} </span>
                Lockify
                <span className="text-yellow-400"> {`/>`}</span>
              </h1>
              <p className="text-teal-600 text-lg sm:text-lg font-bold">
                Welcome to Lockify
              </p>
            </header>

            {/* Form - stacked on mobile, arranged on larger screens */}
            <form
              className="flex flex-col gap-4 mt-4"
              aria-label="Add new credentials form"
            >
              {/* Website URL Input */}
              <div className="input-group w-full">
                <input
                  className="border border-gray-300 rounded-full px-4 py-2 text-base w-full focus:ring-2 focus:ring-teal-300 focus:outline-none"
                  placeholder="Website Name or URL"
                  type="text"
                  name="website"
                  onChange={handleChange}
                  value={password.website}
                  aria-label="Website Name or URL"
                />
              </div>

              {/* Username and Password Input & Add Button */}
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <input
                  className="input-username flex-1 border border-gray-300 rounded-full px-4 py-2 text-base w-full focus:ring-2 focus:ring-teal-300 focus:outline-none"
                  placeholder="Username"
                  type="text"
                  name="username"
                  onChange={handleChange}
                  value={password.username}
                  aria-label="Username"
                />
                <span className="relative flex-1 w-full">
                  <input
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-base w-full focus:ring-2 focus:ring-teal-300 focus:outline-none"
                    placeholder="Password"
                    type={showpassword ? "text" : "password"}
                    name="pass"
                    ref={eyeIconRef}
                    onChange={handleChange}
                    value={password.pass}
                    aria-label="Password"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                    <img
                      onClick={togglePasswordVisibility}
                      src="eyeoff.svg"
                      alt="Toggle Password Visibility"
                      width={20}
                    />
                  </span>
                </span>

                <button
                  type="button"
                  className="btn"
                  aria-label="Add credentials"
                  onClick={handleClick}
                >
                  Save
                </button>
              </div>
            </form>
          </section>

          {/* Credentials Table Container with horizontal scroll on small screens */}
          <section
            className="md:max-h-[43dvh] max-h-[46dvh] w-full max-w-4xl bg-white rounded-xl shadow-lg px-2 sm:px-6 py-4 overflow-x-auto"
            aria-label="Stored credentials table"
          >
            <table className="min-w-full table-auto text-left border border-teal-200">
              <thead>
                <tr className="bg-teal-100 border-b border-teal-300">
                  <th className="py-2 px-2 sm:py-3 sm:px-4 font-semibold text-teal-700 rounded-tl-xl align-middle text-center border-r border-teal-300 text-sm sm:text-base max-w-xs">
                    Site Name / URL
                  </th>
                  <th className="py-2 px-2 sm:py-3 sm:px-4 font-semibold text-teal-700 align-middle text-center border-r border-teal-300 text-sm sm:text-base max-w-xs truncate">
                    Username
                  </th>
                  <th className="py-2 px-2 sm:py-3 sm:px-4 font-semibold text-teal-700 align-middle text-center border-r border-teal-300 text-sm sm:text-base max-w-xs truncate">
                    Password
                  </th>
                  <th className="py-2 px-2 sm:py-3 sm:px-4 font-semibold text-teal-700 rounded-tr-xl align-middle text-center text-sm sm:text-base">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {passwords.length === 0 ? (
                  <tr className="border-b border-teal-200">
                    <td
                      colSpan="4"
                      className="text-center py-4 align-middle text-sm sm:text-base truncate"
                    >
                      No items yet
                    </td>
                  </tr>
                ) : (
                  passwords.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 border-b border-teal-200"
                    >
                      <td className="align-middle text-center border-r border-teal-200 text-sm sm:text-base">
                        <div className=" flex items-center justify-center">
                          <p className=" max-w-[125px] truncate">
                            {item.website}
                          </p>
                          <div
                            onClick={() => {
                              copytoClipboard(item.website);
                            }}
                            className="w-[30px] h-[30px] sm:w-[50px] sm:h-[50px]"
                          >
                            <DotLottieReact
                              src="./CopyGreen.json"
                              loop
                              autoplay
                            />
                          </div>
                        </div>
                      </td>

                      <td className="align-middle text-center border-r border-teal-200 text-sm sm:text-base max-w-xs truncate break-words">
                        <div className="flex items-center justify-center">
                          {item.username}
                          <div
                            onClick={() => {
                              copytoClipboard(item.username);
                            }}
                            className="w-[30px] h-[30px] sm:w-[50px] sm:h-[50px]"
                          >
                            <DotLottieReact
                              src="./CopyGreen.json"
                              loop
                              autoplay
                            />
                          </div>
                        </div>
                      </td>
                      <td className=" align-middle text-center border-r border-teal-200 text-sm sm:text-base max-w-xs truncate break-words">
                        <div className="flex items-center justify-center">
                          {"*".repeat(item.pass.length)}
                          <div
                            onClick={() => {
                              copytoClipboard(item.pass);
                            }}
                            className="w-[30px] h-[30px] sm:w-[50px] sm:h-[50px]"
                          >
                            <DotLottieReact
                              src="./CopyGreen.json"
                              loop
                              autoplay
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-2 align-middle text-center">
                        <div className="flex justify-center items-center gap-1">
                          <button
                            onClick={() => {
                              handleEdit(item.id);
                            }}
                            className="sm:px-4 sm:bg-blue-500 text-white rounded-full hover:bg-blue-600 text-xs sm:text-sm"
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/fikcyfpp.json"
                              trigger="hover"
                              stroke="bold"
                              class="sm:w-[26px] w-[20px]
         [--lord-icon-primary:#3B82F6] [--lord-icon-secondary:#3B82F6]
         sm:[--lord-icon-primary:#ffffff] sm:[--lord-icon-secondary:#ffffff]"
                            ></lord-icon>
                          </button>
                          <button
                            onClick={() => {
                              handleDelete(item.id);
                            }}
                            className="sm:px-4 sm:bg-red-500 text-white rounded-full hover:bg-red-600 text-sm sm:text-sm"
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/jzinekkv.json"
                              trigger="hover"
                              stroke="bold"
                              class="sm:w-[26px] w-[20px] 
         [--lord-icon-primary:#ff0000] [--lord-icon-secondary:#ff0000] 
         sm:[--lord-icon-primary:#ffffff] sm:[--lord-icon-secondary:#ffffff]"
                            ></lord-icon>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
