import { headers } from "next/dist/client/components/headers"

const serviceFunctions = {
    getFormData: async function () {
        const response = await fetch("/api/readFormData", {
            method: "GET",
          })
          const data = response.json()
          return data
    },
    submitFormData: async function (FormData: any) {
        const response = await fetch("/api/saveFormData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(FormData)
        });
        const data = await response.json()
        return data;
    },
    updateFormData: async function (id: string, formData: any) {
        try {
          const response = await fetch(`/api/updateFormData/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
    
          if (!response.ok) {
            throw new Error("Update request failed");
          }
    
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error updating data:", error);
          throw error;
        }
      }
}

export default serviceFunctions