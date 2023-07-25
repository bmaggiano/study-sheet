"use client";
import { SetStateAction, useEffect, useState } from "react";
import serviceFunctions from "@/utils/services";
import Form from "@/components/form";
import Table from "@/components/table";

// Add any other properties if needed
interface FormDataItem {
  id: string;
  term: string;
  description: string;
  category: string;
}

export default function PutTogether() {
  const [term, setTerm] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [editingItem, setEditingItem] = useState<FormDataItem | null>(null);
  const [readableForm, setReadableForm] = useState<FormDataItem[]>([]); // Set the type for readableForm as FormDataItem[]
  const [selectedCategory, setSelectedCategory] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

  // Function to handle page navigation
//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

  const handleEdit = (item: FormDataItem) => {
    //item is the FormDataItem with actual data
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

  const resetFormData = () => {
    setEditingItem(null);
    setCategory("");
    setDescription("");
    setTerm("");
  }

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

      serviceFunctions.updateFormData(editingItem.id, formData)
        .then(() => {
          resetFormData()
        })
        .catch((error) => {
          console.error("Error:", error.message);
          window.alert(
            "Incorrect password or form submission failed. Please try again."
          );
        });
    } else {
      // Create new item
      serviceFunctions.submitFormData(formData)
        .then(() => {
          resetFormData()
        })
        .catch(() => {
          window.alert(
            "Incorrect password or form submission failed. Please try again."
          );
        });
    }
  };

  return (
    <>

      <h1 className="text-white bg-black p-2">Brandon&apos;s Study Guide</h1>

      <Table
              data={readableForm}
              selectedCategory={selectedCategory}
              onEdit={handleEdit}
              onCategorySearchChange={handleCategorySearchChange}
              readableForm={readableForm} 
              currentPage={1}      
              />

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
