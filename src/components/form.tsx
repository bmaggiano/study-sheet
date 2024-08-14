"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SetStateAction } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FormSelector } from "./formSelector";
import { Textarea } from "./ui/textarea";

// tells our app what type of data to expect with our props
interface FormProps {
  term: string;
  description: string;
  category: string;
  onTermChange: (e: { target: { value: SetStateAction<string> } }) => void;
  onDescriptionChange: (e: { target: { value: SetStateAction<string> } }) => void;
  onCategoryChange: (value: string) => void;
  onSubmit: (e: { preventDefault: () => void }) => void;
}

// build our form component using props to pass data
const Form: React.FC<FormProps> = ({
  term,
  description,
  category,
  onTermChange,
  onDescriptionChange,
  onCategoryChange,
  onSubmit,
}) => {

  // return our form 
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-green-600 text-white ring-white" variant="outline">+ Add Note</Button>
        </DialogTrigger>
        <DialogContent className="bg-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Let&apos;s add a note</DialogTitle>
            <DialogDescription>
              Enter the term, description, and category for your note.
            </DialogDescription>
          </DialogHeader>
          <div>
            <form className="space-y-2" onSubmit={onSubmit}>
              <Input
                placeholder="Term"
                required={true}
                type="text"
                onChange={onTermChange}
                value={term}
              />
              <Textarea
                placeholder="Description"
                required={true}
                onChange={onDescriptionChange}
                value={description}
              />
              <FormSelector value={category} onChange={onCategoryChange} />
              <div className="flex justify-end">
                <Button type="submit">Add Note</Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Form;



