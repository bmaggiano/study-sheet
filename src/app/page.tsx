"use client";
import { SetStateAction, useEffect, useState } from "react";
import Image from "next/image";

interface FormDataItem {
  term: string;
  description: string;
  category: string;
  // Add any other properties if needed
}

export default function Home() {
  const [term, setTerm] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [readableForm, setReadableForm] = useState<FormDataItem[]>([]); // Set the type for readableForm as FormDataItem[]

  const handleTermChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setTerm(e.target.value);
  };

  const handleDescriptionChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    fetch("/api/readFormData", {
      method: "GET"
    })
      .then((response) => response.json())
      .then((formDataArray) => {
        setReadableForm(formDataArray);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });
  

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    fetch("/api/saveFormData", {
      method: "POST",
      body: JSON.stringify({ term, description, category }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // You can handle the response accordingly
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <h1 className="text-white">Brandon's Study Guide</h1>

      <div className="flex justify-center mt-20 mb-20">
        {/* <p className="text-white" key={data.term}>{data.term}</p> */}
        <table>
          <thead>
            <tr>
              <th>Term</th>
              <th>Description</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
      {readableForm.map((data) => (
            <tr key={data.term}>
              <td>{data.term}</td>
              <td>{data.description}</td>
              <td>{data.category}</td>
            </tr>
      ))}
      </tbody>
    </table>
    </div>

      <div className="page-container">
        <div>
          <Image alt="notebook" src="/notebook.png" width={400} height={400} />
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <input type="text" className="term-input" onChange={handleTermChange} required />
              <label className="term-label">Term</label>
            </div>

            <div className="input-box area">
              <textarea className="term-input text-area" rows={7} onChange={handleDescriptionChange} required />
              <label className="term-label">Description</label>
            </div>

            <div className="input-box">
              <input
                className="term-input"
                list="categories"
                name="categories"
                onChange={handleCategoryChange}
                required
              />
              <label className="term-label">Category</label>
              <datalist id="categories">
                <option value="Javascript"></option>
                <option value="VSCODE"></option>
                <option value="NextJs"></option>
                <option value="Node"></option>
                <option value="General Terms"></option>
              </datalist>
            </div>

            <div className="submit-container">
              <input className="submit" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
