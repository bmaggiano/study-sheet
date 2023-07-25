"use client"
import { SetStateAction, useState } from "react";
import serviceFunctions from "@/utils/services";
import Form from "@/components/form";

// Add any other properties if needed
interface FormDataItem {
    id: string;
    term: string;
    description: string;
    category: string;
}

export default function FunctionalForm() {

    const [term, setTerm] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [editingItem, setEditingItem] = useState<FormDataItem | null>(null);

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
        const selectedCategory = e.target.value === "" ? "" : e.target.value;
        setCategory(selectedCategory);
    };

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
            serviceFunctions.submitFormData(formData)
                .then((data) => {
                    console.log(data);
                    setCategory("");
                    setDescription("");
                    setTerm("");
                })
                .catch(() => {
                    window.alert(
                        "Incorrect password or form submission failed. Please try again."
                    );
                });
        }
    };

    return (

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
    )
}