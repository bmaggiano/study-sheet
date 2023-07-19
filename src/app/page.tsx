"use client";
import { SetStateAction, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [term, setTerm] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleTermChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setTerm(e.target.value);
  };

  const handleDescriptionChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setCategory(e.target.value);
  };

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
