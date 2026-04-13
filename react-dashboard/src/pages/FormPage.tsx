import { useState } from "react";

const FormPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    let err: any = {};

    if (!form.name) err.name = "Name required";
    if (!form.email.match(/^\S+@\S+\.\S+$/))
      err.email = "Invalid email";
    if (!form.phone) err.phone = "Phone required";
    if (form.password.length < 6)
      err.password = "Min 6 characters";

    return err;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const err = validate();
    setErrors(err);

    if (Object.keys(err).length === 0) {
      setSuccess("Form submitted successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      {["name", "email", "phone", "password"].map((field) => (
        <div key={field} className="mb-3">
          <input
            type={field === "password" ? "password" : "text"}
            placeholder={field}
            className="border p-2 w-full rounded"
            onChange={(e) =>
              setForm({ ...form, [field]: e.target.value })
            }
          />
          {errors[field] && (
            <p className="text-red-500 text-sm">{errors[field]}</p>
          )}
        </div>
      ))}

      <button className="bg-blue-500 text-white p-2 rounded w-full">
        Submit
      </button>

      {success && <p className="text-green-500 mt-2">{success}</p>}
    </form>
  );
};

export default FormPage;