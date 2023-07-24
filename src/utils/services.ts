const serviceFunctions = {
    getFormData: async function () {
        const response = await fetch("/api/readFormData", {
            method: "GET",
          })
          const data = response.json()
          return data
    }
}

export default serviceFunctions