import type React from "react";
import { useState } from "react";




interface FormData {

  customer: string;




  customerContact: string;




  eventDate: string;




  shipDate: string;




  inHandDate: string;




  followUpDate: string;




  specialHandling: string;




  salesperson: string;




  adminCsr: string;




  customerPo: string;




  tags: string;




  processField: string;

}




const CreatePage: React.FC = () => {

  const [formData, setFormData] = useState<FormData>({

    customer: "",




    customerContact: "",




    eventDate: "",




    shipDate: "",




    inHandDate: "",




    followUpDate: "",




    specialHandling: "",




    salesperson: "",




    adminCsr: "",




    customerPo: "",




    tags: "",




    processField: "",

  });




  const [errors, setErrors] = useState<Partial<FormData>>({});




  const handleChange = (

    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>

  ) => {

    const { name, value } = e.target;




    setFormData((prevData) => ({

      ...prevData,




      [name]: value,

    }));

  };




  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();




    const requiredFields: Array<keyof FormData> = [

      "customer",

      "customerContact",

      "shipDate",

      "salesperson",

      "adminCsr",

    ];




    const newErrors: Partial<FormData> = {};




    // Check for required fields




    requiredFields.forEach((field) => {

      if (!formData[field]) {

        newErrors[field] = "This field is required";

      }

    });




    setErrors(newErrors);




    // Proceed with form submission if there are no errors




    if (Object.keys(newErrors).length === 0) {

      alert("Form submitted successfully");

    }

  };




  return (

    <div>

      <main>

        <form

          onSubmit={handleSubmit}

          className="create-form"

        >

          <label>

            Choose Customer:

            <input

              type="text"

              name="customer"

              value={formData.customer}

              onChange={handleChange}

              style={{

                width: "100%",

                padding: "8px",

                border: "1px solid #ccc",

                borderRadius: "4px",

              }}

              required

            />

            {errors.customer && (

              <span style={{ color: "red" }}>{errors.customer}</span>

            )}

          </label>




          <label>

            Choose Customer Contact:

            <input

              type="text"

              name="customerContact"

              value={formData.customerContact}

              onChange={handleChange}

              style={{

                width: "100%",

                padding: "8px",

                border: "1px solid #ccc",

                borderRadius: "4px",

              }}

              required

            />

            {errors.customerContact && (

              <span style={{ color: "red" }}>{errors.customerContact}</span>

            )}

          </label>




          <label>

            Event Date:

            <input

              type="date"

              name="eventDate"

              value={formData.eventDate}

              onChange={handleChange}

              style={{

                width: "100%",

                padding: "8px",

                border: "1px solid #ccc",

                borderRadius: "4px",

              }}

            />

          </label>




          <label>

            Ship Date:

            <input

              type="date"

              name="shipDate"

              value={formData.shipDate}

              onChange={handleChange}

              style={{

                width: "100%",

                padding: "8px",

                border: "1px solid #ccc",

                borderRadius: "4px",

              }}

              required

            />

            {errors.shipDate && (

              <span style={{ color: "red" }}>{errors.shipDate}</span>

            )}

          </label>




          <label>

            In Hand Date:

            <input

              type="date"

              name="inHandDate"

              value={formData.inHandDate}

              onChange={handleChange}

              style={{

                width: "100%",

                padding: "8px",

                border: "1px solid #ccc",

                borderRadius: "4px",

              }}

            />

          </label>




          <label>

            Follow-up Date:

            <input

              type="date"

              name="followUpDate"

              value={formData.followUpDate}

              onChange={handleChange}

              style={{

                width: "100%",

                padding: "8px",

                border: "1px solid #ccc",

                borderRadius: "4px",

              }}

            />

          </label>




          <label>

            Special Handling:

            <select

              name="specialHandling"

              value={formData.specialHandling}

              onChange={handleChange}

              style={{

                width: "100%",

                padding: "8px",

                border: "1px solid #ccc",

                borderRadius: "4px",

              }}

            >

              <option value="">Select an option</option>




              <option value="yes">Yes</option>




              <option value="no">No</option>




              <option value="futureShip">Future Ship/Presell Release</option>

            </select>

          </label>




          <label>

            Salesperson:

            <input

              type="text"

              name="salesperson"

              value={formData.salesperson}

              onChange={handleChange}

              style={{

                width: "100%",

                padding: "8px",

                border: "1px solid #ccc",

                borderRadius: "4px",

              }}

              required

            />

            {errors.salesperson && (

              <span style={{ color: "red" }}>{errors.salesperson}</span>

            )}

          </label>




          <label>

            Admin/CSR:

            <input

              type="text"

              name="adminCsr"

              value={formData.adminCsr}

              onChange={handleChange}

              style={{

                width: "100%",

                padding: "8px",

                border: "1px solid #ccc",

                borderRadius: "4px",

              }}

              required

            />

            {errors.adminCsr && (

              <span style={{ color: "red" }}>{errors.adminCsr}</span>

            )}

          </label>




          <label>

            Customer PO #:

            <input

              type="text"

              name="customerPo"

              value={formData.customerPo}

              onChange={handleChange}

              style={{

                width: "100%",

                padding: "8px",

                border: "1px solid #ccc",

                borderRadius: "4px",

              }}

            />

          </label>




          <label>

            Tags:

            <input

              type="text"

              name="tags"

              value={formData.tags}

              onChange={handleChange}

              style={{

                width: "100%",

                padding: "8px",

                border: "1px solid #ccc",

                borderRadius: "4px",

              }}

            />

          </label>




          <label>

            Process Field:

            <input

              type="text"

              name="processField"

              value={formData.processField}

              onChange={handleChange}

              style={{

                width: "100%",

                padding: "8px",

                border: "1px solid #ccc",

                borderRadius: "4px",

              }}

            />

          </label>




          <div

            style={{

              display: "flex",

              justifyContent: "flex-end",

              marginTop: "20px",

            }}

          >

            <button

              type="submit"

              style={{

                backgroundColor: "green",

                color: "#fff",

                borderRadius: "4px",

                padding: "8px 12px",

                cursor: "pointer",

              }}

            >

              Next

            </button>




            <button

              type="button"

              style={{

                marginLeft: "10px",

                borderRadius: "4px",

                padding: "8px 12px",

                cursor: "pointer",

              }}

            >

              Save as Draft

            </button>

          </div>

        </form>

      </main>

    </div>

  );

};




export default CreatePage;
