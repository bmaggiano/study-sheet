"use client";
import { SetStateAction, useState } from "react";
import serviceFunctions from "@/utils/services";
import Form from "@/components/form";
import ShadcnDataTable from "@/components/table";

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
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleEdit = (item: FormDataItem) => {
    setEditingItem(item);
    setTerm(item.term);
    setDescription(item.description);
    setCategory(item.category);
  };

  const handleTermChange = (e: { target: { value: SetStateAction<string> } }) => {
    setTerm(e.target.value);
  };

  const handleDescriptionChange = (e: { target: { value: SetStateAction<string> } }) => {
    setDescription(e.target.value);
  };

  const handleCategorySearchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value === "" ? "" : e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const resetFormData = () => {
    setEditingItem(null);
    setCategory("");
    setDescription("");
    setTerm("");
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const enteredPassword = prompt("What's the magic word?");
    const formData = {
      term,
      description,
      category,
      password: enteredPassword,
    };

    if (editingItem) {
      serviceFunctions.updateFormData(editingItem.id, formData)
        .then(() => resetFormData())
        .catch(() => {
          window.alert(
            "Incorrect password or form submission failed. Please try again."
          );
        });
    } else {
      serviceFunctions.submitFormData(formData)
        .then(() => resetFormData())
        .catch(() => {
          window.alert(
            "Incorrect password or form submission failed. Please try again."
          );
        });
    }
  };

  return (
    <>
      <h1 className="text-white text-xl bg-black p-4">Brandon&apos;s Study Guide</h1>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-2xl">Your Notes</h2>
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
        <ShadcnDataTable
          selectedCategory={selectedCategory}
          onEdit={handleEdit}
          onCategorySearchChange={handleCategorySearchChange}
        />
      </div>
    </>
  );
}