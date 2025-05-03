import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://localhost:7287/api/company";

export default function BillionaireList() {
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({
    name: "",
    sector: "",
    logo: "",
    headquarter: "",
    founded: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get(API_URL);
      const sorted = res.data.sort((a, b) => a.id - b.id);
      setCompanies(sorted);
    } catch (err) {
      console.error("Failed to fetch companies:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, { id: editingId, ...form });
        fetchCompanies();
      } else {
        const res = await axios.post(API_URL, form);
        setCompanies([...companies, res.data]);
      }
      setForm({ name: "", sector: "", logo: "", headquarter: "", founded: "" });
      setEditingId(null);
      setShowForm(false);
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleEdit = (company) => {
    setForm({
      name: company.name,
      sector: company.sector,
      logo: company.logo,
      headquarter: company.headquarter,
      founded: company.founded
    });
    setEditingId(company.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setCompanies(companies.filter(c => c.id !== id));
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  const handleAddNew = () => {
    setForm({ name: "", sector: "", logo: "", headquarter: "", founded: "" });
    setEditingId(null);
    setShowForm(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-semibold text-center mb-8">Top Bangladeshi Companies</h1>

      {!showForm && (
        <button
          onClick={handleAddNew}
          className="mb-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
        >
          Add Company
        </button>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-white p-8 rounded-lg shadow-lg"
        >
          {["name", "sector", "logo", "headquarter", "founded"].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="text-gray-700 font-semibold mb-2">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                name={field}
                value={form[field]}
                onChange={handleChange}
                placeholder={`Enter ${field}`}
                className="border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          ))}
          <div className="col-span-full flex justify-between gap-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              {editingId ? "Update Company" : "Add Company"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setForm({
                  name: "",
                  sector: "",
                  logo: "",
                  headquarter: "",
                  founded: ""
                });
              }}
              className="bg-gray-400 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-500 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full border-collapse text-left table-auto">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm font-semibold">
            <tr>
              <th className="border px-4 py-2">Logo</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Sector</th>
              <th className="border px-4 py-2">Headquarter</th>
              <th className="border px-4 py-2">Founded</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id} className="hover:bg-gray-50 transition duration-300">
                <td className="border px-4 py-6">
                  <img
                    src={company.logo}
                    alt="logo"
                    className="w-16 h-16 object-contain mx-auto"
                  />
                </td>
                <td className="border px-4 py-6">{company.name}</td>
                <td className="border px-4 py-6">{company.sector}</td>
                <td className="border px-4 py-6">{company.headquarter}</td>
                <td className="border px-4 py-6">{company.founded}</td>
                <td className="border px-4 py-6 space-x-4">
                  <button
                    onClick={() => handleEdit(company)}
                    className="bg-yellow-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-500 transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(company.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
