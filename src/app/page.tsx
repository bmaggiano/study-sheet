"use client";
import { SetStateAction, useEffect, useState } from "react";
import Image from "next/image";

// Add any other properties if needed
interface FormDataItem {
  id: string;
  term: string;
  description: string;
  category: string;
}

export default function Home() {
  const [term, setTerm] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [readableForm, setReadableForm] = useState<FormDataItem[]>([]); // Set the type for readableForm as FormDataItem[]
  const [editingItem, setEditingItem] = useState<FormDataItem | null>(null);

  const handleEdit = (item: FormDataItem) => {
    setEditingItem(item);
    setTerm(item.term);
    setDescription(item.description);
    setCategory(item.category);
  };

  const handleTermChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setTerm(e.target.value);
  };

  const handleDescriptionChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Check if the selected value is empty (no specific category selected)
    const selectedCategory = e.target.value === "" ? "" : e.target.value;
    setCategory(selectedCategory);
  };
  

  useEffect(() => {
    fetch("/api/readFormData", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((formDataArray) => {
        setReadableForm(formDataArray);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const enteredPassword = prompt("What's the magic word?");

    const formData = {
      term,
      description,
      category,
      password: enteredPassword, // Pass the entered password as a separate property
    };

    if (editingItem) {
      // Update existing item
      formData.term = term;
      formData.description = description;
      formData.category = category;

      fetch(`/api/updateFormData/${editingItem.term}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Password validation failed");
          }
        })
        .then((data) => {
          console.log(data);
          setEditingItem(null);
          setCategory("");
          setDescription("");
          setTerm("");
        })
        .catch((error) => {
          console.error("Error:", error.message);
          window.alert(
            "Incorrect password or form submission failed. Please try again."
          );
        });
    } else {
      // Create new item
      fetch("/api/saveFormData", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Password validation failed");
          }
        })
        .then((data) => {
          console.log(data);
          setCategory("");
          setDescription("");
          setTerm("");
        })
        .catch((error) => {
          console.error("Error:", error.message);
          window.alert(
            "Incorrect password or form submission failed. Please try again."
          );
        });
    }
  };

  const handleDelete = (idToDelete: string) => {
    const enteredPassword = prompt("What's the magic word?");

    fetch("/api/deleteFormData", {
      method: "DELETE",
      body: JSON.stringify({ id: idToDelete, password: enteredPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Password validation failed");
        }
      })
      .then((data) => {
        // Update the state with the updated form data after deletion
        setReadableForm(data);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        window.alert(
          "Incorrect password or form submission failed. Please try again."
        );
      });
  };

  return (
    <>
      <h1 className="text-white bg-black p-2">Brandon&apos;s Study Guide</h1>

      <div className="tableContainer">
        {/* <p className="text-white" key={data.term}>{data.term}</p> */}
        {readableForm.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Term</th>
              <th>Description</th>
              <th>Category</th>
              <th className="text-center">Edit</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {readableForm.map((data) => (
              <tr key={data.term}>
                <td>{data.term}</td>
                <td>{data.description}</td>
                <td>{data.category}</td>
                <td className="text-center">
                  <button onClick={() => handleEdit(data)}>Edit</button>
                </td>
                <td className="text-center">
                  <button onClick={() => handleDelete(data.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        ) : (
          <p className="text-center">Loading Data...</p>
    )}
      </div>

      <div className="page-container">
        <div>
          <Image alt="notebook" src="/notebook.png" width={400} height={400} />
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <input
                type="text"
                className="term-input"
                value={term}
                onChange={handleTermChange}
                required
              />
              <label className="term-label">Term</label>
            </div>

            <div className="input-box area">
              <textarea
                className="term-input text-area"
                rows={7}
                value={description}
                onChange={handleDescriptionChange}
                required
              />
              <label className="term-label">Description</label>
            </div>

            <div className="input-box">
              <select className="term-input pb-2" required onChange={handleCategoryChange} value={category || ""}>
              <option value="" disabled hidden></option>
                <option value="General Terms">General Terms</option>
                <option value="Javascript">Javascript</option>
                <option value="Vscode">Vscode</option>
                <option value="NextJs">NextJs</option>
                <option value="Node">Node</option>
                <option value="Other">Other</option>
              </select>
              <label className="term-label">Category</label>
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
