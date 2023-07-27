"use client";
import {useState, useEffect} from "react";
import serviceFunctions from "@/utils/services";

// tells our app what type of data to expect from FormData
interface FormData {
    id: string;
    term: string;
    description: string;
    category: string;
  }

// tells our app what type of data the props are going to be
interface TableProps {
  data: FormData[];
  selectedCategory: string;
  currentPage: number;
  onEdit: (item: FormData) => void;
  onCategorySearchChange: React.ChangeEventHandler<HTMLSelectElement>;
  readableForm: FormData[];
}

// pass Table as a const with props (cant export default const that I've tried)
const Table: React.FC<TableProps> = ({
  selectedCategory,
  onEdit,
  onCategorySearchChange,
}) => {

    const [readableForm, setReadableForm] = useState<FormData[]>([]); // Set the type for readableForm as FormDataItem[]
    const [currentPage, setCurrentPage] = useState(1);


    // function to delete item with the id as an argument
  const onDelete = (id: string) => {
    const enteredPassword = prompt("What's the magic word?");

    const deleteData = {
      id,
      password: enteredPassword
    }

    serviceFunctions.deleteFormData(deleteData)
      .catch(() => {
        window.alert(
          "Incorrect password or form submission failed. Please try again."
        );
      });
  };

  // function to fetch the form data
    const fetchFormData = async () => {
    try {
      const data = await serviceFunctions.getFormData()
      setReadableForm(data)
    } catch (error) {
      console.error("Error fetching data:", error);
    };
  }

  // fetch form data with readable form as a dependency, this will queue useEffect every time readable form changes
  useEffect(() => {
    fetchFormData()
  }, [readableForm]);

  // based on selected category in our dropdown, set filtered data to match the category type, else don't filter and just display data
  const filteredData = selectedCategory
    ? readableForm.filter((data) => data.category === selectedCategory)
    : readableForm;

    const ITEMS_PER_PAGE = 5; // Define the number of items to display per page

// this is used for pagination, it sets the pages on our data table
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredData.length);
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  // function to change page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="tableContainer">
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
        {/* if our readable form has length, display 5 items per page */}
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
                  <td>{data.term}</td>
                  <td>{data.description}</td>
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
          {/* set the number of pages and onclick, display the data of the page */}
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
          // if no data exists yet, tell the user
          <p className="text-center">Loading Data...</p>
        )}
    </div>
  );
};

// be sure to export our const
export default Table;
