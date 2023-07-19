"use client";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <h1 className="text-white">Brandon's Study Guide</h1>

      <form>
        <div className="input-box">
          <input
            type="text"
            className="term-input"
            required
          />
          <label className="term-label">Term</label>
        </div>

        <div className="input-box area">
          <textarea
            className="term-input text-area"
            rows={7}
            required
          />
          <label className="term-label">Description</label>
        </div>

        <div className="input-box">
          <input
            className="term-input"
            list="categories"
            name="categories"
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
    </>
  );
}
