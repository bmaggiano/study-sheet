// Table.tsx
"use client"
interface TableProps {
    data: FormData[];
    selectedCategory: string;
    currentPage: number;
    ITEMS_PER_PAGE: number;
    onEdit: (item: FormData) => void;
    onDelete: (idToDelete: string) => void;
    onPageChange: (page: number) => void;
    onCategorySearchChange: React.ChangeEventHandler<HTMLSelectElement>; // Fix the type here
}
  
  const Table: React.FC<TableProps> = ({
    data,
    selectedCategory,
    currentPage,
    ITEMS_PER_PAGE,
    onEdit,
    onDelete,
    onCategorySearchChange,
    onPageChange,
  }) =>
  
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
  </div>;
  
  export default Table;
  