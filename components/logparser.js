import React, { useState } from "react";
import Spinner from "./common/spinner";

const Logparser = () => {
  const [file, setFile] = useState();
  const [isLoading, setisLoading] = useState(false);

  const onUpload = async () => {
    setisLoading(true);
    const payload = new FormData();
    payload.append("file", file);

    console.log("payload", payload);

    try {
      console.log("hi");
      await fetch("http://localhost:8001/logparser", {
        credentials: "include", // to set serverside cookie in browser
        withCredentials: true, // to set serverside cookie in browser
        headers: {
          // "Contetnt-Type":"multipart/form-data", // to send formdata to backend without this it will go as buffer data
          "access-control-allow-credentials": true, // to set serverside cookie in browser
          // Accept: "multipart/form-data",
          // Authorization: "Bearer " + authState.accessToken,
        },
        method: "POST",
        body: payload,
      })
        .then((res) => {
          if (res.status === 200) {
            res.json().then((data) => {
              // Create blob link to download
              const url = window.URL.createObjectURL(
                new Blob([JSON.stringify(data)])
              );
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", `parsedlogs.json`);

              // Append to html link element page
              document.body.appendChild(link);

              // Start download
              link.click();

              // Clean up and remove the link
              link.parentNode.removeChild(link);
              setFile('')
              setisLoading(false);
            });
          } else {
            res.json().then((data) => {
              setFile('')
              alert(data.msg);
              setisLoading(false);
              
            });
          }
        })
        .catch((err) => {
          setFile('')
          alert(err);
          setisLoading(false);
          
        });
    } catch (err) {
      setFile('')
      alert(err);
      setisLoading(false);
      
    }
  };
  return (
    <>
      <div>
        <span className="text-[40px] ml-6">Logparser</span>
      </div>

      {/* <input
        type={"file"}
        onChange={(e) => {
          // console.log("e.target.files[0]", e.target.files[0]);
          setFile(e.target.files[0]);
        }}
      />

      <button className="bg-red-400" onClick={onUpload}>
        Upload
      </button> */}

      <div className="ml-4 my-4">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          for="file_input"
        >
          Please upload valid format file
        </label>
        <div className="w-full flex justify-start items-center">
          <div>
            <input
              className="block w-[100%]  text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-700 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
              onChange={(e) => {
                // console.log("e.target.files[0]", e.target.files[0]);
                setFile(e.target.files[0]);
              }}
              accept="application/pdf, application/txt, .txt"
            />
          </div>

          <div className="ml-4">
            {" "}
            <button
              className="inline-block w-full lg:w-auto px-7 py-2 bg-blue-600 text-white text-center font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={onUpload}
              disabled={isLoading || !file ? true : false}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <Spinner
                    border="border-white"
                    height="h-[1.25rem]"
                    width="w-[1.25rem]"
                  />
                </div>
              ) : (
                "Upload"
              )}
            </button>
          </div>
        </div>

        <div>
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            Accepted Formats .txt, .pdf
          </p>
        </div>
      </div>
    </>
  );
};

export default Logparser;
