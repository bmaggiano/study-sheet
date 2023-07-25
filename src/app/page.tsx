"use client";
import { SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import serviceFunctions from "@/utils/services";
import Form from "@/components/form";

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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = selectedCategory
  ? readableForm.filter((data) => data.category === selectedCategory)
  : readableForm;


  const ITEMS_PER_PAGE = 5; // Define the number of items to display per page

    // Calculate the index range for the items to display on the current page
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredData.length);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

    // Function to handle page navigation
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

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

  const handleCategorySearchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value === "" ? "" : e.target.value;
    setSelectedCategory(selectedCategory);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value === "" ? "" : e.target.value;
    setCategory(selectedCategory);
  };

  const fetchFormData = async () => {
    try {
      const data = await serviceFunctions.getFormData()
      setReadableForm(data)
    } catch (error) {
      console.error("Error fetching data:", error);
    };
  }

  useEffect(() => {
    fetchFormData()
  }, [readableForm]);

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
      console.log(editingItem.id);
      formData.term = term;
      formData.description = description;
      formData.category = category;

      fetch(`/api/updateFormData/${editingItem.id}`, {
        // Use "id" instead of "term" here
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
        <div className="buttonContainer">
          <div className="tableHeader">
            <h2 className="text-2xl font-semibold">Your Notes</h2>
          </div>
          <div className="tableSort">
            <label>Sort by:&nbsp; </label>
            <select
              value={selectedCategory}
              onChange={handleCategorySearchChange}
              className="p-2 rounded-md"
            >
              <option value="">All</option>
              <option value="General Terms">General</option>
              <option value="Javascript">Javascript</option>
              <option value="Vscode">Vscode</option>
              <option value="NextJs">NextJs</option>
              <option value="Node">Node</option>
              <option value="Leetcode">Leetcode</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        {readableForm.length > 0 ? (
          <>
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
              {filteredData.slice(startIndex, endIndex).map((data) => (
                <tr key={data.id}>
                  <td className="">{data.term}</td>
                  <td className="">{data.description}</td>
                  <td className="text-center">{data.category}</td>
                  <td className="text-center">
                    <button className="bg-green-600" onClick={() => handleEdit(data)}>Edit</button>
                  </td>
                  <td className="text-center">
                    <button className="bg-red-600" onClick={() => handleDelete(data.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagesContainer mt-3 flex items-center justify-end bg-gray-100">
            <h3>Pages:&nbsp;</h3>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={index + 1 === currentPage ? "active bg-gray-100" : "otherpage bg-gray-100 text-gray-400"}
                  >
                  {index + 1}
                </button>
              ))}
            </div>
            </>

        ) : (
          <p className="text-center">Loading Data...</p>
        )}
      </div>

      <div className="page-container">
        <Form
        term={term}
        description={description}
        category={category}
        onTermChange={handleTermChange}
        onDescriptionChange={handleDescriptionChange}
        onCategoryChange={handleCategoryChange}
        onSubmit={handleSubmit}
      />
      </div>
    </>
  );
}
