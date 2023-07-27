// in order to use the edit functionality, we need a component that has our table talking to our form
"use client";
import { SetStateAction, useState } from "react";
import serviceFunctions from "@/utils/services";
import Form from "@/components/form";
import Table from "@/components/table";

// tell the app what data type to expect from FormDataItem
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

  // reset the form fields with the data from the editingitem
  const handleEdit = (item: FormDataItem) => {
    setEditingItem(item); //item is the FormDataItem with actual data
    setTerm(item.term);
    setDescription(item.description);
    setCategory(item.category);
  };

  // when term variable changes, use SetStateAction to update it
  const handleTermChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setTerm(e.target.value);
  };

  // when description changes, use SetStateAction to update description vairable
  const handleDescriptionChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setDescription(e.target.value);
  };

  // this is used for the sorting table
  const handleCategorySearchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value === "" ? "" : e.target.value;
    setSelectedCategory(selectedCategory);
  };

  // this is used for the form category
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value === "" ? "" : e.target.value;
    setCategory(selectedCategory);
  };

  // this will be used anytime we need to reset formData
  const resetFormData = () => {
    setEditingItem(null);
    setCategory("");
    setDescription("");
    setTerm("");
  }

  // function to create new item, or submit the item that you're editing
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const enteredPassword = prompt("What's the magic word?");

    const formData = {
      term,
      description,
      category,
      password: enteredPassword, // Pass the entered password as a separate property
    };

    // Update existing item
    if (editingItem) {
      formData.term = term;
      formData.description = description;
      formData.category = category;

      serviceFunctions.updateFormData(editingItem.id, formData)
        .then(() => {
          resetFormData()
        })
        .catch(() => {
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

{/* passed in from our table.tsx with props */}
      <Table
              data={readableForm}
              selectedCategory={selectedCategory}
              onEdit={handleEdit}
              onCategorySearchChange={handleCategorySearchChange}
              readableForm={readableForm} 
              currentPage={1}      
              />

      <div className="page-container">
{/* passed in from our form.tsx with props */}
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
