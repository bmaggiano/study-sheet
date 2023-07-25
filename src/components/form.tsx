// Form.tsx
"use client"
import Image from "next/image";
import { SetStateAction } from "react";

interface FormProps {
  term: string;
  description: string;
  category: string;
  onTermChange: (e: { target: { value: SetStateAction<string> } }) => void;
  onDescriptionChange: (e: { target: { value: SetStateAction<string> } }) => void;
  onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: (e: { preventDefault: () => void }) => void;
}

const Form: React.FC<FormProps> = ({
  term,
  description,
  category,
  onTermChange,
  onDescriptionChange,
  onCategoryChange,
  onSubmit,
}) => {
  return (
    <>
      <div>
        <h3 className="text-center font-bold">Enter Your Notes</h3>
        <Image alt="notebook" src="/notebook.png" width={400} height={400} />
      </div>

      <div>
        <form onSubmit={onSubmit}>
        <div className="input-box">
              <input
                type="text"
                className="term-input"
                value={term}
                onChange={onTermChange}
                required
              />
              <label className="term-label">Term</label>
            </div>

            <div className="input-box area">
              <textarea
                className="term-input text-area"
                rows={7}
                value={description}
                onChange={onDescriptionChange}
                required
              />
              <label className="term-label">Description</label>
            </div>

            <div className="input-box">
              <select
                className="term-input pb-2"
                required
                onChange={onCategoryChange}
                value={category || ""}
              >
                <option value="" disabled hidden></option>
                <option value="General Terms">General Terms</option>
                <option value="Javascript">Javascript</option>
                <option value="Vscode">Vscode</option>
                <option value="NextJs">NextJs</option>
                <option value="Node">Node</option>
                <option value="Leetcode">Leetcode</option>
                <option value="Other">Other</option>
              </select>
              <label className="term-label">Category</label>
            </div>

            <div className="submit-container">
              <input className="submit" type="submit" />
            </div>
        </form>
      </div>
    </>
  );
};

export default Form;
