"use client";
import React from "react";

interface FormData {
    id: string;
    term: string;
    description: string;
    category: string; // Add the 'category' property to the FormData interface
  }

interface TableProps {
  data: FormData[];
  selectedCategory: string;
  currentPage: number;
  onEdit: (item: FormData) => void;
  // onDelete: (idToDelete: string) => void;
  onPageChange: (page: number) => void;
  onCategorySearchChange: React.ChangeEventHandler<HTMLSelectElement>; // Fix the type here
  readableForm: FormData[]; // Add this prop
}

const Table: React.FC<TableProps> = ({
  selectedCategory,
  currentPage,
  onEdit,
  onCategorySearchChange,
  onPageChange,
  readableForm, // Make sure this prop is passed
}) => {
  
  const onDelete = (idToDelete: string) => {
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
        // Instead of setting the data directly, call the onPageChange function
        onPageChange(currentPage);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        window.alert(
          "Incorrect password or form submission failed. Please try again."
        );
      });
  };// Add logic for filtering and pagination here


  const filteredData = selectedCategory
    ? readableForm.filter((data) => data.category === selectedCategory)
    : readableForm;

    const ITEMS_PER_PAGE = 5; // Define the number of items to display per page


  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredData.length);
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  return (
    <div className="tableContainer">
      {/* ... Rest of the table rendering logic using filteredData, startIndex, endIndex, and totalPages ... */}
        <div className="buttonContainer">
          <div className="tableHeader">
            <h2 className="text-2xl font-semibold">Your Notes</h2>
          </div>
          <div className="tableSort">
            <label>Sort by:&nbsp; </label>
            <select
              value={selectedCategory}
              onChange={onCategorySearchChange}
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
                    <button className="bg-green-600" onClick={() => onEdit(data)}>Edit</button>
                  </td>
                  <td className="text-center">
                    <button className="bg-red-600" onClick={() => onDelete(data.id)}>
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
                  onClick={() => onPageChange(index + 1)}
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
  );
};

export default Table;
